export enum ResourceType {
    Collection = "collections",
    Environment = "environment",
}

export interface PushedResource {
    id: string,
    name: string,
    time: string,
}

export interface PulledResource {
    id: string,
    time: string,
}