import { Button } from "./Button"
import homeIcon from "@iconify/icons-heroicons-outline/home"
import Icon from "@iconify/react"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const ButtonDemo = () => {
  const { children, icon, ...props } = useDocumentation(
    {
      children: {
        description: "The label or content.",
        value: "Button",
      },
      color: {
        description:
          "The color of the background when contained, color of the border when outlined, or color of the text.",
        options: [
          "primary",
          "secondary",
          "error",
          "textPrimary",
          "textSecondary",
        ],
        value: "primary",
      },
      href: {
        description: "Turn the button into a link.",
        value: undefined,
      },
      icon: {
        description: "If should be shown with a square style for icons.",
        options: [true, false],
        value: false,
      },
      onClick: {
        description: "Click event handler.",
        readOnly: true,
        value: "MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>",
      },
      size: {
        description: "Size of the button.",
        options: ["small", "normal"],
        value: "normal",
      },
      type: {
        description: "Type of the button.",
        options: ["button", "submit", "reset"],
        value: "button",
      },
      variant: {
        description: "The variant style.",
        options: ["contained", "outlined", "text"],
        value: "contained",
      },
    },
    ({ children, color, href, icon, size, type, variant }) => `<Button
  color="${color}"${
      href
        ? `
  href="${href}"`
        : ""
    }${
      icon
        ? `
  icon`
        : ""
    }
  size="${size}"
  type="${type}"
  variant="${variant}"
>
  ${!icon ? children : `<Icon icon={homeIcon} />`}
</Button>`
  )

  return (
    <Button icon={icon} {...props}>
      {!icon ? children : <Icon icon={homeIcon} />}
    </Button>
  )
}
