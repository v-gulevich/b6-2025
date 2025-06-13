export default function SongsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-8 px-2">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 bg-clip-text text-transparent text-center">
        Речёвка и песня
      </h1>
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">Вечерняя речёвка</h2>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed text-center">
- Мы в чём-то похожи
- И каждый из нас
- Особенный все же,
- Но здесь и сейчас
- Сердца наши в ритме едином стучат…
- Спокойной ночи, девочки
- Спокойной ночи, мальчики 
- Спокойной ночи, наши тимлидеры
- Спокойной ночи, Технопарк!
        </div>
      </div>
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">Вечерняя песня</h2>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed text-center">
Куплет:
Пусть мне приснится мой профиль
Я дню спасибо шепчу
Оттенки сонного неба мне вторят
О том, что ввысь отпущу

Припев:
Технопарку желаем скорей доброй ночи
Сны расскажут какие ты песни поешь
И пусть сбудется всё, что ты только захочешь
Ты к мечте своей смело и верно идёшь

Куплет:
В кругу взглянув на друзей
Оставив ворох забот навсегда
Мы станем завтра дружнее
Поймём без слов - мы семья

Припев:
Технопарку желаем скорей доброй ночи
Сны расскажут какие ты песни поешь
И пусть сбудется всё, что ты только захочешь
Ты к мечте своей смело и верно идёшь
        </div>
      </div>
    </div>
  );
}