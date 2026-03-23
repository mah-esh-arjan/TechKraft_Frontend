import { useParams } from "@tanstack/react-router";
import { useGetPropertyDetail } from "../service/Property.query"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, Trees, MapPin, Calendar, User, Phone, Mail, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";

export const PropertyDetail = () => {
    const params = useParams({ strict: false }) as { id?: string };
    const id = params.id ? Number(params.id) : 0;
    const navigate = useNavigate();

    const { data: property, isLoading, isError } = useGetPropertyDetail(id);

    if (isLoading) return <PropertyDetailSkeleton />;
    
    if (isError || !property) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="text-2xl font-semibold text-slate-800">Property Not Found</div>
                <p className="text-slate-500 text-center max-w-md">
                    We couldn't load the property details. The listing might have been removed or the link is incorrect.
                </p>
                <Button variant="outline" onClick={() => navigate({ to: '/' })}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Listings
                </Button>
            </div>
        );
    }

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(property.price);

    const getPropertyImage = (type: string) => {
        switch (type) {
            case 'APARTMENT': return '/Apartment.jpeg';
            case 'HOUSE': return '/house.jpeg';
            case 'VILLA': return '/Villa.jpeg';
            default: return '/house.jpeg';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => navigate({ to: '/' })} className="text-slate-500 hover:text-slate-900 -ml-2">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to search
                </Button>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-3 py-1 bg-white/50 backdrop-blur-sm shadow-sm border-slate-100 uppercase tracking-widest text-[10px] font-bold">
                        {property.type}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700 border-green-100 uppercase tracking-widest text-[10px] font-bold">
                        Active Listing
                    </Badge>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200/50">
                <AspectRatio ratio={21 / 9}>
                    <img 
                        src={getPropertyImage(property.type)} 
                        alt={property.name} 
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-extrabold tracking-tight">{formattedPrice}</span>
                        <span className="text-xl text-white/80 font-medium">Estimated Price</span>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                            {property.name}
                        </h1>
                        <div className="flex items-center text-slate-500 font-medium">
                            <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                            {property.suburb}, Australia
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 py-6 px-8 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Bed className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Beds</div>
                                <div className="text-lg font-bold text-slate-900">{property.beds}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Bath className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Baths</div>
                                <div className="text-lg font-bold text-slate-900">{property.baths}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Trees className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</div>
                                <div className="text-lg font-bold text-slate-900 capitalize">{property.type.toLowerCase()}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Listed</div>
                                <div className="text-lg font-bold text-slate-900">{new Date(property.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">About this Property</h2>
                        <p className="text-lg leading-relaxed text-slate-600 font-normal">
                            {property.description}
                        </p>
                    </div>

                    <Separator className="bg-slate-100" />
                </div>

                {/* Sidebar / Sidebar Card */}
                <div className="space-y-6">
                    <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 bg-white overflow-hidden ring-1 ring-slate-100">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                                        <User className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Listing Agent</div>
                                        <div className="text-xl font-bold text-slate-900 leading-tight">Maddison Harper</div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                                    <div className="flex items-center text-sm font-medium text-slate-600">
                                        <Phone className="w-4 h-4 mr-2 text-indigo-400" />
                                        +61 400 123 456
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-slate-600">
                                        <Mail className="w-4 h-4 mr-2 text-indigo-400" />
                                        agent@techkraft.com
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-md shadow-lg shadow-indigo-200 transition-all active:scale-95">
                                    Request Inspection
                                </Button>
                                <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
                                    Contact Agent
                                </Button>
                            </div>

                            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                                Response time: ~2 hours
                            </p>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-3xl bg-indigo-950 text-white space-y-4 shadow-xl shadow-indigo-900/10">
                        <div className="text-sm font-bold opacity-60 uppercase tracking-widest">Mortgage Estimate</div>
                        <div className="text-3xl font-bold">${Math.round(property.price / 300)}<span className="text-lg opacity-60 font-medium font-sans">/mo</span></div>
                        <p className="text-xs opacity-60 leading-relaxed font-medium">
                            Based on 20% down payment and 4.2% interest rate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PropertyDetailSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-10 space-y-10">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-32 rounded-lg" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>
            <Skeleton className="w-full aspect-[21/9] rounded-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-3/4 rounded-xl" />
                        <Skeleton className="h-6 w-1/2 rounded-lg" />
                    </div>
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-1/4 rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-96 w-full rounded-3xl" />
                    <Skeleton className="h-32 w-full rounded-3xl" />
                </div>
            </div>
        </div>
    );
}