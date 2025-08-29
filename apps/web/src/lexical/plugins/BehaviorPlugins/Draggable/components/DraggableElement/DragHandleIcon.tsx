import React from "react";

const DragHandleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2z" />
  </svg>
);

export default DragHandleIcon;
