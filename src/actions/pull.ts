import { writeFileSync } from 'fs';
import { PulledResource } from '../types/resources';
import PostmanRequestHelper from '../helpers/PostmanRequestHelper';
import StateHelper from '../helpers/StateHelper';
import FileHelper from '../helpers/FileHelper';

export default async function pull(stateKey: string) {
  const currentState = StateHelper.get(stateKey);
  const response = await PostmanRequestHelper.get(`/${currentState.type}/${currentState.id}`);
  const resourceKey = currentState.type.slice(0, -1);
  const resource = response?.[resourceKey] ?? {};
  delete resource.info._postman_id;
  const splitDir = currentState.path.substring(0, currentState.path.lastIndexOf('/'));
  FileHelper.mkdir(splitDir);
  writeFileSync(currentState.path, JSON.stringify(resource, null, 2));
  currentState.pulled = currentState.pulled ?? [];
  currentState.pulled.push(
        {
          id: currentState.id,
          time: new Date().toISOString(),
        } as PulledResource,
  );
  StateHelper.set(currentState, stateKey);
  StateHelper.store();
  return resource;
}
