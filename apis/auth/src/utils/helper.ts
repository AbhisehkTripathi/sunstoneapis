const Helper = {
    getExceptioalRoutes(): string[] | undefined {
        const routes = process.env.ROUTES_TO_EXCLUDE?.split(",");
        return routes
   }
}
export default Helper