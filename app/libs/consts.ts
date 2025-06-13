export interface Member{
  name: string;
  room: string;
  imageURI: string;
}

export const TodayJunior = {
  name: "Володя",
  image: "/duck.webp",
};

export const DaylyPlan = {
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

export const members: Member[] = [
  {
    name: "Владислав Гулевич",
    room: "301Б",
    imageURI: "duck.webp",
  },
  {
    name: "Алексей Жуковский",
    room: "301Б",
    imageURI: "members/lexa-301B.png",
  },
  {
    name: "Артём Сазановец",
    room: "301А",
    imageURI: "members/dancer.png",
  },
  {
    name: "Ярослав Граховский",
    room: "301А",
    imageURI: "members/zharik.png",
  },
  {
    name: "Даниил Пранович",
    room: "302Б",
    imageURI: "members/daniil1.png",
  },
  {
    name: "Алексей Праухин",
    room: "302Б",
    imageURI: "duck.webp",
  },
  {
    name: "Сергей Полубок",
    room: "302А",
    imageURI: "members/serg.jpeg",
  },
  {
    name: "Антон Зеленуха",
    room: "302А",
    imageURI: "duck.webp",
  },
  {
    name: "Владимир Ардашев",
    room: "303А",
    imageURI: "members/vladimir.png",
  },
  {
    name: "Владимир Столяров",
    room: "303А",
    imageURI: "duck.webp",
  },
];

export const GalleryImages = [
  { src: "/duck.webp", description: "Уточка на пруду" },
  { src: "/duck.webp", description: "Вторая уточка" },
  { src: "/duck.webp", description: "Третья уточка" },
  { src: "/duck.webp", description: "Четвертая уточка" },
  { src: "/duck.webp", description: "Пятая уточка" },
  { src: "/duck.webp", description: "Шестая уточка" },
  { src: "/duck.webp", description: "Седьмая уточка" },
  { src: "/duck.webp", description: "Восьмая уточка" },
];

