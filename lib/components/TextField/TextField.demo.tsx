import { TextField } from "./TextField"
import { useDocumentation } from "../../hooks"

export const TextFieldDemo = () => {
  const { onChangeValue, sh, ...props } = useDocumentation(
    {
      as: {
        description: "Change which HTML element or React component should be.",
        value: undefined,
      },
      color: {
        description: "The color of the highlight when focused.",
        value: "primary", // todo: use select options
      },
      defaultValue: {
        description: "The default value of the input.",
        value: undefined,
      },
      error: {
        description: "If should show error color.",
        value: false, // todo: use select options
      },
      helperText: {
        description: "Text to be shown above the input.",
        value: "Helper text",
      },
      id: {
        description: `ID of the input that will be used for linking with the label.
If empty it will be used the name or label text.`,
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
        value: "(value: V, event: ChangeEvent<E>) => void",
      },
      placeholder: {
        description: "Placeholder of the input.",
        value: "Placeholder",
      },
      sh: {
        description: "Styles shorthand.",
        value: undefined,
      },
      type: {
        description: "Type of the input.",
        value: "text", // todo: use select options
      },
      value: {
        description: "The value of the input.",
        value: undefined,
      },
    },
    () => `<TextField />` // todo: add properties
  )

  const tryParseJson = (jsonString?: string) => {
    try {
      return jsonString ? JSON.parse(jsonString) : undefined
    } catch (e) {
      return undefined
    }
  }

  return <TextField {...props} sh={tryParseJson(sh)} />
}
