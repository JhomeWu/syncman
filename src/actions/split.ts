import { existsSync, readFileSync } from 'fs';
import {
  Collection,
  Item,
  ItemGroup,
  ItemGroupDefinition,
} from 'postman-collection';
import FileHelper from '../helpers/FileHelper';
import StateHelper from '../helpers/StateHelper';
import pull from './pull';

function storeDefinition(path: string, json: ItemGroupDefinition): void {
  const { item, ...others } = json;
  const { name = 'definition' } = others;

  FileHelper.writeJson(`${path}/${FileHelper.norm(name)}.json`, others);
}

function storeItems(item: Item | ItemGroup<Item>, path: string) {
  const itemDir = FileHelper.mkdir(`${path}/${FileHelper.norm(item.name)}`);
  storeDefinition(itemDir, item.toJSON());
  if (item instanceof ItemGroup) {
    item.items.each((childItem) => {
      FileHelper.mkdir(`${itemDir}/items`);
      storeItems(childItem, `${itemDir}/items`);
    });
  } else if (item instanceof Item) {
    // TODO: split item event prescript and test to .js
  }
}

export default async function split(stateKey: string) {
  const currentState = StateHelper.get(stateKey);
  const resource = existsSync(currentState.path)
    ? JSON.parse(readFileSync(currentState.path, 'utf8'))
    : await pull(stateKey);
  const collection = new Collection(resource);
  if (!Collection.isCollection(collection)) {
    throw new Error(`Can't load valid Collection from stateKey:${stateKey}`);
  }
  const splitDir = currentState.dir
    ?? currentState.path.substring(0, currentState.path.lastIndexOf('/'));
  FileHelper.mkdir(`${splitDir}/items`);
  storeDefinition(splitDir, collection.toJSON());
  collection.items.each((item) => {
    storeItems(item, `${splitDir}/items`);
  });
}
