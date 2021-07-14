import { proxy } from "valtio";

let timeout;

const nProgressState = proxy({
  initialDelay: 300,
  value: undefined as number | undefined,
  set(value: number | undefined) {
    nProgressState.value = value;
  },
  start() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      nProgressState.set(0);
      timeout = undefined;
    }, nProgressState.initialDelay);
  },
  finish() {
    if (timeout) {
      clearTimeout(timeout);
    } else {
      if (nProgressState.value !== undefined) {
        nProgressState.set(100);
      }
    }
  },
});

export default nProgressState;
