import { Ziggy } from "@/ziggy";
import { useRoute } from "ziggy-js";
import { usePage } from "@inertiajs/react";
type ZiggyRoutes = typeof Ziggy.routes;
type ZiggyRouteNames = keyof ZiggyRoutes;

export function useZiggy() {
    const ziggyRoute = useRoute({
        url: Ziggy.url,
        routes: Ziggy.routes,
        port: Ziggy.port,
        defaults: Ziggy.defaults,
    });
    const route = (name: ZiggyRouteNames, params: Record<string, any> = {}) => {
        return ziggyRoute(name, params, false);
    };
    const current = () => {
        const {url} = usePage()
        return url
    };
    return { route, current };
}
