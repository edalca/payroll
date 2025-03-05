import { Config } from 'ziggy-js';

export interface User {
    name: string;
    email: string;
}

export interface ZiggyData {
    [key: string]: any;
    location?: string;
    routes?: { [key: string]: { uri: string; methods: string[] } };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
