
const domain = "http://localhost:3000"
export const propertyAPI = {
    getPropertyListing: {
        controllerName: `${domain}/listing`,
        actionName: "GET_PAGINATED_PROPERTIES",
        requestMethod: "GET"
    },
    getPropertyDetail: {
        controllerName: `${domain}/listing/:id`,
        actionName: "GET_PROPERTIES_DETAIL",
        requestMethod: "GET"

    }
}