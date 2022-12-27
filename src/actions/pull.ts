import { writeFileSync } from "fs";
import { PulledResource } from "../types/resources";
import PostmanRequestHelper from "../helpers/PostmanRequestHelper";
import StateHelper from "../helpers/StateHelper";

export default async function pull(stateKey: string) {
    const currentState = StateHelper.get(stateKey);
    const resource = await PostmanRequestHelper.get(`/${currentState.type}/${currentState.id}`);
    writeFileSync(currentState.path, JSON.stringify(resource, null, 2));
    currentState.pulled = (
        currentState.pulled ||
        [
            {
                id: currentState.id,
                time: new Date().toISOString()
            } as PulledResource
        ]
    );
    StateHelper.set(currentState, stateKey);
    StateHelper.store();
}