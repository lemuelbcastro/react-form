import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { userSchema } from 'common/schemas'

const router = Router()
const prisma = new PrismaClient()

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

router.get('/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  })

  if (!user) {
    res.status(400).json({ message: 'User does not exist' })
  }

  res.json(user)
})

router.post('/users', async (req, res) => {
  const body = userSchema.omit({ id: true }).safeParse(req.body)

  if (!body.success) {
    res.status(422).json(body.error.issues)

    return
  }

  try {
    const user = await prisma.user.create({ data: body.data })

    res.json(user)
  } catch (error) {
    res.status(400).json({ message: 'Could not create the user' })
  }
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const body = userSchema.omit({ id: true }).safeParse({ id, ...req.body })

  if (!body.success) {
    res.status(422).json(body.error.issues)

    return
  }

  try {
    const post = await prisma.user.update({
      where: { id: Number(id) },
      data: body.data,
    })

    res.json(post)
  } catch (error) {
    res.status(400).json({ message: 'Could not update the user' })
  }
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })

    res.json(post)
  } catch (error) {
    res.status(400).json({ message: 'Could not delete the user' })
  }
})

export default router
