import {z} from 'zod'

const Operation = z.object({
  tags: z.string().min(1).array().optional(),
  summary: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  externalDocs: z.unknown(),
  operationId: z.string().min(1).optional(),
  parameters: z.unknown().array().optional(),
  requestBody: z.unknown().optional(),
  responses: z.unknown().optional(),
  callbacks: z.unknown().optional(),
  deprecated: z.boolean().default(false),
  security: z.unknown().array().optional(),
  servers: z.unknown().array().optional(),
})

const Info = z.object({
  version: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  termsOfService: z.string().min(1).optional(),
  contact: z
    .object({
      name: z.string().min(1),
      url: z.string().url(),
      email: z.string().email(),
    })
    .partial()
    .optional(),
  'x-logo': z
    .object({
      url: z.string().url(),
      backgroundColor: z.string().min(1),
      altText: z.string().min(1),
      href: z.string().url(),
    })
    .partial()
    .optional(),
})

const TagGroups = z
  .object({name: z.string().min(1), tags: z.string().min(1).array()})
  .array()
  .optional()

const Servers = z
  .object({
    url: z.string().url(),
    description: z.string().min(1).optional(),
    variables: z
      .record(
        z.string().min(1),
        z.object({
          enum: z.string().min(1).array().nonempty().optional(),
          default: z.string().min(1),
          description: z.string().min(1).optional(),
        }),
      )
      .optional(),
  })
  .array()
  .optional()

const Paths = z
  .record(
    z.string().min(1),
    z
      .object({
        $ref: z.string().min(1).optional(),
        summary: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        get: Operation,
        post: Operation,
        put: Operation,
        delete: Operation,
        patch: Operation,
        head: Operation,
        options: Operation,
        trace: Operation,

        servers: z.unknown(),
        parameters: z.unknown(),
      })
      .partial(),
  )
  .optional()

const Components = z
  .object({
    schemas: z.unknown(),
    responses: z.unknown(),
    parameters: z.unknown(),
    examples: z.unknown(),
    requestBodies: z.unknown(),
    headers: z.unknown(),
    securitySchemes: z.unknown(),
    links: z.unknown(),
    callbacks: z.unknown(),
    pathItems: z.unknown(),
  })
  .partial()
  .optional()

const Webhooks = z.record(z.string(), z.unknown()).optional()
export const OpenAPI31 = z
  .object({
    openapi: z.literal('3.1.0'),
    info: Info,
    'x-tagGroups': TagGroups,
    servers: Servers,
    paths: Paths,
    components: Components,
    webhooks: Webhooks,
  })
  .refine(
    ({paths, components, webhooks}) =>
      paths == null && components == null && webhooks == null,
    {
      message:
        'OpenAPI Object must contain one of the following fields: paths, components, webhooks',
    },
  )
export type OpenAPI31 = z.infer<typeof OpenAPI31>
