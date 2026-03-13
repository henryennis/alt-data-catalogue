import { defineConfig, s } from 'velite'

// ---------------------------------------------------------------------------
// Controlled vocabularies
// ---------------------------------------------------------------------------

const categoryEnum = s.enum(['satellite', 'sentiment', 'sec-filings'])
const frequencyEnum = s.enum(['Daily', 'Hourly', 'Quarterly'])

// ---------------------------------------------------------------------------
// Zod schemas for structured dataset data (data.json files)
// ---------------------------------------------------------------------------

const fieldSchema = s.object({
  name: s.string(),
  type: s.string(),
  description: s.string(),
  nullable: s.boolean(),
  example: s.string(),
})

const slaSchema = s.object({
  uptime: s.string(),
  deliveryLatency: s.string(),
  freshness: s.string(),
  revisionPolicy: s.string(),
  supportTier: s.string(),
})

const fieldStatSchema = s.object({
  field: s.string(),
  min: s.string(),
  max: s.string(),
  mean: s.string(),
  median: s.string(),
  std: s.string(),
  skew: s.string(),
  kurtosis: s.string(),
  nullPct: s.string(),
  distinctCount: s.string(),
})

const coverageMonthSchema = s.object({
  year: s.number(),
  month: s.number(),
  records: s.number(),
  completeness: s.number(),
})

const freshnessPointSchema = s.object({
  date: s.string(),
  latencyMinutes: s.number(),
})

const empiricalProfileSchema = s.object({
  totalRecords: s.string(),
  nullRate: s.string(),
  avgDailyRecords: s.string(),
  uniqueEntities: s.string(),
  medianRecordAge: s.string(),
  lastUpdated: s.string(),
  fieldStats: s.array(fieldStatSchema),
  coverageByYear: s.array(
    s.object({ year: s.number(), completeness: s.number() })
  ),
  coverageHeatmap: s.array(coverageMonthSchema),
  freshnessTimeline: s.array(freshnessPointSchema),
  fieldCompleteness: s.array(
    s.object({ field: s.string(), pctFilled: s.number() })
  ),
  sampleRows: s.array(s.record(s.string(), s.string())),
})

const lineageStepSchema = s.object({
  stage: s.string(),
  description: s.string(),
  latency: s.string(),
})

const versionPolicySchema = s.object({
  currentVersion: s.string(),
  releaseDate: s.string(),
  deprecationPolicy: s.string(),
  breakingChanges: s.string(),
  revisionWindow: s.string(),
  historicalRestated: s.boolean(),
})

const complianceSchema = s.object({
  redistributionAllowed: s.boolean(),
  derivedWorksAllowed: s.boolean(),
  piiPresent: s.boolean(),
  gdprCompliant: s.boolean(),
  regulatoryClassification: s.string(),
  auditTrail: s.boolean(),
  dataRetentionPolicy: s.string(),
})

const backtestGuideSchema = s.object({
  engineCompatibility: s.array(s.string()),
  sampleBacktest: s.string(),
  knownLimitations: s.array(s.string()),
  lookbackRequired: s.string(),
  warmupPeriod: s.string(),
})

const codeExampleSchema = s.object({
  language: s.string(),
  label: s.string(),
  code: s.string(),
})

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    // MDX prose for each dataset (index.mdx files)
    datasetPages: {
      name: 'DatasetPage',
      pattern: 'datasets/*/index.mdx',
      schema: s.object({
        slug: s.slug('datasetPages'),
        body: s.mdx(),
      }),
    },
    // Structured data for each dataset (data.json files)
    datasetData: {
      name: 'DatasetData',
      pattern: 'datasets/*/data.json',
      schema: s.object({
        slug: s.string(),
        name: s.string(),
        vendor: s.string(),
        vendorLogo: s.string().optional(),
        heroImage: s.string().optional(),
        category: categoryEnum,
        description: s.string(),
        longDescription: s.string(),
        frequency: frequencyEnum,
        coverage: s.string(),
        history: s.string(),
        creditAmount: s.number(),
        creditUnit: s.string(),
        tags: s.array(s.string()),
        assetClasses: s.array(s.string()),
        deliveryMethods: s.array(s.string()),
        updateSchedule: s.string(),
        fields: s.array(fieldSchema),
        sla: slaSchema,
        codeExamples: s.array(codeExampleSchema),
        empirical: empiricalProfileSchema,
        lineage: s.array(lineageStepSchema),
        versionPolicy: versionPolicySchema,
        compliance: complianceSchema,
        backtestGuide: backtestGuideSchema,
        relatedDatasets: s.array(s.string()),
        license: s.string(),
        pointInTime: s.boolean(),
        survivorshipBiasFree: s.boolean(),
      }),
    },
  },
})
