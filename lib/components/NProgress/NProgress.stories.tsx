import { Meta, Story } from "@storybook/react"
import { Button } from "../Button/Button"
import { NProgress } from "./NProgress"
import { css } from "@emotion/react"
import { nprogress } from "./nprogressState"

export default {
  component: NProgress,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        type: "code",
      },
    },
  },
  title: "Components/NProgress",
} as Meta

const Template: Story = () => (
  <>
    <NProgress /> {/* <- Optional if you're already using the ThemeProvider */}
    <Button css={css({ marginRight: 8 })} onClick={() => nprogress.start()}>
      Start
    </Button>
    <Button onClick={() => nprogress.end()}>End</Button>
  </>
)

export const NProgressStory = Template.bind({})
NProgressStory.storyName = "NProgress"
