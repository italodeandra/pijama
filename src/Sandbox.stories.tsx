import type { Meta, Story } from "@storybook/react";
import { TypographyProps } from "@material-ui/core/Typography";
import { VFC } from "react";
import { Typography } from "@material-ui/core";

interface SandboxComponentProps {}

const SandboxComponent: VFC<SandboxComponentProps> = ({}) => (
  <>
    <Typography>Use this to test things.</Typography>
    <Typography>
      You can edit the file at{" "}
      <Typography variant={"code"}>./src/Sandbox.stories.tsx</Typography>.
    </Typography>
    <Typography>But please don&apos;t commit stuff here.</Typography>
  </>
);

// noinspection JSUnusedGlobalSymbols
export default {
  component: SandboxComponent,
  title: "Sandbox",
} as Meta;

const Template: Story<TypographyProps> = (args) => (
  <SandboxComponent {...args} />
);

export const Sandbox = Template.bind({});
Sandbox.args = {};
