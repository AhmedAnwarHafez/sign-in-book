import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const studentsRouter = createRouter()
  .mutation('new', {
    input: z.object({
      name: z.string(),
      cohort: z.number(),
      year: z.number(),
      token: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.students.create({
        data: input,
      })
    },
  })
  .mutation('attend', {
    input: z.object({
      visitor_id: z.number().nullish(),
      name: z.string(),
      cohort: z.number().nullish(),
      token: z.string(),
    }),
    async resolve({ input }) {
      if (!input.visitor_id) {
        const student = await prisma.students.findFirstOrThrow({
          where: {
            AND: [
              { name: { contains: input.name || undefined } },
              { cohort_id: input.cohort || undefined },
            ],
          },
        })

        await prisma.attendances.create({
          data: {
            student_id: student.id,
          },
        })

        return student
      } else {
        return await prisma.attendances.create({
          data: {
            student_id: input.visitor_id,
          },
        })
      }
    },
  })
  .query('getCohorts', {
    async resolve({ ctx }) {
      return await prisma.cohorts.findMany()
    },
  })
