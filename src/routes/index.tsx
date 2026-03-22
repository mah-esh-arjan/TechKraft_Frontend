import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { z } from 'zod'

const PropertyListing = React.lazy(() => import('@core/components/PropertyListing'))

const propertyFiltersSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  beds: z.number().optional(),
  baths: z.number().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: (search) => propertyFiltersSchema.parse(search),
  component: Index,
})

function Index() {
  const search = Route.useSearch()
  
  return (
    <div className="p-2">
      <Suspense fallback={<div>Loading Property Listing...</div>}>
        <PropertyListing filters={search} />
      </Suspense>
    </div>
  )
}
