'use client';

import React, { useState } from 'react';

// Типы данных
type Mood = '😊' | '😐' | '😢' | '🤩';
type Activity = '💼' | '🖌' | '🎓' | '🏋️';

type DailyRecord = {
  date: string;
  mood: Mood;
  activity: Activity;
};

type Member = {
  name: string;
  room: string;
  imageURI: string;
  records: DailyRecord[];
};

// Генерация фиксированных дат за последние 6 дней
const getFixedDates = () => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }));
  }
  
  return dates;
};

const dates = getFixedDates();

const members: Member[] = [
  {
    name: "Алексей Жуковский",
    room: "301Б",
    imageURI: "members/lexa-301B.png",
    records: [
      { date: dates[0], mood: '😊', activity: '💼' },
      { date: dates[1], mood: '🤩', activity: '🎓' },
      { date: dates[2], mood: '😐', activity: '🏋️' },
      { date: dates[3], mood: '😊', activity: '🖌' },
      { date: dates[4], mood: '😢', activity: '💼' },
      { date: dates[5], mood: '😐', activity: '🎓' }
    ]
  },
  {
    name: "Артём Сазановец",
    room: "301А",
    imageURI: "members/dancer.png",
    records: [
      { date: dates[0], mood: '🤩', activity: '🏋️' },
      { date: dates[1], mood: '😊', activity: '💼' },
      { date: dates[2], mood: '😊', activity: '🖌' },
      { date: dates[3], mood: '😐', activity: '🎓' },
      { date: dates[4], mood: '😢', activity: '💼' },
      { date: dates[5], mood: '😊', activity: '🏋️' }
    ]
  },
  {
    name: "Ярослав Граховский",
    room: "301А",
    imageURI: "members/zharik.png",
    records: [
      { date: dates[0], mood: '😐', activity: '💼' },
      { date: dates[1], mood: '😊', activity: '🖌' },
      { date: dates[2], mood: '🤩', activity: '🎓' },
      { date: dates[3], mood: '😊', activity: '🏋️' },
      { date: dates[4], mood: '😐', activity: '💼' },
      { date: dates[5], mood: '😢', activity: '🖌' }
    ]
  },
  {
    name: "Даниил Пранович",
    room: "302Б",
    imageURI: "members/daniil1.png",
    records: [
      { date: dates[0], mood: '😊', activity: '🎓' },
      { date: dates[1], mood: '😐', activity: '🏋️' },
      { date: dates[2], mood: '😊', activity: '💼' },
      { date: dates[3], mood: '🤩', activity: '🖌' },
      { date: dates[4], mood: '😐', activity: '🎓' },
      { date: dates[5], mood: '😊', activity: '💼' }
    ]
  },
  {
    name: "Алексей Праухин",
    room: "302Б",
    imageURI: "members/lexa2.png",
    records: [
      { date: dates[0], mood: '🤩', activity: '🖌' },
      { date: dates[1], mood: '😊', activity: '🎓' },
      { date: dates[2], mood: '😢', activity: '💼' },
      { date: dates[3], mood: '😐', activity: '🏋️' },
      { date: dates[4], mood: '😊', activity: '🖌' },
      { date: dates[5], mood: '🤩', activity: '🎓' }
    ]
  },
  {
    name: "Сергей Полубок",
    room: "302А",
    imageURI: "members/serg.jpeg",
    records: [
      { date: dates[0], mood: '😐', activity: '🏋️' },
      { date: dates[1], mood: '😢', activity: '💼' },
      { date: dates[2], mood: '😊', activity: '🖌' },
      { date: dates[3], mood: '🤩', activity: '🎓' },
      { date: dates[4], mood: '😐', activity: '🏋️' },
      { date: dates[5], mood: '😊', activity: '💼' }
    ]
  },
  {
    name: "Владислав Гулевич",
    room: "301Б",
    imageURI: "members/vlad.jpg",
    records: [
      { date: dates[0], mood: '😊', activity: '💼' },
      { date: dates[1], mood: '🤩', activity: '🏋️' },
      { date: dates[2], mood: '😐', activity: '🎓' },
      { date: dates[3], mood: '😊', activity: '🖌' },
      { date: dates[4], mood: '😢', activity: '💼' },
      { date: dates[5], mood: '😐', activity: '🏋️' }
    ]
  },
  {
    name: "Антон Зеленуха",
    room: "302А",
    imageURI: "members/anton.jpeg",
    records: [
      { date: dates[0], mood: '🤩', activity: '🎓' },
      { date: dates[1], mood: '😊', activity: '🖌' },
      { date: dates[2], mood: '😐', activity: '💼' },
      { date: dates[3], mood: '😢', activity: '🏋️' },
      { date: dates[4], mood: '😊', activity: '🎓' },
      { date: dates[5], mood: '🤩', activity: '🖌' }
    ]
  },
  {
    name: "Владимир Ардашев",
    room: "303А",
    imageURI: "members/vladimir.png",
    records: [
      { date: dates[0], mood: '😐', activity: '🖌' },
      { date: dates[1], mood: '😊', activity: '💼' },
      { date: dates[2], mood: '🤩', activity: '🏋️' },
      { date: dates[3], mood: '😐', activity: '🎓' },
      { date: dates[4], mood: '😢', activity: '🖌' },
      { date: dates[5], mood: '😊', activity: '💼' }
    ]
  },
  {
    name: "Владимир Столяров",
    room: "303А",
    imageURI: "members/voloda.jpeg",
    records: [
      { date: dates[0], mood: '😢', activity: '🏋️' },
      { date: dates[1], mood: '😊', activity: '🎓' },
      { date: dates[2], mood: '😐', activity: '🖌' },
      { date: dates[3], mood: '🤩', activity: '💼' },
      { date: dates[4], mood: '😊', activity: '🏋️' },
      { date: dates[5], mood: '😐', activity: '🎓' }
    ]
  }
];

export default function SirMesPage() {
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(selectedPerson === id ? null : id);
  };

  const getMoodColor = (mood: Mood) => {
    switch (mood) {
      case '😊': return 'bg-green-100';
      case '🤩': return 'bg-blue-100';
      case '😐': return 'bg-yellow-100';
      case '😢': return 'bg-purple-100';
      default: return 'bg-white';
    }
  };

  const getActivityColor = (activity: Activity) => {
    switch (activity) {
      case '💼': return 'bg-indigo-100';
      case '🖌': return 'bg-pink-100';
      case '🎓': return 'bg-cyan-100';
      case '🏋️': return 'bg-orange-100';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Отслеживание активности команды</h1>
          <p className="text-gray-600 mt-2">Настроение и деятельность за последние 6 дней</p>
        </header>

        {/* Мобильное представление */}
        <div className="block md:hidden">
          {members.map((person, index) => (
            <div 
              key={index}
              className={`mb-4 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                selectedPerson === index ? 'bg-white ring-2 ring-blue-500' : 'bg-white'
              }`}
              onClick={() => handlePersonSelect(index)}
            >
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{person.name}</h3>
                  <p className="text-sm text-gray-600">Комната: {person.room}</p>
                </div>
                <div className={`text-xl ${selectedPerson === index ? 'transform rotate-180' : ''}`}>
                  {selectedPerson === index ? '▲' : '▼'}
                </div>
              </div>
              
              {selectedPerson === index && (
                <div className="border-t border-gray-100 p-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center text-sm font-semibold text-gray-500">Дата</div>
                    <div className="text-center text-sm font-semibold text-gray-500">Активность/Настроение</div>
                  </div>
                  
                  {person.records.map((record, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100 last:border-b-0">
                      <div className="font-medium text-gray-700 flex items-center justify-center">
                        {record.date}
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className={`${getActivityColor(record.activity)} p-2 rounded-lg`}>
                          {record.activity}
                        </span>
                        <span className={`${getMoodColor(record.mood)} p-2 rounded-lg`}>
                          {record.mood}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Десктопное представление */}
        <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10">
                  Участник
                </th>
                {dates.map((date, idx) => (
                  <th key={idx} scope="col" className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                    {date}
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <span className="text-xs font-medium text-gray-500">Активность</span>
                      <span className="text-xs font-medium text-gray-500">Настроение</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((person, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm sticky left-0 bg-white z-10">
                    <div className="font-medium text-gray-900">{person.name}</div>
                    <div className="text-gray-500 text-xs">Комната: {person.room}</div>
                  </td>
                  {person.records.map((record, idx) => (
                    <td key={idx} className="py-3 px-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`${getActivityColor(record.activity)} p-2 rounded-lg text-center`}>
                          <span className="text-xl">{record.activity}</span>
                        </div>
                        <div className={`${getMoodColor(record.mood)} p-2 rounded-lg text-center`}>
                          <span className="text-xl">{record.mood}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Легенда */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Легенда</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Настроение:</h3>
              <ul className="space-y-1">
                <li className="flex items-center"><span className="bg-green-100 p-1 rounded mr-2">😊</span> Приподнятое</li>
                <li className="flex items-center"><span className="bg-blue-100 p-1 rounded mr-2">🤩</span> Отличное</li>
                <li className="flex items-center"><span className="bg-yellow-100 p-1 rounded mr-2">😐</span> Хорошее</li>
                <li className="flex items-center"><span className="bg-purple-100 p-1 rounded mr-2">😢</span> Плохое</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Деятельность:</h3>
              <ul className="space-y-1">
                <li className="flex items-center"><span className="bg-indigo-100 p-1 rounded mr-2">💼</span> Трудовая</li>
                <li className="flex items-center"><span className="bg-orange-100 p-1 rounded mr-2">🏋️</span> Спортивная</li>
                <li className="flex items-center"><span className="bg-pink-100 p-1 rounded mr-2">🖌</span> Творческая</li>
                <li className="flex items-center"><span className="bg-cyan-100 p-1 rounded mr-2">🎓</span> Научная</li>
              </ul>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          Данные обновляются ежедневно в 21:30
        </footer>
      </div>
    </div>
  );
}
