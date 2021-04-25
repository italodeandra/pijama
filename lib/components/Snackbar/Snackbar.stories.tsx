import { Meta, Story } from "@storybook/react"
import { Button } from "../Button/Button"
import { Snackbar as SnackbarComponent } from "./Snackbar"
import { notify } from "./snackbarState"

export default {
  component: SnackbarComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        type: "code",
      },
    },
  },
  title: "Components/Snackbar",
} as Meta

const Snackbar = () => null // fake for demonstration

const Template: Story = () => (
  <>
    <Snackbar /> {/* <- Optional if you're already using the ThemeProvider */}
    <Button onClick={() => notify("This is the message")}>
      Click here to show the message
    </Button>
  </>
)

export const SnackbarStory = Template.bind({})
SnackbarStory.storyName = "Snackbar"
