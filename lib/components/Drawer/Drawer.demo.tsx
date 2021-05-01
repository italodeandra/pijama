import { appDrawerState } from "../../../src/components/AppDrawer/AppDrawer.state"
import { InlineIcon } from "@iconify/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"
import { useDocumentation } from "../../hooks"
import { useEffect } from "react"

export const DrawerDemo = () => {
  const { placement } = useDocumentation(
    {
      placement: {
        description: "Placement of the drawer.",
        options: ["left", "right"],
        value: "left",
      },
    },
    ({ placement }) => `<Drawer${
      placement !== "left" ? ` placement="${placement}"` : ""
    }>
  The content should be here
</Drawer>`
  )
  useEffect(() => {
    appDrawerState.placement = placement
    return () => {
      appDrawerState.placement = "left"
    }
  }, [placement])
  return (
    <>
      The component is on the {placement}. You can open it on while clicking on
      the button <InlineIcon icon={menuIcon} /> on the top.
    </>
  )
}
