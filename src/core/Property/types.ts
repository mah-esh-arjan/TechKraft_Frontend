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
