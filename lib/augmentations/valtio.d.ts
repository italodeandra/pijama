export { ref, snapshot, getVersion, proxy, subscribe } from "valtio"

declare module "valtio" {
  declare const enum AsRef {}

  type Options = {
    sync?: boolean
  }

  export declare type DeepResolveType<T> = T extends Function
    ? T
    : T extends { current: unknown }
    ? T
    : T extends AsRef
    ? T
    : T extends Promise<infer V>
    ? V
    : T extends object
    ? {
        [K in keyof T]: DeepResolveType<T[K]>
      }
    : T

  export declare const useSnapshot: <T extends object>(
    proxyObject: T,
    options?: Options | undefined
  ) => DeepResolveType<T>
}
