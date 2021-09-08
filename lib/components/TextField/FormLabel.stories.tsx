// noinspection JSUnusedGlobalSymbols

import type { Meta, Story } from "@storybook/react";
import { FormLabel as FormLabelComponent, FormLabelProps } from "./TextField";

const disableControl = {
  table: {
    disable: true,
  },
};

export default {
  argTypes: {
    as: disableControl,
    ref: disableControl,
    theme: disableControl,
  },
  component: FormLabelComponent,
  title: "Components/FormLabel",
} as Meta;

const Template: Story<FormLabelProps> = (args) => (
  <FormLabelComponent {...args}>
    Only the label for custom inputs
  </FormLabelComponent>
);
export const FormLabel = Template.bind({});
FormLabel.storyName = "FormLabel";
