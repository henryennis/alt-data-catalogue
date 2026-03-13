// TODO: Shared layout for /data routes
//
// The catalogue page (catalogue-client.tsx) and detail page (dataset-detail-client.tsx)
// each render their own sticky headers with different content:
//   - Catalogue: back-to-home arrow, "DataCatalogue / Data Catalogue" branding, dataset count
//   - Detail: back-to-catalogue arrow, breadcrumb (DataCatalogue > Data > {name}), "Get Access" CTA
//
// Both headers depend on client-side state (dataset count, dataset name), so extracting
// them into a shared server-side layout is not straightforward without refactoring the
// header into a parameterized client component. Consider unifying when the header
// design stabilizes.

export default function DataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
