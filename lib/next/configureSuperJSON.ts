import { ObjectId } from "bson";
import SuperJSON from "superjson";

SuperJSON.registerCustom<ObjectId, string>(
  {
    isApplicable: (v): v is ObjectId => v instanceof ObjectId,
    serialize: (v) => v.toHexString(),
    deserialize: (v) => new ObjectId(v),
  },
  "objectid"
);
