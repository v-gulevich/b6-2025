import Image from 'next/image';

const todayJunior = {
  name: "Водолаз Володя",
  image: "/duck.webp",
};

export default function JuniorPage() {
  return (
    <div className="text-center pt-24 z-20 min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <h1 className="text-4xl md:text-6xs font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
        Junior Дня
      </h1>
      <p className="mt-4 text-2xl text-gray-600 max-w-2xl mx-auto">{todayJunior.name}</p>
      <div className="mt-8 relative flex justify-center items-center">
        {/* Image-based glow effect */}
        <div className="absolute scale-110">
          <Image
            src={todayJunior.image}
            alt=""
            className="w-64 h-64 rounded-full blur-2xl opacity-70"
            width={256}
            height={256}
          />
        </div>
        <div className="absolute scale-105">
          <Image
            src={todayJunior.image}
            alt=""
            className="w-64 h-64 rounded-full blur-xl opacity-80"
            width={256}
            height={256}
          />
        </div>
        <Image
          src={todayJunior.image}
          alt={todayJunior.name}
          className="relative w-64 h-64 mx-auto shadow-lg object-cover rounded-full hover:scale-105 transition-transform duration-500"
          width={256}
          height={256}
        />
      </div>
    </div>
  );
}
