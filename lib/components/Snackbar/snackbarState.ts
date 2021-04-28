import { createRef, Ref } from "react"
import { proxy, ref } from "valtio"
import { remove } from "lodash"
import { uuid } from "../../utils"

export type IMessage = {
  id: string
  content: string
  nodeRef: Ref<HTMLDivElement> & ReturnType<typeof ref>
}

export const snackbarState = proxy({
  messages: [] as IMessage[],
})

export const notify = (message: string) => {
  const id = uuid()
  snackbarState.messages.push({
    content: message,
    id,
    nodeRef: ref(createRef()),
  })
  return id
}

export const removeNotification = (id: string) => {
  remove(snackbarState.messages, (m) => m.id === id)
}
