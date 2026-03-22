import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Search } from "lucide-react"
import type { PropertyFilters } from "../service/Property.query"

interface PropertyFilterSidebarProps {
    onApply: (filters: PropertyFilters) => void;
    localFilters: PropertyFilters;
    setLocalFilters: (filters: PropertyFilters) => void;
    handleResetFilter: () => void;
}

const initialFilters: PropertyFilters = {
    minPrice: undefined,
    maxPrice: undefined,
    beds: undefined,
    baths: undefined,
    type: "",
    search: ""
};

export const PropertyFilterSidebar = ({ onApply, localFilters, setLocalFilters, handleResetFilter }: PropertyFilterSidebarProps) => {

    const handleApply = () => {
        onApply(localFilters);
    };


    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 pr-6">

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 transition-colors group-focus-within:text-slate-900" />
                <Input
                    placeholder="Suburb, Postcode or Keyword"
                    value={localFilters.search || ""}
                    onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                    className="pl-11 h-11 bg-slate-100 border-none rounded-xl text-xs font-medium focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:bg-white transition-all shadow-none"
                />
            </div>

            <div className="space-y-5">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Price Range</Label>
                        <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                            ${(localFilters.minPrice || 0).toLocaleString()} - ${(localFilters.maxPrice || 2000000).toLocaleString()}+
                        </span>
                    </div>
                    <Slider
                        value={[localFilters.minPrice || 0, localFilters.maxPrice || 2000000]}
                        min={0}
                        max={2000000}
                        step={50000}
                        onValueChange={([min, max]: number[]) => setLocalFilters({ ...localFilters, minPrice: min, maxPrice: max })}
                        className="py-2"
                    />
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Bedrooms</Label>
                    <ToggleGroup
                        type="single"
                        value={localFilters.beds?.toString()}
                        onValueChange={(val) => setLocalFilters({ ...localFilters, beds: val ? parseInt(val) : initialFilters.beds })}
                        className="justify-start gap-2"
                    >
                        <ToggleGroupItem value="1" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">1</ToggleGroupItem>
                        <ToggleGroupItem value="2" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">2</ToggleGroupItem>
                        <ToggleGroupItem value="3" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">3+</ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Bathrooms</Label>
                    <ToggleGroup
                        type="single"
                        value={localFilters.baths?.toString()}
                        onValueChange={(val) => setLocalFilters({ ...localFilters, baths: val ? parseInt(val) : initialFilters.baths })}
                        className="justify-start gap-2"
                    >
                        <ToggleGroupItem value="1" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">1</ToggleGroupItem>
                        <ToggleGroupItem value="2" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">2+</ToggleGroupItem>
                        <ToggleGroupItem value="3" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">3+</ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Property Type</Label>
                    <div className="space-y-2 pt-1">
                        <div className="flex items-center space-x-2.5">
                            <Checkbox
                                id="apartment"
                                checked={localFilters.type === 'APARTMENT'}
                                onCheckedChange={(checked) => setLocalFilters({ ...localFilters, type: checked ? 'APARTMENT' : initialFilters.type })}
                                className="size-4 rounded border-slate-300"
                            />
                            <label htmlFor="apartment" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Apartment</label>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <Checkbox
                                id="house"
                                checked={localFilters.type === 'HOUSE'}
                                onCheckedChange={(checked) => setLocalFilters({ ...localFilters, type: checked ? 'HOUSE' : initialFilters.type })}
                                className="size-4 rounded border-slate-300"
                            />
                            <label htmlFor="house" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">House</label>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <Checkbox
                                id="villa"
                                checked={localFilters.type === 'VILLA'}
                                onCheckedChange={(checked) => setLocalFilters({ ...localFilters, type: checked ? 'VILLA' : initialFilters.type })}
                                className="size-4 rounded border-slate-300"
                            />
                            <label htmlFor="villa" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Villa</label>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleApply}
                className="w-full h-12 bg-[#0c1621] hover:bg-[#1a2b3c] text-white rounded-xl font-bold text-xs tracking-wide shadow-none transition-all flex items-center justify-center"
            >
                Apply Filters
            </Button>
            <Button
                onClick={handleResetFilter}
                variant={"default"}
                className="w-full h-12 "
            >
                Reset Filters
            </Button>
        </aside>
    )
}
