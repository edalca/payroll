import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ZiggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";
import { IStaticMethods } from "preline/preline";

declare global {
    interface Window {
        axios: AxiosInstance;
        HSStaticMethods: IStaticMethods;
    }
    /* eslint-disable no-var */
    var route: typeof ZiggyRoute;
}
