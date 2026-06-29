import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const communitySchema = toTypedSchema(z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be less than 255 characters"),
    description: z.string()
        .min(5, "Description must be at least 5 characters"),
    avatar: z.any().optional(),
    cover: z.any().optional(),
}))