import { existsSync, readFileSync, writeFileSync } from 'fs';
import StateHelper from '../helpers/StateHelper';
import pull from './pull';
import MarkdowmHelper from '../helpers/MarkdowmHelper';
import { Collection } from '../types/collection';

export default async function genDoc(stateKey: string) {
  const currentState = StateHelper.get(stateKey);
  const resource = (existsSync(currentState.path)) ? JSON.parse(readFileSync(currentState.path, 'utf8')) : await pull(stateKey);
  const docsString = MarkdowmHelper.generate(resource as Collection);
  writeFileSync(currentState.path.replace('.json', '.md'), docsString);
}
