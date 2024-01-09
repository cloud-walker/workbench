import {z} from 'zod'

export const OpenAPI31 = z.object({
  openapi: z.literal('3.1.0'),
  info: z.object({
    version: z.string().min(1),
    title: z.string().min(1),
    summary: z.unknown(),
    description: z.unknown(),
  }),
  paths: z.record(
    z.string().min(1),
    z
      .object({
        get: z.object({}),
        post: z.object({}),
        put: z.object({}),
        delete: z.object({}),
        patch: z.object({}),
        head: z.object({}),
        options: z.object({}),
        trace: z.object({}),
        servers: z.unknown(),
        parameters: z.unknown(),
      })
      .partial(),
  ),
})
export type OpenAPI31 = z.infer<typeof OpenAPI31>
