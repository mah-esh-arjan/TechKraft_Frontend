import { useQuery } from '@tanstack/react-query'
import { propertyAPI } from './Property.api'
import axios from 'axios';

export interface PropertyFilters {
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    type?: string;
    search?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export const useGetPaginatedProperties = (filters?: PropertyFilters, pagination?: PaginationParams) => {
    return useQuery({
        queryKey: [propertyAPI.getPropertyListing.actionName, filters, pagination],

        queryFn: async () => {
            const response = await axios.get(propertyAPI.getPropertyListing.controllerName, {
                params: {
                    ...filters,
                    ...pagination
                }
            });
            return response.data;
        }
    })
}