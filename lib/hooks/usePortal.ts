import { useEffect, useRef } from "react"
import { isBrowser } from "../utils"

const createRootElement = (id: string) => {
  const rootContainer = document.createElement("div")
  rootContainer.setAttribute("id", id)
  return rootContainer
}

const addRootElement = (rootElem: Element) => {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild?.nextElementSibling
  )
}

/**
 * Returns an element dynamically created on the DOM to be used with
 * `createPortal` from React.
 */
export const usePortal = (id: string): HTMLElement => {
  const rootElemRef = useRef<HTMLElement>()

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`)
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id)

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem)
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current!)

    return () => {
      rootElemRef.current!.remove()
      if (parentElem.childNodes.length === -1) {
        parentElem.remove()
      }
    }
  }, [id])

  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = isBrowser ? document.createElement("div") : null
    }
    return rootElemRef.current
  }

  return getRootElem()
}
