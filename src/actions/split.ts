import { existsSync, readFileSync } from 'fs';
import { Collection, Item, ItemGroup } from 'postman-collection';
import StateHelper from '../helpers/StateHelper';
import pull from './pull';

function storeItems(item: Item | ItemGroup<Item>) {
  if (item instanceof ItemGroup) {
    console.log(`Folder:${item.name}`);
    item.items.each(storeItems);
  } else if (item instanceof Item) {
    console.log(`Request:${item.name}`);
  }
}

export default async function split(stateKey: string) {
  const currentState = StateHelper.get(stateKey);
  const resource = (existsSync(currentState.path)) ? JSON.parse(readFileSync(currentState.path, 'utf8')) : await pull(stateKey);
  const collection = new Collection(resource);
  if (!Collection.isCollection(collection)) {
    throw new Error(`Can't load valid Collection from stateKey:${stateKey}`);
  }
  collection.items.each(storeItems);
}
