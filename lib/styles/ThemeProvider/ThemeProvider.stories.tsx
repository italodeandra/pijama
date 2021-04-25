import { Meta, Story } from "@storybook/react"
import { ThemeProvider } from "./ThemeProvider"
import { createTheme } from "../createTheme/createTheme"

export default {
  component: ThemeProvider,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        type: "code",
      },
    },
  },
  title: "Components/ThemeProvider",
} as Meta

const Template: Story = () => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      This text will have the font family from theme by default.
    </ThemeProvider>
  )
}

export const ThemeProviderStory = Template.bind({})
ThemeProviderStory.storyName = "ThemeProvider"
