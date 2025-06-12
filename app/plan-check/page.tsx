// План дня как массив объектов
const plan = {
  todayDate: '🌸 11.06.2025 🌸',
  dayNumber: 'день 7',
  timeTable: [
    { time: '7:30', event: 'доброе утречко' },
    { time: '8:00', event: 'вкусно завтракаем' },
    { time: '8:35', event: 'стоим в холле 1го, идем в УЛК' },
    { time: '9:00', event: 'жестко учимся' },
    { time: '12:45', event: 'ждем тимлида и возвращаемся домой' },
    { time: '13:30', event: 'что-то типо обеда' },
    { time: '14:00', event: 'План-часик 😎' },
    { time: '15:00', event: 'Стратагема «Ура, каникулы!»' },
    { time: '16:00', event: 'Образовательная программа в актовом' },
    { time: '17:00', event: 'оформляем профильное+спортик' },
    { time: '18:30', event: 'Ужин' },
    { time: '19:00', event: 'лекторий в актовом' },
    { time: '21:00', event: '2ой ужин' },
    { time: '21:30', event: 'вечерний разговор' },
    { time: '22:00', event: 'подготовка ко сну' },
    { time: '23:00', event: 'спокойной ночи' },
  ]
}



export default function PlanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-8 px-2">
      <h1 className="text-4xl font-bold mb-2">{plan.todayDate}</h1>
      <h1 className="text-xl font-bold mb-2">{plan.dayNumber}</h1>
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
            {plan.timeTable.map(({ time, event }) => (
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