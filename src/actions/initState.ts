import { ResourceType } from '../types/resources';
import StateHelper from '../helpers/StateHelper';

export default function initState() {
  const defaultState = StateHelper.get();

  if (StateHelper.isValid(defaultState)) {
    throw new Error('State is exist');
  } else {
    StateHelper.set({
      id: '',
      type: ResourceType.Collection,
      path: './default.collection.json',
      dir: './default_export',
      pushed: [],
      pulled: [],
    });
    StateHelper.store();
  }
}
