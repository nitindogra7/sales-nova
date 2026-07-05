import { z } from "zod";

export const updateLeadSchema = z.object({
  status: z
    .enum([
      "new",
      "contacted",
      "qualified",
      "proposal",
      "won",
      "lost",
    ])
    .optional(),

  priority: z
    .enum([
      "high",
      "medium",
      "low",
    ])
    .optional(),
}).refine(
  (data) => data.status || data.priority,
  {
    message: "Nothing to update",
  }
);