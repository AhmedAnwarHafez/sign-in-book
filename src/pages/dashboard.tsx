import type { NextPage } from 'next'
import { useState } from 'react'

import { trpc } from '../utils/trpc'
import Cohorts from './components/Cohorts'
import Attendance from './components/Student'

const date = new Date(Date.now() - 5 * 60 * 60 * 1000)

const Dashboard: NextPage = () => {
  const [cohort, setCohort] = useState(0)

  const cohortsQuery = trpc.useQuery(['students.getCohorts'])
  const attendanceQuery = trpc.useQuery([
    'attendance.getAttendance',
    { cohortId: cohort, date },
  ])

  const handleCohort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCohort(+e.target.value)
  }

  const attendedStudents = attendanceQuery.data?.filter(
    (student) => Number(student.attended) === 1
  )
  const notAttendedStudents = attendanceQuery.data?.filter(
    (student) => Number(student.attended) === 0
  )

  return (
    <div className='h-screen bg-softblue'>
      <main className="flex flex-col gap-4 items-center justify-center text-xl">
        <section className="mt-6">
          {cohortsQuery.data && (
            <Cohorts cohorts={cohortsQuery.data} handleCohort={handleCohort} />
          )}
        </section>
        <p>({notAttendedStudents?.length}) Not Attended</p>
        {notAttendedStudents && (
          <Attendance attendances={notAttendedStudents} style="text-yellow" />
        )}
        <p>({attendedStudents?.length}) Attended</p>
        {attendedStudents && (
          <Attendance attendances={attendedStudents} style="text-slate-300" />
        )}
      </main>
    </div>
  )
}

export default Dashboard