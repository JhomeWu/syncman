import fs from 'fs';
import path from 'path'
import { DEFAULT_STATE_KEY, State, States } from '../types/state';

class StateHelper {
    private static state: States = {};

    private static getStatePath() {
        return path.resolve(process.cwd(), './sync-state.json');
    }

    private static loadState() {
        const statPath = this.getStatePath();
        if (fs.existsSync(statPath)) {
            return JSON.parse(fs.readFileSync(statPath, 'utf-8'))
        }
        return {};
    }

    static init() {
        if (this.isEmptyState()) {
            this.state = this.loadState();
        }
    }

    static isEmptyState(): boolean {
        return Object.keys(this.state).length === 0
    }

    static get(key: string = DEFAULT_STATE_KEY): State {
        this.init();
        return (this.state?.[key] ?? {});
    }

    static isValid(validState: State): boolean {
        if (
            !validState.id
            || !validState.type
            || !validState.path
        ) {
            return false;
        }
        return true
    }

    static set(newState: State, key: string = DEFAULT_STATE_KEY) {
        this.state[key] = newState;
    }

    static store() {
        const statPath = this.getStatePath();
        try {
            fs.writeFileSync(statPath, JSON.stringify(this.state, null, 2));
        } catch (e) {
            throw new Error(`Failed to write ${statPath} config file!`);
        }
    }
}

export default StateHelper;