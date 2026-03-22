import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Search } from "lucide-react"

export const PropertyFilterSidebar = () => {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 pr-6">

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 transition-colors group-focus-within:text-slate-900" />
                <Input
                    placeholder="Suburb, Postcode or Keyword"
                    className="pl-11 h-11 bg-slate-100 border-none rounded-xl text-xs font-medium focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:bg-white transition-all shadow-none"
                />
            </div>

            <div className="space-y-5">
                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Price Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Select>
                            <SelectTrigger className="h-10 bg-slate-100 border-none rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors shadow-none px-3">
                                <SelectValue placeholder="$500k" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="500000">$500,000</SelectItem>
                                <SelectItem value="1000000">$1,000,000</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="h-10 bg-slate-100 border-none rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors shadow-none px-3">
                                <SelectValue placeholder="$2M+" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2000000">$2,000,000+</SelectItem>
                                <SelectItem value="5000000">$5,000,000+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Bedrooms</Label>
                    <ToggleGroup type="single" defaultValue="1" className="justify-start gap-2">
                        <ToggleGroupItem value="1" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">1</ToggleGroupItem>
                        <ToggleGroupItem value="2" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">2</ToggleGroupItem>
                        <ToggleGroupItem value="3+" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">3+</ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Bathrooms</Label>
                    <ToggleGroup type="single" defaultValue="2+" className="justify-start gap-2">
                        <ToggleGroupItem value="1" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">1</ToggleGroupItem>
                        <ToggleGroupItem value="2+" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">2+</ToggleGroupItem>
                        <ToggleGroupItem value="3+" className="size-9 rounded-full bg-slate-100 border-none text-xs font-bold data-[state=on]:bg-[#ffd38d] data-[state=on]:text-slate-900 hover:bg-slate-200 shadow-none p-0 transition-all">3+</ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="space-y-2.5">
                    <Label className="uppercase text-[9px] font-bold text-slate-400 tracking-[0.2em]">Property Type</Label>
                    <div className="space-y-2 pt-1">
                        <div className="flex items-center space-x-2.5">
                            <Checkbox id="apartment" className="size-4 rounded border-slate-300" />
                            <label htmlFor="apartment" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Apartment</label>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <Checkbox id="house" className="size-4 rounded border-slate-300" />
                            <label htmlFor="house" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">House</label>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <Checkbox id="townhouse" className="size-4 rounded border-slate-300" />
                            <label htmlFor="townhouse" className="text-[11px] font-bold text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Townhouse</label>
                        </div>
                    </div>
                </div>
            </div>

            <Button className="w-full h-12 bg-[#0c1621] hover:bg-[#1a2b3c] text-white rounded-xl font-bold text-xs tracking-wide shadow-none transition-all flex items-center justify-center">
                Update Results
            </Button>
        </aside>
    )
}
