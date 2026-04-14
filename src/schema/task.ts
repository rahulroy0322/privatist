import { z } from 'zod'

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  priority: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  dueDate: z.number().optional(),
  projectId: z.string().optional(),
  // labelIds: z.array(z.string()).default([]),
  parentId: z.string().optional(),
})

// const taskSchema = z.object({
//     id: z.number().optional(),
//     title: z.string().min(1).max(200),
//     description: z.string().max(1000).optional(),
//     priority: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
//     dueDate: z.union([z.number(), z.null()]).optional(),
//     completed: z.boolean(),
//     projectId: z.union([z.string(), z.null()]).optional(),
//     labelIds: z.array(z.string()),
//     parentId: z.union([z.string(), z.null()]).optional(),
//     order: z.number(),
//     createdAt: z.number(),
//     updatedAt: z.number(),
//     completedAt: z.union([z.number(), z.null()]).optional(),
//     syncedAt: z.union([z.number(), z.null()]).optional(),
// })

type CreateTaskInputType = z.infer<typeof createTaskSchema>

// type TaskSchema = z.infer<typeof taskSchema>

export type { CreateTaskInputType }

export { createTaskSchema }
