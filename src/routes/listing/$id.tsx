import { createFileRoute } from '@tanstack/react-router'
import { PropertyDetail } from '@/core/Property/components/PropertyDetail'
import { Suspense } from 'react'

export const Route = createFileRoute('/listing/$id')({
  component: ListingDetail,
})

function ListingDetail() {
  return (
    <Suspense fallback={<div>Loading Property details...</div>}>
      <PropertyDetail />
    </Suspense>
  )
}
