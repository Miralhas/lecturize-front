import { isAfter } from "date-fns";
import { z } from "zod";

const TypeEnum = z.enum(['PRESENTIAL', 'HYBRID', 'ONLINE']);

export const lectureSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  lecturer: z.string().min(1, { message: "Lecturer name is required" }),

  description: z.string().min(1, { message: "Description is required" }),

  startsAt: z.string().refine(date => isAfter(new Date(date), new Date()), {
    message: "Start date and time must be in the future"
  }),

  endsAt: z.string().refine(date => isAfter(new Date(date), new Date()), {
    message: "End date and time must be in the future"
  }),

  type: TypeEnum,

  url: z.string().optional(),

  address: z.string().optional(),

  maximumCapacity: z.number().optional(),

  tags: z.array(z.object({
    id: z.number().int().positive({
      message: "must be a positive integer",
    }),
  })).optional(),
}).refine(data => new Date(data.endsAt) > new Date(data.startsAt), {
  message: "End date and time must be after the start date and time",
  path: ["endsAt"],
}).refine(() => false, { // aparece message só quando retorna false
  message: "maximum capacity is required",
  path: ["maximumCapacity"],
})

export type LectureFormValues = z.infer<typeof lectureSchema>;