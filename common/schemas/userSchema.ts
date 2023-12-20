import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  age: z.coerce
    .number({ invalid_type_error: 'Age is required' })
    .positive({ message: 'Age must be a positive number' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
})

export default userSchema
