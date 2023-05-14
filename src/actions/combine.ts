/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { readFileSync } from 'fs';
import {
  Collection,
  Item,
  ItemGroup,
} from 'postman-collection';
import StateHelper from '../helpers/StateHelper';
import FileHelper from '../helpers/FileHelper';

async function getItems(path: string, itemDir: string): Promise<ItemGroup<Item>> {
  const definitionPath = `${path}/${itemDir}.json`;

  const definitionJson = JSON.parse(readFileSync(definitionPath, 'utf8'));

  const itemPath = `${path}/items`;
  // recursive all folders in itemPath
  const allItemFolder = FileHelper.getDirs(itemPath);

  definitionJson.item = [];
  for (const itemFolder of allItemFolder) {
    const item = await getItems(`${itemPath}/${itemFolder}`, itemFolder);
    definitionJson.item.push(item);
  }

  return definitionJson;
}

export default async function combine(stateKey: string) {
  const currentState = StateHelper.get(stateKey);
  // Get path without file name
  const currentPathFolder = currentState.path.substring(0, currentState.path.lastIndexOf('/'));
  const currentSplitDir = currentState.dir
    ?? currentState.path.substring(0, currentState.path.lastIndexOf('/'));

  // read definition
  const ans = await getItems(currentSplitDir, 'definition');
  const collection = new Collection(ans);
  FileHelper.mkdir(`./.fake/${currentPathFolder}`);
  FileHelper.writeJson(`./.fake/${currentState.path}`, collection.toJSON());
}
