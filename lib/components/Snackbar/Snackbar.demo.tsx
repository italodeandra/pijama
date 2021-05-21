import { Button } from "../Button/Button"
import { notify } from "./snackbarState"
import { useDocumentation } from "../../hooks"

export const SnackbarDemo = () => {
  const { message } = useDocumentation(
    {
      /* eslint-disable sort-keys */
      notify: {
        description: "Method to show the message.",
        readOnly: true,
        value: 'notify("This is the message")',
      },
      message: {
        description: "The message that will be used on the example",
        value: "This is the message",
      },
    },
    ({ message }) => `<>
  <Snackbar /> {/* <- Remove this if you're already using the ThemeProvider */}
  <Button onClick={() => notify("${message}")}>
    Click here to show the message
  </Button>
</>`,
    "Snackbar method and message example"
  )

  return (
    <Button onClick={() => notify(message)}>
      Click here to show the message
    </Button>
  )
}
