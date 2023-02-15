import { PulledResource, PushedResource, ResourceType } from "./resources"

export const DEFAULT_STATE_KEY: string = "default";

export interface State {
    id?: string,
    type?: ResourceType.Collection | ResourceType.Environment,
    path?: string,
    dir?: string,
    pushed?: Array<PushedResource>
    pulled?: Array<PulledResource>
}

export interface States {
    [key: string]: State
}