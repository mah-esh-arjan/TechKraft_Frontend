import { auth } from '@/lib/auth'
import type { AdminPropertyMetaProps } from '../schema/property.interface'

export const AdminPropertyMeta = ({ metaData }: AdminPropertyMetaProps) => {
  // Use auth.isAdmin to short-circuit the component
  if (!auth.isAdmin() || !metaData) return null

  return (
    <div className="flex flex-col gap-2 mt-4 text-[10px] font-bold uppercase text-slate-400">
      <div className="flex justify-between border-b border-slate-100 pb-1">
        <span className="opacity-60">Has Pool</span>
        <span className="text-slate-900">{metaData.hasPool ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex justify-between border-b border-slate-100 pb-1">
        <span className="opacity-60">Garage</span>
        <span className="text-slate-900">{metaData.hasGarage ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex justify-between border-b border-slate-100 pb-1">
        <span className="opacity-60">Year Built</span>
        <span className="text-slate-900">{metaData.yearBuilt}</span>
      </div>
      <div className="flex justify-between">
        <span className="opacity-60">Sq Feet</span>
        <span className="text-slate-900">{metaData.squareFeet}</span>
      </div>
    </div>
  )
}
