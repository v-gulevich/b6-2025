import { heroes } from "@/app/libs/consts";

export default function HeroesPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-8 px-2">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent text-center">
        Подвиг героев
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Здесь представлены герои, чьи подвиги вдохновляют нас своим мужеством и самоотверженностью.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {heroes.map((hero, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/90 rounded-2xl shadow-lg p-6 border border-purple-100 hover:scale-105 transition-transform duration-200"
          >
            <img
              src={hero.imageURI}
              alt={hero.name}
              className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-purple-200 shadow"
            />
            <div className="text-xl font-semibold mb-2 text-purple-700 text-center">
              {hero.name}
            </div>
            <div className="text-gray-600 text-center text-base whitespace-pre-line">
              {hero.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
