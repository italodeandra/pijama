import { TextField } from "./TextField"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const TextFieldDemo = () => {
  const { sh, type, ...props } = useDocumentation(
    {
      as: {
        description: "Change which HTML element or React component should be.",
        value: undefined,
      },
      color: {
        description: "The color of the highlight when focused.",
        options: [
          "primary",
          "secondary",
          "error",
          "textPrimary",
          "textSecondary",
        ],
        value: "primary",
      },
      defaultValue: {
        description: "The default value of the input.",
        value: undefined,
      },
      disabled: {
        description:
          "If the input should be disabled and should show disabled color.",
        options: [true, false],
        value: false,
      },
      error: {
        description: "If should show error color.",
        options: [true, false],
        value: false,
      },
      helperText: {
        description: "Text to be shown above the input.",
        value: "Helper text",
      },
      id: {
        description: `ID of the input that will be used for linking with the label. If empty it will be used the name or label text.`,
        value: undefined,
      },
      label: {
        description: "Label on top of the field.",
        value: "Label",
      },
      name: {
        description: "Name on the input.",
        value: undefined,
      },
      onChangeValue: {
        description: "Change value event handler.",
        readOnly: true,
        value: "(value: V, event: ChangeEvent<E>) => void",
      },
      placeholder: {
        description: "Placeholder of the input.",
        value: "Placeholder",
      },
      readOnly: {
        description: "If the input should be read only.",
        options: [true, false],
        value: false,
      },
      sh: {
        description: "Styles shorthand.",
        value: undefined,
      },
      type: {
        description: "Type of the input.",
        options: ["text", "tel", "email", "password", "select"],
        value: "text",
      },
      value: {
        description: "The value of the input.",
        value: undefined,
      },
    },
    ({
      as,
      color,
      defaultValue,
      disabled,
      error,
      helperText,
      id,
      label,
      name,
      placeholder,
      readOnly,
      type,
      value,
    }) => {
      const properties = `${
        as
          ? `
  as="${as}"`
          : ""
      }
  color="${color}"${
        defaultValue
          ? `
  defaultValue="${defaultValue}"`
          : ""
      }${
        disabled
          ? `
  disabled`
          : ""
      }${
        error
          ? `
  error`
          : ""
      }
  helperText="${helperText}"${
        id
          ? `
  id="${id}"`
          : ""
      }
  label="${label}"${
        name
          ? `
  name="${name}"`
          : ""
      }
  placeholder="${placeholder}"${
        readOnly
          ? `
  readOnly`
          : ""
      }
  type="${type}"${
        value
          ? `
  value="${value}"`
          : ""
      }
`
      return type !== "select"
        ? `<TextField${properties}/>`
        : `<TextField${properties}>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</TextField>`
    }
  )

  const tryParseJson = (jsonString?: string) => {
    try {
      return jsonString ? JSON.parse(jsonString) : undefined
    } catch (e) {
      return undefined
    }
  }

  return (
    <TextField {...props} sh={{ width: 20, ...tryParseJson(sh) }} type={type}>
      {type === "select" ? (
        <>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </>
      ) : null}
    </TextField>
  )
}
