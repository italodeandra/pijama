import { Button } from "../Button/Button"
import { nprogress } from "./nprogressState"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const NProgressDemo = () => {
  useDocumentation(
    {
      /* eslint-disable sort-keys */
      start: {
        description: "Method to start the progress.",
        readOnly: true,
        value: "nprogress.start()",
      },
      end: {
        description: "Method to end the progress.",
        readOnly: true,
        value: "nprogress.end()",
      },
    },
    () => `<>
  <NProgress /> {/* <- Remove this if you're already using the ThemeProvider */}
  <Button onClick={() => nprogress.start()}>Start</Button>
  <Button onClick={() => nprogress.end()}>End</Button>
</>`,
    "NProgress methods"
  )

  return (
    <>
      <Button onClick={() => nprogress.start()} sh={{ mr: 1 }}>
        Start
      </Button>
      <Button onClick={() => nprogress.end()}>End</Button>
    </>
  )
}
