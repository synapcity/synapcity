"use client";

import { MotionButton } from "../ui";

export const SignUpButton = ({ label = "Sign Up" }: { label?: string }) => {
  return (
    <MotionButton
      className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-lg border border-foreground/10 bg-background hover:bg-foreground/5 hover:text-white hover:border hover:border-white transition-all duration-200 text-foreground font-medium"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </MotionButton>
  );
};
