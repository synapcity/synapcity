import * as React from "react";
import { IconBaseProps } from "react-icons";
export type BaseProps = {
  className?: string;
  styles?: React.CSSProperties;
};

export type TechType = {
  icon: React.ComponentType<IconBaseProps>;
  name: string;
};
