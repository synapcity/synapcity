"use client";

import * as React from "react";
import { UILabel, Icon } from "@/components/atoms";

interface LabelProps extends React.ComponentProps<typeof UILabel> {
  className?: string;
  icon?: string;
  error?: boolean;
  helperText?: string;
}

const Label = ({ className, icon, error = false, helperText, ...props }: LabelProps) => {
  return (
    <div>
      <UILabel className={className} {...props}>
        {icon && <Icon name={icon} className="mr-2" />}
        {props.children}
      </UILabel>
      {helperText && !error && <p className="text-xs text-muted-foreground mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-500 mt-1">This field is required</p>}
    </div>
  );
};

export { Label };
