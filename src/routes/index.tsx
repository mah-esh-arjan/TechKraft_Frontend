import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const PropertyListing = React.lazy(() => import('@core/components/PropertyListing'))

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Suspense fallback={<div>Loading Property Listing...</div>}>
        <PropertyListing />
      </Suspense>
    </div>
  )
}
