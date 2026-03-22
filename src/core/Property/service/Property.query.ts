import { useQuery } from '@tanstack/react-query'
import { propertyAPI } from './Property.api'
import axios from 'axios';

export interface PropertyFilters {
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    type?: string;
    suburb?: string;
    search?: string;
}

export const useGetPaginatedProperties = (filters?: PropertyFilters) => {
    return useQuery({
        queryKey: [propertyAPI.getPropertyListing.actionName, filters],

        queryFn: async () => {
            const response = await axios.get(propertyAPI.getPropertyListing.controllerName, {
                params: filters
            });
            return response.data;
        }
    })
}