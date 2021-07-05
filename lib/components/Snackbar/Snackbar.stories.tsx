import type { Meta, Story } from "@storybook/react";
import Button from "../Button";
import { notify, MessageVariant } from "./snackbarState";
import { default as SnackbarComponent } from "./Snackbar";

// noinspection JSUnusedGlobalSymbols
export default {
  component: SnackbarComponent,
  title: "Components/Snackbar",
  argTypes: {
    variant: {
      options: ["default", "error"],
      control: { type: "radio" },
    },
  },
} as Meta;

const Template: Story<{
  message: string;
  variant?: MessageVariant;
  suppress?: boolean;
}> = ({ message, variant, suppress }) => (
  <>
    <SnackbarComponent />
    <Button onClick={() => notify(message, { variant, suppress })}>
      Show message
    </Button>
  </>
);

export const Snackbar = Template.bind({});
Snackbar.args = {
  message: "This is the message",
  suppress: false,
};
