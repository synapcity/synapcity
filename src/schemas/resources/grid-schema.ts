import { z} from "zod"

export const GridDataSchema = z.object({
  responsive: z.boolean().optional().default(true),
})