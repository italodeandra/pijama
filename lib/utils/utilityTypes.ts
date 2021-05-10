/**
 * Makes the type Partial (all properties optional) deeply (recursively on all
 * children, children of the children and so on)
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
