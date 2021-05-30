import {
  Blue,
  ComponentShorthandProps,
  Gray,
  Green,
  Orange,
  Purple,
  withTheme,
} from "../../styles"
import React, { VFC } from "react"
import { css } from "@emotion/react"
import { DisableSsr } from "../DisableSsr/DisableSsr"
import { Text } from "../Text/Text"

const jsonStyles = withTheme((theme, sh) =>
  css(
    sh({
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
    })
  )
)

export type JsonProps = {
  /**
   * The JSON object that will be stringified and rendered.
   */
  json: any
  /**
   * A label to differentiate if more than one Json component.
   */
  label?: string
} & ComponentShorthandProps

/**
 * Show a JSON object formatted and colored. Useful for debugging.
 *
 * [Demo](https://pijama.majapi.com.br/components/Json)
 *
 * @example
 * <Json json='{ "number": 1 }' />
 */
export const Json: VFC<JsonProps> = ({ json, label, ...props }) => {
  if (typeof json !== "undefined") {
    return (
      <DisableSsr>
        <Text
          block
          code
          css={jsonStyles}
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(json, label) }}
          {...props}
        />
      </DisableSsr>
    )
  } else {
    return <></>
  }
}

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
