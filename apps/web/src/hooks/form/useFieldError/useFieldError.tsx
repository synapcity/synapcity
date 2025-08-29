// "use client";

// import { useForm } from "react-hook-form";

// export function useFieldError(name: string) {
//   const {
//     formState: { errors },
//   } = useFormContext();

//   const error = errors?.[name];
//   const message =
//     typeof error === "object" && "message" in error
//       ? (error.message as string)
//       : undefined;

//   return { error, message };
// }
