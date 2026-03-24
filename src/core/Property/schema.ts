

export interface Property {
  id: number
  name: string
  description: string
  price: number
  beds: number
  baths: number
  type: 'HOUSE' | 'APARTMENT' | 'VILLA'
  suburb: string
  agentId: number
  agent: {
    name: string
    email: string
  }
  createdAt: string
  metaData?: PropertyMetaData
}

export interface PropertyMetaData {
  hasPool: boolean
  hasGarage: boolean
  yearBuilt: number
  squareFeet: number
}


export type PropertyType = 'APARTMENT' | 'HOUSE' | 'VILLA' | ''

export interface PropertyFilters {
  minPrice?: number
  maxPrice?: number
  beds?: number
  baths?: number
  type?: PropertyType
  search?: string
  page?: number
  limit?: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedPropertyResponse {
  items: Property[]
  total: number
  page: number
  limit: number
  totalPages: number
}


export interface PropertyCardProps {
  property: Property
}

export interface AdminPropertyMetaProps {
  metaData?: PropertyMetaData
}

export interface PropertyFilterSidebarProps {
  onApply: (filters: PropertyFilters) => void
  localFilters: PropertyFilters
  setLocalFilters: (filters: PropertyFilters) => void
  handleResetFilter: () => void
}

export interface PropertyListingProps {
  filters: import('@/routes/listing/index').PropertySearchParams
}
