import authOptions from '@/config/authOptions'
import prisma from '@/lib/prisma'
import { CommentSchema } from '@/schemas/Comment'
import Boom from '@hapi/boom'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth/next'
import { ZodError } from 'zod'

const createComment: NextApiHandler = async (req, res) => {
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
    const { content, blogId } = CommentSchema.parse(req.body)
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    })

    if (!blog) {
      const { statusCode, message } = Boom.badData().output.payload
      res.status(statusCode).json(message)
      return
    }

    const result = await prisma.comment.create({
      data: {
        content,
        blog: {
          connect: {
            id: blogId,
          },
        },
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    })

    await prisma.commentNotification.create({
      data: {
        commentId: result.id,
        userId: blog.userId,
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

const getComments: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    const { statusCode, message } = Boom.unauthorized().output.payload
    res.status(statusCode).json(message)

    return
  }

  const page = Number(req.query.page) || 1
  const perPage = Number(req.query.perPage) || 10

  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      user: {
        email: {
          equals: session.user?.email,
        },
      },
    },
    include: {
      blog: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    take: perPage,
    skip: (page - 1) * perPage,
  })
  res.status(200).json(comments)
}

const CommentsHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await createComment(req, res)
  }
  if (req.method === 'GET') {
    await getComments(req, res)
  }
}

export default CommentsHandler
