import type { Meta, Story } from "@storybook/react";
import NProgressComponent from "./NProgress";
import Button from "../Button";
import nProgressState from "./nProgressState";

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {},
  component: NProgressComponent,
  title: "Components/NProgress",
} as Meta;

const Template: Story<{}> = (args) => {
  return (
    <>
      <NProgressComponent {...args} />

      <Button onClick={() => nProgressState.start()}>Start</Button>
      <Button sx={{ ml: 1 }} onClick={() => nProgressState.finish()}>
        Finish
      </Button>
    </>
  );
};

export const NProgress = Template.bind({});
NProgress.storyName = "NProgress";
NProgress.args = {};
