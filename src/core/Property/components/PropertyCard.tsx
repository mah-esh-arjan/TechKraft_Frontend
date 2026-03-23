import {
  Card
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

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
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
            {formattedPrice}
          </div>
          <Link to="/listing/$id" params={{ id: property.id.toString() }}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-100/50 hover:bg-slate-900 hover:text-white transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest line-clamp-1">
          {property.name}, {property.suburb}
        </div>

        <div className="flex flex-col p-4 gap-3 pt-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest bg-slate-50/50 rounded-xl mt-2">
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
        </div>

        <Link to="/listing/$id" params={{ id: property.id.toString() }} className="block pt-2">
          <Button className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-900 border-none text-slate-700 hover:text-white font-bold text-xs uppercase tracking-widest transition-all shadow-none">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
