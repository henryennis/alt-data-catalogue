// Type definitions derived from Velite-generated types.
// Velite validates all data at build time, so runtime Zod schemas are unnecessary.

import type { DatasetData } from '#velite'

// Re-export the Velite-generated type under the name used across the codebase
export type DatasetDetail = DatasetData

// Extract the element type from the fields array
export type DatasetField = DatasetData['fields'][number]

// Catalogue listing type — derived from DatasetDetail, picking only the fields
// needed for the catalogue listing page. This replaces the old CatalogueEntry
// type that was sourced from the now-removed catalogue.json collection.
export type CatalogueDataset = Pick<
  DatasetData,
  | 'slug'
  | 'name'
  | 'vendor'
  | 'category'
  | 'description'
  | 'frequency'
  | 'coverage'
  | 'history'
  | 'creditAmount'
  | 'creditUnit'
  | 'tags'
>
