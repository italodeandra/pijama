import { TextField } from "./TextField"
import { useDocumentation } from "../../hooks"

export const TextFieldDemo = () => {
  const {
    inputComponent,
    onChangeValue,
    select,
    sh,
    ...props
  } = useDocumentation(
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
      select: {
        description: "Transform the input into a select.",
        options: [true, false],
        value: false,
      },
      sh: {
        description: "Styles shorthand.",
        value: undefined,
      },
      type: {
        description: "Type of the input.",
        options: ["text", "tel", "email", "password"],
        value: "text",
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

  return (
    <TextField {...props} select={select} sh={tryParseJson(sh)}>
      {select ? (
        <>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </>
      ) : null}
    </TextField>
  )
}
