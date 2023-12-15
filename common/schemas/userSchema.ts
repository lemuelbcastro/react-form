import { z } from 'zod'

const userSchema = z.object({
  name: z.string({ description: 'Your name' }),
  email: z.string().email(),
  age: z
    .number()
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage must be at most 100'),
  phone: z.string({ description: 'Your phone number' }),
})

export default userSchema
