import { Portal } from "./Portal"
import { useDocumentation } from "../../hooks"

export const PortalDemo = () => {
  useDocumentation(
    {},
    () => `<div>
  <Portal>This will be rendered outside of the div</Portal>
</div>`
  )

  return (
    <div>
      <Portal>This will be rendered outside of the div</Portal>
    </div>
  )
}
