import { useQuery } from '@tanstack/react-query'
import { propertyAPI } from './Property.api'
import axios from 'axios';

export const useGetPaginatedProperties = () => {
    return useQuery({
        queryKey: [propertyAPI.getPropertyListing.actionName],

        queryFn: async () => {
            const response = await axios.get(propertyAPI.getPropertyListing.controllerName);
            return response.data;
        }
    })


}