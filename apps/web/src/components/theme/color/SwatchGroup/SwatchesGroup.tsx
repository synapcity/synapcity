"use client";

import React from "react";
import { ColorSwatch } from "../ColorSwatch";

type SwatchesGroupProps = {
  group: string[];
  active: string;
  onClick?: (e: React.MouseEvent, color: string) => void;
};

const SwatchesGroup: React.FC<SwatchesGroupProps> = ({ group, active, onClick }) => {
  return (
    <div className="pb-2 w-10 float-left mr-2.5">
      {group.map((color, i) => (
        <ColorSwatch
          key={color + i}
          color={color}
          active={color.toLowerCase() === active.toLowerCase()}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default SwatchesGroup;
