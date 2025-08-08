import { IconRenderer } from "@/landing-page/components/ui";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react"

interface StepProps {
  step: {
    icon: LucideIcon
    title: string;
    description: string;
  }
  isAbove?: boolean;
  delay?: number;
}
export const HowItWorksStep = ({ step, isAbove, delay }: StepProps) => {

  return (
    <li className="relative mb-6 sm:mb-0 group min-w-[300px] h-[300px]">
      <div className="flex items-start">
        <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-900 text-accent-500 rounded-full ring-0 ring-gray-900 shrink-0">
          <IconRenderer icon={step.icon} className="size-full text-accent-500 group-hover:text-white group-hover:opacity-100 group-hover:scale-105" />
        </div>
        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: isAbove ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="mt-3 sm:pe-8"
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-500">{step.title}</h3>
        <p className="text-base font-normal text-gray-500 group-hover:text-gray-400">{step.description}</p>
      </motion.div>
    </li>
  )
}