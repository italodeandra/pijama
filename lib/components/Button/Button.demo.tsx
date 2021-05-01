import { Button } from "./Button"
import { useDocumentation } from "../../hooks"

export const ButtonDemo = () => {
  const props = useDocumentation(
    {
      children: {
        description: "The label or content.",
        value: "Button",
      },
      color: {
        description:
          "The color of the background when contained, color of the border when outlined, or color of the text.",
        value: "primary",
      },
      href: {
        description: "Turn the button into a link.",
        value: "",
      },
    },
    ({ children, color, href }) => `<Button color="${color}"${
      href ? ` href="${href}"` : ""
    }>
  ${children}
</Button>`
  )

  return <Button {...props} />
}
