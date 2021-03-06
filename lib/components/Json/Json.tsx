import Typography, { TypographyProps } from "@material-ui/core/Typography"
import Blue from "../../styles/colors/Blue"
import Gray from "../../styles/colors/Gray"
import Green from "../../styles/colors/Green"
import NoSsr from "@material-ui/core/NoSsr"
import Orange from "../../styles/colors/Orange"
import Purple from "../../styles/colors/Purple"
import type { SxProps } from "@material-ui/system/styleFunctionSx"
import type { VFC } from "react"

const jsonStyles: SxProps = {
  "& .boolean": {
    color: Orange.N500,
  },
  "& .key": {
    color: Purple.N500,
  },
  "& .null": {
    color: Gray.N400,
  },
  "& .number": {
    color: Blue.N500,
  },
  "& .string": {
    color: Green.N500,
  },
}

export interface JsonProps
  extends Omit<TypographyProps, "children" | "sx" | "variant"> {
  /**
   * The JSON object that will be stringified and rendered.
   */
  json: any
  /**
   * A label to differentiate if more than one Json component.
   */
  label?: string
}

/**
 * Show a JSON object formatted and colored. Useful for debugging.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-json--json)
 *
 * @example
 * <Json json='{ "number": 1 }' />
 */
const Json: VFC<JsonProps> = ({ json, label, ...props }) => {
  if (typeof json !== "undefined") {
    return (
      <NoSsr>
        <Typography
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(json, label) }}
          {...props}
          sx={jsonStyles}
          variant="codeBlock"
        />
      </NoSsr>
    )
  } else {
    return <></>
  }
}

export default Json

function syntaxHighlight(json: any, label?: string) {
  try {
    if (typeof json != "string") {
      json = JSON.stringify(json, undefined, 2) || "Function"
    } else {
      json = JSON.stringify(JSON.parse(json), undefined, 2)
    }
  } catch (e) {
    console.error(e)
    json = "Error"
  }
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return (
    (label ? label + ": " : "") +
    json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match: string) {
        let cls = "number"
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key"
          } else {
            cls = "string"
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean"
        } else if (/null/.test(match)) {
          cls = "null"
        }
        return `<span class="${cls}">${match}</span>`
      }
    )
  )
}
