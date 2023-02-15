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
      path: './.collections/default.collection.json',
      dir: './.splits/default',
      pushed: [],
      pulled: [],
    });
    StateHelper.store();
  }
}
