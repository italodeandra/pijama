import { Meta, Story } from "@storybook/react"
import { Button } from "../Button/Button"
import { notify } from "./snackbarState"
import { Snackbar as SnackbarComponent } from "./Snackbar"

// noinspection JSUnusedGlobalSymbols
export default {
  component: SnackbarComponent,
  title: "Components/Snackbar",
} as Meta

const Template: Story<{ message: string }> = (args) => (
  <>
    <SnackbarComponent />
    <Button onClick={() => notify(args.message)}>Show message</Button>
  </>
)

export const Snackbar = Template.bind({})
Snackbar.args = {
  message: "This is the message",
}
