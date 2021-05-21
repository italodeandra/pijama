import { Json } from "./Json"
import { useDocumentation } from "../../hooks"

export const JsonDemo = () => {
  const props = useDocumentation(
    {
      json: {
        description: "The JSON object that will be stringified and rendered.",
        value: '{"number": 1, "string": "text", "null": null, "boolean": true}',
      },
      label: {
        description:
          "A label to differentiate if more than one Json component. ",
        value: "Label",
      },
    },
    ({ label }) => `<Json json={json}${label ? ` label="${label}"` : ""} />`
  )

  return <Json {...props} />
}
