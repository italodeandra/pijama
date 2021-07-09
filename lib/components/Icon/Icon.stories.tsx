// noinspection JSUnusedGlobalSymbols

import { default as IconComponent, IconProps } from "./Icon";
import type { Meta, Story } from "@storybook/react";
import menuIcon from "@iconify/icons-heroicons-outline/menu";

const disableControl = {
  control: false,
};

const hideControl = {
  table: {
    disable: true,
  },
};

export default {
  argTypes: {
    classes: hideControl,
    ref: hideControl,
    sx: hideControl,
    viewBox: hideControl,
    icon: disableControl,
  },
  component: IconComponent,
  title: "Components/Icon",
} as Meta;

const Template: Story<IconProps> = (args) => <IconComponent {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  color: "inherit",
  icon: menuIcon,
  inline: false,
};
