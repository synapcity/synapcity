import { format } from "date-fns"

export const getTodaysDate = () => {
  return format(new Date(), "EEEE, MMMM do")
}