/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useIdleVisibilityController } from "@/hooks/useIdleVisibilityController";
// import { cn } from "@/utils";
// import { motion } from "framer-motion";
// import { RefObject, type PropsWithChildren } from "react";

// interface IdleControlledProps extends PropsWithChildren {
//   id: string;
//   stateKey?: string;
//   delay?: number;
//   enabled?: boolean;
//   className?: string;
//   animation?: {
//     initial?: Record<string, any>;
//     animate?: Record<string, any>;
//     exit?: Record<string, any>;
//     transition?: Record<string, any>;
//   };
//   hoverOverlay?: boolean;
//   shouldEnable?: () => boolean;
//   elementEvents?: (keyof HTMLElementEventMap)[] | undefined
//   globalEvents?: (keyof WindowEventMap)[] | undefined
// }

// // export const IdleControlled = ({
// //   id,
// //   children,
// //   stateKey = "isCollapsed",
// //   delay = 10000,
// //   enabled = true,
// //   className,
// //   hoverOverlay = false,
// //   shouldEnable,
// //   animation = {
// //     initial: { opacity: 1, y: 0 },
// //     animate: { opacity: 1, y: 0 },
// //     exit: { opacity: 0, y: -10 },
// //     transition: { duration: 0.25 },
// //   },
// // }: IdleControlledProps) => {
// //   const ref = useRef<HTMLDivElement | null>(null)
// //   const isEnabled = enabled && (shouldEnable ? shouldEnable() : true);
// //   const { isActive } = useIdleVisibilityController(id, stateKey, { enabled: isEnabled, delay });

// //   return (
// //     <>
// //       {hoverOverlay && isActive && (
// //         <div
// //           className="fixed top-0 left-0 right-0 h-6 z-40"
// //         />
// //       )}
// //       <motion.div
// //         initial={animation.initial}
// //         animate={isActive ? animation.exit : animation.animate}
// //         transition={animation.transition}
// //         className={className}
// //       >
// //         {children}
// //       </motion.div>
// //     </>
// //   );
// // };
// export const IdleControlled = ({
//   id,
//   children,
//   stateKey = "isCollapsed",
//   delay = 10000,
//   enabled = true,
//   className,
//   hoverOverlay = false,
//   shouldEnable,
//   animation = {
//     initial: { opacity: 1, y: 0 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -10 },
//     transition: { duration: 0.25 },
//   },
//   globalEvents,
//   elementEvents
// }: IdleControlledProps) => {
//   const isEnabled = enabled && (shouldEnable ? shouldEnable() : true);

//   const { ref, isActive, onMouseEnter, onMouseLeave } = useIdleVisibilityController(id, stateKey, {
//     delay,
//     enabled,
//     globalEvents,
//     elementEvents 
//   });


//   return (
//     <>
//       {hoverOverlay && (
//         <div
//           className={cn(
//             "fixed top-0 left-0 right-0 h-6 z-40 transition-opacity duration-200",
//             isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//           )}
//           onMouseEnter={onMouseEnter}
//           onMouseLeave={onMouseLeave}
//         />
//       )}


//       <motion.div
//         ref={ref as RefObject<HTMLDivElement>}
//         initial={{ opacity: 1, y: 0, height: "auto" }}
//         animate={isActive
//           ? { opacity: 0, y: -20, height: 0 }
//           : { opacity: 1, y: 0, height: "auto" }}
//         transition={{ duration: 0.3 }}
//         className={cn("overflow-hidden", className)}
//       >
//         {children}
//       </motion.div>

//     </>
//   );
// };

"use client";

import { useIdleVisibilityController } from "@/hooks/useIdleVisibilityController";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { type PropsWithChildren, RefObject, useMemo } from "react";

interface IdleControlledProps extends PropsWithChildren {
  id: string;
  stateKey?: string;
  delay?: number;
  enabled?: boolean;
  className?: string;
  animation?: {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
  };
  hoverOverlay?: boolean;
  shouldEnable?: () => boolean;
  elementEvents?: (keyof HTMLElementEventMap)[];
  globalEvents?: (keyof WindowEventMap)[];
}

export const IdleControlled = ({
  id,
  children,
  stateKey = "isCollapsed",
  delay = 10000,
  enabled = true,
  className,
  hoverOverlay = false,
  shouldEnable,
  animation,
  globalEvents,
  elementEvents,
}: IdleControlledProps) => {
  const isEnabled = useMemo(
    () => enabled && (shouldEnable ? shouldEnable() : true),
    [enabled, shouldEnable]
  );

  const {
    ref,
    isActive,
    onMouseEnter,
    onMouseLeave,
  } = useIdleVisibilityController(id, stateKey, {
    enabled: isEnabled,
    delay,
    globalEvents,
    elementEvents,
  });

  const anim = animation ?? {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.25 },
  };

  return (
    <>
      {hoverOverlay && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 h-6 z-40 transition-opacity duration-200",
            isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}

      <motion.div
        ref={ref as RefObject<HTMLDivElement>}
        initial={anim.initial}
        animate={isActive ? anim.exit : anim.animate}
        transition={anim.transition}
        className={cn("overflow-hidden", className)}
      >
        {children}
      </motion.div>
    </>
  );
};
