import {
  Card
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'

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
  createdAt: string
}

interface PropertyCardProps {
  property: Property
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price)

  const getPropertyImage = (type: Property['type']) => {
    switch (type) {
      case 'APARTMENT':
        return '/Apartment.jpeg'
      case 'HOUSE':
        return '/house.jpeg'
      case 'VILLA':
        return '/Villa.jpeg'
      default:
        return '/house.jpeg'
    }
  }

  return (
    <Card className="group overflow-hidden border-none shadow-none bg-transparent hover:translate-y-[-4px] transition-transform duration-300">
      <div className="relative rounded-xl overflow-hidden mb-4">
        <AspectRatio ratio={4 / 3}>
          <img
            src={getPropertyImage(property.type)}
            alt={property.name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>

      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
          {formattedPrice}
        </div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest line-clamp-1">
          {property.name}, {property.suburb}
        </div>

        <div className="flex flex-col p-4 gap-3 pt-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
          <div className="flex justify-between gap-1">
            <span className="opacity-60">Beds</span>
            <span>{property.beds}</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="opacity-60">Baths</span>
            <span>{property.baths}</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="opacity-60">Property</span>
            <span>{property.type}</span>
          </div>
          <div className="flex justify-between gap-1 ">
            <span className="opacity-60">Suburb</span>
            <span>{property.suburb}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
