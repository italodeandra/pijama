import ButtonComponent, { ButtonProps } from "./Button";
import type { Meta, Story } from "@storybook/react";
import IconComponent from "../Icon";
import menuIcon from "@iconify/icons-heroicons-outline/menu";

const hideControl = {
  table: {
    disable: true,
  },
};

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    TouchRippleProps: hideControl,
    action: hideControl,
    as: hideControl,
    classes: hideControl,
    endIcon: hideControl,
    focusVisibleClassName: hideControl,
    ref: hideControl,
    startIcon: hideControl,
    sx: hideControl,
    theme: hideControl,
    example: {
      options: ["Default", "With a start icon", "With an end icon"],
      control: { type: "radio" },
    },
  },
  component: ButtonComponent,
  title: "Components/Button",
} as Meta;

const Icon = () => <IconComponent icon={menuIcon} />;

const Template: Story<ButtonProps & { example: string }> = ({
  example,
  ...args
}) => {
  switch (example) {
    case "With a start icon":
      return <ButtonComponent startIcon={<Icon />} {...args} />;
    case "With an end icon":
      return <ButtonComponent endIcon={<Icon />} {...args} />;
    default:
      return <ButtonComponent {...args} />;
  }
};

export const Button = Template.bind({});
Button.args = {
  children: "Text",
  color: "primary",
  size: "medium",
  variant: "contained",
};
