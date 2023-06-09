import authOptions from '@/config/authOptions'
import prisma from '@/lib/prisma'
import { UserSchema } from '@/schemas/User'
import Boom from '@hapi/boom'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth/next'
import { ZodError } from 'zod'

const updateUser: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    const { statusCode, message } = Boom.unauthorized().output.payload
    res.status(statusCode).json(message)

    return
  }

  if (!session.user?.email) {
    const { statusCode, message } = Boom.badData().output.payload
    res.status(statusCode).json(message)

    return
  }

  try {
    const { image } = UserSchema.pick({ image: true }).parse(req.body)

    const result = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image,
      },
    })

    res.status(200).json({
      id: result.id,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.format()
      const { statusCode } = Boom.badData().output.payload
      res.status(statusCode).json(formatted)

      return
    }

    throw error
  }
}

const userHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    return updateUser(req, res)
  }

  const { statusCode, message } = Boom.methodNotAllowed().output.payload
  return res.status(statusCode).json(message)
}

export default userHandler
