import './App.css'
import React, { Suspense } from 'react'

const PropertyListing = React.lazy(() => import('@core/components/PropertyListing'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyListing />
    </Suspense>
  )
}

export default App
