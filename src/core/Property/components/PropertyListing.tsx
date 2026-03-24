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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"

interface PropertyListingProps {
    filters: PropertyFilters & { page?: number; limit?: number };
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

    const pagination = {
        page: filters.page || 1,
        limit: filters.limit || 10
    };

    const { data, isLoading, error } = useGetPaginatedProperties(filters, pagination);

    const handleFilterChange = (newFilters: PropertyFilters) => {
        navigate({
            search: { ...newFilters, page: 1, limit: pagination.limit } as any
        })
    }

    const handleLimitChange = (newLimit: number) => {
        navigate({
            search: { ...filters, limit: newLimit, page: 1 } as any
        })
    }

    const handlePageChange = (newPage: number) => {
        navigate({
            search: { ...filters, page: newPage } as any
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
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Show:</span>
                        <Select 
                            value={pagination.limit.toString()} 
                            onValueChange={(val) => handleLimitChange(Number(val))}
                        >
                            <SelectTrigger className="w-[100px] h-11 bg-slate-50 border-none rounded-xl text-xs font-bold shadow-none ring-offset-transparent focus:ring-0">
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-100 rounded-xl">
                                <SelectItem value="10">10 </SelectItem>
                                <SelectItem value="20">20 </SelectItem>
                                <SelectItem value="30">30 </SelectItem>
                                <SelectItem value="40">40 </SelectItem>
                                <SelectItem value="100">Show All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Listings Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
                        {[1, 2, 3, 4, 5, 6].map(i => <PropertySkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <Pagination className="pt-10">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => pagination.page > 1 && handlePageChange(pagination.page - 1)}
                                className={pagination.page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        
                        {Array.from({ length: data?.totalPages || 0 }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink 
                                        isActive={pagination.page === pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className="cursor-pointer"
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => pagination.page < (data?.totalPages || 0) && handlePageChange(pagination.page + 1)}
                                className={pagination.page >= (data?.totalPages || 0) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </main >
        </div >
    )
}

export default PropertyListing
