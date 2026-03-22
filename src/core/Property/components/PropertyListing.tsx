import { useNavigate } from "@tanstack/react-router"
import { useGetPaginatedProperties } from "../service/Property.query"
import type { PropertyFilters } from "../service/Property.query"
import { PropertyCard } from "./PropertyCard"
import { PropertySkeleton } from "./PropertySkeleton"
import { PropertyFilterSidebar } from "./PropertyFilterSidebar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PropertyListingProps {
    filters: PropertyFilters;
}

const PropertyListing = ({ filters }: PropertyListingProps) => {
    const navigate = useNavigate();
    const initialFilters: PropertyFilters = {
        minPrice: undefined,
        maxPrice: undefined,
        beds: undefined,
        baths: undefined,
        type: "",
        search: ""
    };
    const [localFilters, setLocalFilters] = useState<PropertyFilters>(initialFilters);

    const handleResetFilter = () => {
        setLocalFilters(initialFilters);
        handleFilterChange(initialFilters);
    }

    const [pagination, setPagination] = useState({ page: 1, limit: 6 });
    const { data, isLoading, error } = useGetPaginatedProperties(filters, pagination);


    const handleFilterChange = (newFilters: PropertyFilters) => {
        navigate({
            search: newFilters as any
        })
    }

    // Safely access data items
    const properties = data?.items || [];

    if (error) {
        return <div className="p-20 text-center font-bold text-red-500">Error: {error.message}</div>
    }

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 font-geist">
            {/* Sidebar Filter */}
            <PropertyFilterSidebar onApply={handleFilterChange} localFilters={localFilters} setLocalFilters={setLocalFilters} handleResetFilter={handleResetFilter} />

            <main className="flex-1 space-y-10">
                {/* Main Content Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            Showing {properties.length} Properties
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Luxury Listings</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort:</span>
                        <Select defaultValue="newest">
                            <SelectTrigger className="w-[180px] h-11 bg-slate-50 border-none rounded-xl text-xs font-bold shadow-none ring-offset-transparent focus:ring-0">
                                <SelectValue placeholder="Newest First" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-100 rounded-xl">
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Listings Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
                        {[1, 2, 3, 4].map(i => <PropertySkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 pt-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-lg hover:bg-slate-100"
                        disabled={pagination.page <= 1}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: data?.totalPages || 0 }, (_, i) => (
                            <Button
                                key={i + 1}
                                className={`h-10 w-10 rounded-lg font-bold text-sm ${pagination.page === i + 1
                                    ? "bg-slate-900 text-white"
                                    : "bg-transparent text-slate-500 hover:bg-slate-100"
                                    }`}
                                variant={pagination.page === i + 1 ? "default" : "ghost"}
                                onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-lg hover:bg-slate-100"
                        disabled={pagination.page >= (data?.totalPages || 0)}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </main >
        </div >
    )
}

export default PropertyListing
