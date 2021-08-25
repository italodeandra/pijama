import { Collection } from "mongodb";
import connectToDatabase from "./connectToDatabase";

export function createRepository<TSchema>(
  collectionName: string
): Collection<TSchema> {
  let collection: Collection<TSchema>;

  return new Proxy<Collection<TSchema>>({} as unknown as Collection<TSchema>, {
    get: function (target, prop) {
      return async (...props: any) => {
        collection =
          collection ||
          (await connectToDatabase()).db.collection(collectionName);
        return (collection as any)[prop](...props);
      };
    },
  });
}
