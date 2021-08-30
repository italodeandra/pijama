import { Collection } from "mongodb";
import connectToDatabase from "./connectToDatabase";

export default function createRepository<TSchema>(
  collectionName: string,
  setup?: () => Promise<void> | void
): Collection<TSchema> {
  let collection: Collection<TSchema>;

  return new Proxy<Collection<TSchema>>({} as unknown as Collection<TSchema>, {
    get: function (target, prop) {
      return async (...props: any) => {
        if (!collection) {
          collection = (await connectToDatabase()).db.collection<TSchema>(
            collectionName
          );
          await setup();
        }
        return collection[prop](...props);
      };
    },
  });
}
