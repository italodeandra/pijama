import { createRef, Ref } from "react"
import { proxy, ref } from "valtio"
import { remove } from "lodash"
import { uuid } from "../../utils"

export type IMessage = {
  id: string
  content: string
  nodeRef: Ref<HTMLDivElement>
}

export const snackbarState = proxy({
  messages: [] as IMessage[],
})

/**
 * The Snackbar API that creates a new message on the snackbar.
 *
 * [Demo](https://pijama.majapi.com.br/components/Snackbar)
 */
export const notify = (message: string) => {
  const id = uuid()
  snackbarState.messages.push({
    content: message,
    id,
    nodeRef: ref(createRef()),
  })
  return id
}

/**
 * The Snackbar API that removes an existing message on the snackbar.
 */
export const removeNotification = (id: string) => {
  remove(snackbarState.messages, (m) => m.id === id)
}
