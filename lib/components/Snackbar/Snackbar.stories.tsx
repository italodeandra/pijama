import type { Meta, Story } from "@storybook/react"
import Button from "../Button"
import { notify } from "./snackbarState"
import { default as SnackbarComponent } from "./Snackbar"

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
