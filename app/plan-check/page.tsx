import { DaylyPlan } from '@/app/libs/consts'
export default function PlanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-8 px-2">
      <h1 className="text-4xl font-bold mb-2">{DaylyPlan.todayDate}</h1>
      <h1 className="text-xl font-bold mb-2">{DaylyPlan.dayNumber}</h1>
      <p className="text-lg text-gray-700 mb-8">План дня</p>
      <div className="w-full max-w-xl bg-white/70 rounded-xl shadow-lg p-4">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="py-2 px-3 text-lg font-semibold text-purple-700">Время</th>
              <th className="py-2 px-3 text-lg font-semibold text-blue-700">Событие</th>
            </tr>
          </thead>
          <tbody>
            {DaylyPlan.timeTable.map(({ time, event }) => (
              <tr key={time + event}>
                <td className="py-1 px-3 font-mono">{time}</td>
                <td className="py-1 px-3">{event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}