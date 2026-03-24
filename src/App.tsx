import './App.css'
import React, { Suspense } from 'react'

const PropertyListing = React.lazy(() => import('@core/components/PropertyListing'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyListing filters={{ page: 1, limit: 10 }} />
    </Suspense>
  )
}

export default App
