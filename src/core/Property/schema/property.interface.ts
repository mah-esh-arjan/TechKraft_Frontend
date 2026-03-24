import type { PropertySearchParams } from '@/routes/listing/index'
import type { Property, PropertyFilters, PropertyMetaData } from '../schema'

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
  filters: PropertySearchParams
}
