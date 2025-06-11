export default function PlanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-8 px-2">
      <h1 className="text-4xl font-bold mb-2">🌸 11.06.25 — день 7 🌸</h1>
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
            <tr><td className="py-1 px-3 font-mono">7:30</td><td className="py-1 px-3">доброе утречко</td></tr>
            <tr><td className="py-1 px-3 font-mono">8:00</td><td className="py-1 px-3">вкусно завтракаем</td></tr>
            <tr><td className="py-1 px-3 font-mono">8:35</td><td className="py-1 px-3">стоим в холле 1го, идем в УЛК</td></tr>
            <tr><td className="py-1 px-3 font-mono">9:00</td><td className="py-1 px-3">жестко учимся</td></tr>
            <tr><td className="py-1 px-3 font-mono">12:45</td><td className="py-1 px-3">ждем тимлида и возвращаемся домой</td></tr>
            <tr><td className="py-1 px-3 font-mono">13:30</td><td className="py-1 px-3">что-то типо обеда</td></tr>
            <tr><td className="py-1 px-3 font-mono">14:00</td><td className="py-1 px-3">План-часик 😎</td></tr>
            <tr><td className="py-1 px-3 font-mono">15:00</td><td className="py-1 px-3">Стратагема «Ура, каникулы!»</td></tr>
            <tr><td className="py-1 px-3 font-mono">16:00</td><td className="py-1 px-3">Образовательная программа в актовом</td></tr>
            <tr><td className="py-1 px-3 font-mono">17:00</td><td className="py-1 px-3">оформляем профильное+спортик</td></tr>
            <tr><td className="py-1 px-3 font-mono">18:30</td><td className="py-1 px-3">Ужин</td></tr>
            <tr><td className="py-1 px-3 font-mono">19:00</td><td className="py-1 px-3">лекторий в актовом</td></tr>
            <tr><td className="py-1 px-3 font-mono">21:00</td><td className="py-1 px-3">2ой ужин</td></tr>
            <tr><td className="py-1 px-3 font-mono">21:30</td><td className="py-1 px-3">вечерний разговор</td></tr>
            <tr><td className="py-1 px-3 font-mono">22:00</td><td className="py-1 px-3">подготовка ко сну</td></tr>
            <tr><td className="py-1 px-3 font-mono">23:00</td><td className="py-1 px-3">спокойной ночи</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}