interface Member{
  name: string;
  room: string;
  imageURI: string;
}

const members: Member[] = [
  {
    name: "Владислав Гулевич",
    room: "301Б",
    imageURI: "duck.webp",
  },
  {
    name: "Алексей Жуковский",
    room: "301Б",
    imageURI: "duck.webp",
  },
  {
    name: "Артём Сазановец",
    room: "301А",
    imageURI: "duck.webp",
  },
  {
    name: "Ярослав Граховский",
    room: "301А",
    imageURI: "duck.webp",
  },
  {
    name: "Даниил Пранович",
    room: "302Б",
    imageURI: "duck.webp",
  },
  {
    name: "Алексей Праухин",
    room: "302Б",
    imageURI: "duck.webp",
  },
  {
    name: "Сергей Полубок",
    room: "302А",
    imageURI: "duck.webp",
  },
  {
    name: "Антон Зеленуха",
    room: "302А",
    imageURI: "duck.webp",
  },
  {
    name: "Владимир Ардашев",
    room: "303А",
    imageURI: "duck.webp",
  },
  {
    name: "Владимир Столяров",
    room: "303А",
    imageURI: "duck.webp",
  },
];

export default function MembersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <h1 className="text-4xl font-bold mb-4">Members Page</h1>
      <p className="text-lg text-gray-700 mb-8">This is a dedicated page for Members.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {members.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow-md p-6">
            <img
              src={member.imageURI}
              alt={member.name}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-purple-200"
            />
            <div className="text-xl font-semibold mb-1">{member.name}</div>
            <div className="text-gray-500">Room: {member.room}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
