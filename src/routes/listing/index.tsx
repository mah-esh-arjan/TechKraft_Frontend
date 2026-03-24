import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { z } from 'zod'

const PropertyListing = React.lazy(() => import('@core/components/PropertyListing'))

export const propertyFiltersSchema = z.object({
  minPrice: z.coerce.number().positive().optional().catch(undefined),
  maxPrice: z.coerce.number().positive().optional().catch(undefined),
  beds: z.coerce.number().int().positive().optional().catch(undefined),
  baths: z.coerce.number().int().positive().optional().catch(undefined),
  type: z.enum(['APARTMENT', 'HOUSE', 'VILLA', '']).optional().catch(undefined),
  search: z.string().optional().catch(undefined),
  page: z.coerce.number().int().positive().optional().catch(1).default(1),
  limit: z.coerce.number().int().positive().optional().catch(10).default(10),
})

export type PropertySearchParams = z.infer<typeof propertyFiltersSchema>

export const Route = createFileRoute('/listing/')({
  validateSearch: (search) => propertyFiltersSchema.parse(search),
  component: ListingHome,
})

function ListingHome() {
  const search = Route.useSearch()

  return (
    <div className="p-2">
      <Suspense fallback={<div>Loading Property Listing...</div>}>
        <PropertyListing filters={search} />
      </Suspense>
    </div>
  )
}
