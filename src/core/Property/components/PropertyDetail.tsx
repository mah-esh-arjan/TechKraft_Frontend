import { useParams } from "@tanstack/react-router";
import { useGetPropertyDetail } from "../service/Property.query"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, Trees, MapPin, Calendar, User, Mail, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { AdminPropertyMeta } from "./AdminPropertyMeta";

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
    const getPropertyImage = (type: string) => {
        switch (type) {
            case 'APARTMENT': return '/Apartment.jpeg';
            case 'HOUSE': return '/house.jpeg';
            case 'VILLA': return '/Villa.jpeg';
            default: return '/house.jpeg';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => navigate({ to: '/' })} className="text-slate-500 hover:text-slate-900 -ml-2 h-8 px-2 text-xs">
                    <ChevronLeft className="w-3 h-3 mr-1" />
                    Back
                </Button>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-2 py-0.5 bg-white/50 backdrop-blur-sm shadow-sm border-slate-100 uppercase tracking-widest text-[9px] font-bold">
                        {property.type}
                    </Badge>
                    <Badge variant="outline" className="px-2 py-0.5 bg-green-50 text-green-700 border-green-100 uppercase tracking-widest text-[9px] font-bold">
                        Active
                    </Badge>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50">
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={getPropertyImage(property.type)}
                        alt={property.name}
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                </AspectRatio>
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold tracking-tight">${property.price}</span>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">
                            {property.name}
                        </h1>
                        <div className="flex items-center text-slate-500 font-medium text-sm">
                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                            {property.suburb}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-4 px-5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Bed className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Beds</div>
                                <div className="text-sm font-bold text-slate-900">{property.beds}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Bath className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Baths</div>
                                <div className="text-sm font-bold text-slate-900">{property.baths}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Trees className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Type</div>
                                <div className="text-sm font-bold text-slate-900 capitalize">{property.type.toLowerCase()}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Listed</div>
                                <div className="text-sm font-bold text-slate-900">{new Date(property.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-lg font-bold text-slate-900">About</h2>
                        <p className="text-sm leading-relaxed text-slate-600 font-normal">
                            {property.description}
                        </p>
                    </div>

                    <Separator className="bg-slate-100" />
                </div>


                {/* Sidebar / Sidebar Card */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="rounded-2xl border-none shadow-lg shadow-slate-200/40 bg-white overflow-hidden ring-1 ring-slate-100">
                        <CardContent className="p-5 space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Listing Agent</div>
                                        <div className="text-base font-bold text-slate-900 leading-tight">{property.agent.name}</div>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 space-y-2">
                                    <div className="flex items-center text-[11px] font-bold text-slate-600">
                                        <Mail className="w-3.5 h-3.5 mr-2 text-indigo-400" />
                                        {property.agent.email}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <AdminPropertyMeta metaData={property.metaData} />
                </div>
            </div>
        </div>

    );
}

const PropertyDetailSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded-lg" />
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
            </div>
            <Skeleton className="w-full aspect-video rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-3/4 rounded-xl" />
                        <Skeleton className="h-5 w-1/2 rounded-lg" />
                    </div>
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-1/4 rounded-lg" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

