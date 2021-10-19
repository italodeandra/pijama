import { Collection } from "mongodb";
import connectToDatabase from "./connectToDatabase";

export default function createRepository<TSchema>(
  collectionName: string,
  setup?: () => Promise<void> | void
): Collection<TSchema> {
  let collection = global.mongo.collections[collectionName];
  return new Proxy<Collection<TSchema>>({} as unknown as Collection<TSchema>, {
    get: function (target, prop) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return async (...props: any) => {
        if (!collection) {
          collection = global.mongo.collections[collectionName] = (
            await connectToDatabase()
          ).db.collection<TSchema>(collectionName);
          if (setup) {
            await setup();
          }
        }
        return collection[prop](...props);
      };
    },
  });
}
