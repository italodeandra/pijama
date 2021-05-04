import { Link } from "./Link"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const LinkDemo = () => {
  const { children, icon, ...props } = useDocumentation(
    {
      children: {
        description: "Content of the link.",
        value: "Link",
      },
      color: {
        description: "The color of the link.",
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
        description: "URL of the link.",
        value: "https://majapi.com",
      },
    },
    ({ children, color, href }) => `<Link${
      color !== "primary"
        ? `
  color="${color}"`
        : ""
    }
  href="${href}"
>
  ${children}
</Link>`
  )

  return <Link {...props}>{children}</Link>
}
