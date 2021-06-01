import { Button } from "../Button/Button"
import { Menu } from "./Menu"
import { MenuItem } from "./MenuItem"
import { useDocumentation } from "../../hooks"

export const MenuDemo = () => {
  const props = useDocumentation(
    {
      placement: {
        description: "Placement of the menu.",
        options: ["bottom", "mouse"],
        value: "bottom",
      },
    },
    ({ placement }) => `<Menu${
      placement !== "bottom"
        ? `
  placement="${placement}"`
        : ""
    }
  options={<>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
  </>}
>
  <Button>Click to show a menu</Button>
</Menu>`
  )

  return (
    <Menu
      {...props}
      options={
        <>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </>
      }
    >
      <Button>Click to show a menu</Button>
    </Menu>
  )
}
