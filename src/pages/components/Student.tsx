import type { NextPage } from 'next'

type Attendance = {
  id: number
  name: string
  attended: number
}

type Props = {
  attendances: Attendance[]
  style?: string
}

const Attendance: NextPage<Props> = ({ attendances, style }) => {
  return (
    <ul className="flex flex-wrap justify-center">
      {attendances.map((student) => (
        <li
          key={student.id}
          className={`w-32 text-center bg-ultraviolet text-white rounded-3xl m-2 py-2 ${style}`}
        >
          <p>{student.name}</p>
          <p>{student.attended}</p>
        </li>
      ))}
    </ul>
  )
}

export default Attendance