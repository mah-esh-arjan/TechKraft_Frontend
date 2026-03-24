import { useQuery } from '@tanstack/react-query'
import { propertyAPI } from './Property.api'
import api from '@/lib/axios';
import type { Property } from '../types';

export interface PaginatedPropertyResponse {
    items: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type PropertyType = 'APARTMENT' | 'HOUSE' | 'VILLA' | '';

export interface PropertyFilters {
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    type?: PropertyType;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export const useGetPaginatedProperties = (filters?: PropertyFilters, pagination?: PaginationParams) => {
    return useQuery<PaginatedPropertyResponse>({
        queryKey: [propertyAPI.getPropertyListing.actionName, filters, pagination],

        queryFn: async () => {
            const response = await api.get(propertyAPI.getPropertyListing.controllerName, {
                params: {
                    ...filters,
                    ...pagination
                }
            });
            return response.data;
        }
    })
}

export const useGetPropertyDetail = (id: number) => {
    return useQuery({
        queryKey: [propertyAPI.getPropertyDetail.actionName, id],

        queryFn: async () => {
            const response = await api.get(propertyAPI.getPropertyDetail.controllerName.replace(":id", id.toString()));

            return response.data;
        }
    })
}