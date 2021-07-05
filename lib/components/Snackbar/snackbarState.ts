import { createRef, Ref } from "react";
import { proxy, ref } from "valtio";
import remove from "lodash/remove";
import { v4 as uuid } from "uuid";

export type IMessage = {
  id: string;
  content: string;
  nodeRef: Ref<HTMLDivElement>;
  variant?: MessageVariant;
};

export type MessageVariant = "default" | "error";

const snackbarState = proxy({
  messages: [] as IMessage[],
});

export default snackbarState;

/**
 * The Snackbar API that creates a new message on the snackbar.
 *
 * [Demo](https://pijama.majapi.com.br/components/Snackbar)
 */
export const notify = (
  message: string,
  options?: { suppress?: boolean; variant?: MessageVariant }
) => {
  if (options?.suppress) {
    const existingMessage = snackbarState.messages.find(
      (m) => m.content === message
    );
    if (existingMessage) {
      return existingMessage.id;
    }
  }
  const id = uuid();
  snackbarState.messages.push({
    content: message,
    id,
    nodeRef: ref(createRef()),
    variant: options?.variant,
  });
  return id;
};

/**
 * The Snackbar API that removes an existing message on the snackbar.
 */
export const removeNotification = (id: string) => {
  remove(snackbarState.messages, (m) => m.id === id);
};
