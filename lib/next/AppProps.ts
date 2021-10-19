import type { AppProps as NextAppProps } from "next/app";
import { ReactNode } from "react";

export type GetLayout = (page: ReactNode) => ReactNode;

type AppProps<PageProps = Record<string, unknown>> = Omit<
  NextAppProps<PageProps>,
  "Component"
> & {
  Component: NextAppProps<PageProps>["Component"] & {
    getLayout: GetLayout;
  };
};

export default AppProps;
