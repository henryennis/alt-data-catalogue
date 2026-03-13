'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { isFeatureId } from '@/lib/type-guards'

const GRID = 7
const TOTAL = GRID * GRID
const GAP = 1.0
const PILLAR_SIZE = 1.0
const CENTER = (GRID - 1) / 2
const CUBE_HEIGHT = GRID * GAP // uniform height = grid width = perfect cube
const MIN_HEIGHT = 0.3
const RIPPLE_STAGGER = 60
const ANIM_DURATION = 400
const OVERSHOOT = 0.08

const PILLAR_COLOR = new THREE.Color(0.62, 0.1, 0.1)

type FeatureId = 'catalogue' | 'access' | 'pricing' | 'secure' | 'analytics'

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function getHeightMap(id: FeatureId): number[] {
  const h: number[] = []
  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      const dist = Math.abs(x - CENTER) + Math.abs(z - CENTER)
      let v = CUBE_HEIGHT
      switch (id) {
        // Default: perfect cube - all pillars at full height (7 cells)
        case 'catalogue':
          v = GRID * GAP
          break
        // Stepped pyramid descending from center, snapped to cells
        case 'access':
          v = Math.max(1, GRID - dist) * GAP
          break
        // Two-axis corner staircase: steps up from one corner, 1-wide on each edge
        case 'pricing':
          v = Math.min(x + 1, z + 1) * GAP
          break
        // Fortress: tall perimeter (7 cells), low center (1 cell)
        case 'secure': {
          const edge = x === 0 || x === GRID - 1 || z === 0 || z === GRID - 1
          v = edge ? GRID * GAP : 1 * GAP
          break
        }
        // Sigmoid staircase: soft S-curve snapped to whole cells (1-7)
        case 'analytics': {
          const t = (z - CENTER) * 0.9
          const sigmoid = 1 / (1 + Math.exp(-t))
          v = Math.round(1 + sigmoid * (GRID - 1)) * GAP
          break
        }
      }
      h.push(clamp(v, MIN_HEIGHT, CUBE_HEIGHT))
    }
  }
  return h
}

function getManhattanDist(i: number) {
  return Math.abs((i % GRID) - CENTER) + Math.abs(Math.floor(i / GRID) - CENTER)
}

const dummy = new THREE.Object3D()
const tmpColor = new THREE.Color()

function PillarGrid({ activeFeature }: { activeFeature: FeatureId }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const curH = useRef(getHeightMap('catalogue'))
  const tgtH = useRef(getHeightMap('catalogue'))
  const srcH = useRef(getHeightMap('catalogue'))
  const animT0 = useRef(0)
  const animOn = useRef(false)
  const didInit = useRef(false)
  const prevFeat = useRef<FeatureId>(activeFeature)

  // Frame throttling for low-end devices
  const frameSkip = useRef(0)
  const isLowEnd = useMemo(() => {
    const cores =
      typeof navigator !== 'undefined'
        ? navigator.hardwareConcurrency
        : 4
    const memory =
      typeof navigator !== 'undefined'
        ? (navigator.deviceMemory ?? 8)
        : 8
    return cores < 4 || memory < 4
  }, [])

  const dists = useMemo(
    () => Array.from({ length: TOTAL }, (_, i) => getManhattanDist(i)),
    []
  )

  useEffect(() => {
    if (activeFeature !== prevFeat.current) {
      prevFeat.current = activeFeature
      srcH.current = [...curH.current]
      tgtH.current = getHeightMap(activeFeature)
      animT0.current = performance.now()
      animOn.current = true
    }
  }, [activeFeature])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    // Skip frames on low-end devices for performance
    if (isLowEnd) {
      frameSkip.current = (frameSkip.current + 1) % 2
      if (frameSkip.current !== 0) return
    }

    if (!didInit.current) {
      didInit.current = true
      for (let i = 0; i < TOTAL; i++) {
        const x = (i % GRID) * GAP - CENTER * GAP
        const z = Math.floor(i / GRID) * GAP - CENTER * GAP
        const h = curH.current[i]
        dummy.position.set(x, h / 2, z)
        dummy.scale.set(PILLAR_SIZE, h, PILLAR_SIZE)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, PILLAR_COLOR)
      }
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    const now = performance.now()
    const elapsed = now - animT0.current
    let still = true

    for (let i = 0; i < TOTAL; i++) {
      const d = dists[i]
      const delay = d * RIPPLE_STAGGER
      const px = (i % GRID) * GAP - CENTER * GAP
      const pz = Math.floor(i / GRID) * GAP - CENTER * GAP
      let h: number

      if (animOn.current) {
        const local = elapsed - delay
        if (local < 0) {
          h = srcH.current[i]
          still = false
        } else if (local < ANIM_DURATION) {
          const raw = local / ANIM_DURATION
          const eased = easeOutCubic(raw)
          const from = srcH.current[i]
          const to = tgtH.current[i]
          const diff = to - from
          const os =
            raw < 0.7
              ? eased * (1 + OVERSHOOT / Math.max(Math.abs(diff), 0.1))
              : eased
          h = from + diff * (raw < 0.7 ? os : eased)
          still = false
        } else {
          h = tgtH.current[i]
        }
        curH.current[i] = h
      } else {
        h = curH.current[i]
      }

      const fh = Math.max(MIN_HEIGHT, h)

      const op = 0.4 + (fh / CUBE_HEIGHT) * 0.6
      tmpColor.setRGB(
        PILLAR_COLOR.r * op * 1.5,
        PILLAR_COLOR.g * op * 1.5,
        PILLAR_COLOR.b * op * 1.5
      )
      mesh.setColorAt(i, tmpColor)

      dummy.position.set(px, fh / 2, pz)
      dummy.scale.set(PILLAR_SIZE, fh, PILLAR_SIZE)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }

    if (still && animOn.current) animOn.current = false

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined!, undefined!, TOTAL]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        metalness={0.1}
        roughness={0.7}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

export function PillarCube({ activeFeature }: { activeFeature: string }) {
  // Use type guard to validate activeFeature before casting
  const validFeature: FeatureId = isFeatureId(activeFeature)
    ? activeFeature
    : 'catalogue'

  return (
    <div className="w-full aspect-square mx-auto overflow-visible">
      <Canvas
        orthographic
        camera={{ position: [12, 10, 12], zoom: 40, near: -50, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={
          typeof navigator !== 'undefined' &&
          navigator.hardwareConcurrency < 4
            ? 1
            : [1, 2]
        }
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[-6, 12, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <group position={[0, -CUBE_HEIGHT * 0.45, 0]}>
          <PillarGrid activeFeature={validFeature} />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.25}
            scale={14}
            blur={2}
            far={8}
          />
        </group>
      </Canvas>
    </div>
  )
}
