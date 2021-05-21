import { Text } from "./Text"
import { useDocumentation } from "../../hooks"

export const TextDemo = () => {
  const { children, icon, ...props } = useDocumentation(
    {
      block: {
        description: "If the text should be a block.",
        options: [true, false],
        value: false,
      },
      bold: {
        description: "If the text should be bold.",
        options: [true, false],
        value: false,
      },
      center: {
        description: "If the text should be centered.",
        options: [true, false],
        value: false,
      },
      children: {
        description: "The content of the text.",
        value: "This is a text",
      },
      code: {
        description: "If the text should be a code.",
        options: [true, false],
        value: false,
      },
      ellipsis: {
        description: "If the text should have ellipsis when too big.",
        options: [true, false],
        value: false,
      },
      header: {
        description: "If the text should be a header.",
        options: [true, false],
        value: false,
      },
      italic: {
        description: "If the text should be italic.",
        options: [true, false],
        value: false,
      },
      justify: {
        description: "If the text should be justified.",
        options: [true, false],
        value: false,
      },
      paragraph: {
        description: "If the text should be a paragraph.",
        options: [true, false],
        value: false,
      },
      select: {
        description: "If should be possible to select the text.",
        options: [true, false, "all"],
        value: false,
      },
      subheader: {
        description: "If the text should be a subheader.",
        options: [true, false],
        value: false,
      },
    },
    ({
      block,
      bold,
      center,
      children,
      code,
      ellipsis,
      header,
      italic,
      justify,
      paragraph,
      select,
      subheader,
    }) => {
      const properties = `${
        block
          ? `
  block`
          : ""
      }${
        bold
          ? `
  bold`
          : ""
      }${
        center
          ? `
  center`
          : ""
      }${
        code
          ? `
  code`
          : ""
      }${
        ellipsis
          ? `
  ellipsis`
          : ""
      }${
        header
          ? `
  header`
          : ""
      }${
        italic
          ? `
  italic`
          : ""
      }${
        justify
          ? `
  justify`
          : ""
      }${
        paragraph
          ? `
  paragraph`
          : ""
      }${
        select
          ? select === "all"
            ? `
  select="all"`
            : `
  select`
          : ""
      }${
        subheader
          ? `
  subheader`
          : ""
      }`
      return `<Text${
        properties
          ? `${properties}
`
          : ""
      }>${children}</Text>`
    }
  )

  return <Text {...props}>{children}</Text>
}
