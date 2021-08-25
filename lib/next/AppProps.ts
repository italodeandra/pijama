import type { AppProps as NextAppProps } from "next/app";
import { ReactNode } from "react";

export type GetLayout = (page: ReactNode) => ReactNode;

type AppProps = Omit<NextAppProps, "Component"> & {
  Component: NextAppProps["Component"] & {
    getLayout: GetLayout;
  };
};

export default AppProps;
