import { proxy } from "valtio"

export const appDrawerState = proxy({
  placement: "left" as "left" | "right",
})
