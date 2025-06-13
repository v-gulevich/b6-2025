import { time } from "console";

export interface Member{
  name: string;
  room: string;
  imageURI: string;
}

export const TodayJunior = {
  name: "Артём Сазановец",
  image: "members/dancer.png",
};

export const DaylyPlan = {
  todayDate: '🌸 13.06.2025 🌸',
  dayNumber: 'день 9',
  timeTable: [
    { time: '7:30', event: 'доброе утречко' },
    { time: '8:00', event: 'вкусно завтракаем' },
    { time: '8:35', event: 'стоим в холле 1го, идем в УЛК' },
    { time: '9:00', event: 'жестко учимся' },
    { time: '12:45', event: 'ждем тимлида и возвращаемся домой' },
    { time: '13:30', event: 'что-то типо обеда' },
    { time: '14:00', event: 'План-час. Подготовка к конкурсу трейлер-шоу «Съёмки! Кадр! Факультет!»' },
    { time: '15:00', event: 'Стратагема «Это - Беларусь!»' },
    { time: '16:00', event: 'Образовательная программа (Сняткова)' },
    { time: '17:00', event: 'оформляем профильное+спортик' },
    { time: '18:30', event: 'Ужин' },
    { time: '19:00', event: 'Дискуссионная площадка «О доблести! О Подвиге! О Славе!' },
    { time: '20:00', event: 'Час проектной деятельности' },
    { time: '21:00', event: '2ой ужин' },
    { time: '21:00', event: 'Чаепитие' },
    { time: '21:30', event: 'вечерний разговор' },
    { time: '23:00', event: 'спокойной ночи' },
  ]
}

export const members: Member[] = [
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
    imageURI: "members/lexa2.png",
  },
  {
    name: "Сергей Полубок",
    room: "302А",
    imageURI: "members/serg.jpeg",
  },
    {
    name: "Владислав Гулевич",
    room: "301Б",
    imageURI: "members/vlad.jpg",
  },
  {
    name: "Антон Зеленуха",
    room: "302А",
    imageURI: "members/anton.jpeg",
  },
  {
    name: "Владимир Ардашев",
    room: "303А",
    imageURI: "members/vladimir.png",
  },
  {
    name: "Владимир Столяров",
    room: "303А",
    imageURI: "members/voloda.jpeg",
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

export interface Hero{
  name: string;
  desc: string;
  imageURI: string;
}
export const heroes: Hero[] = [
  {
    name: "Люся Герасименко",
    desc: "Она не пускала под откос вражеские эшелоны, не взрывала цистерны с горючим, не стреляла в гитлеровцев... Когда началась война, ей было всего 10 лет. Звали её Люся Герасименко.",
    imageURI: "heroes/1.png",
  },
  {
    name: "Тихон Баран",
    desc: "Тихон Баран — один из самых известных партизан Великой Отечественной войны. Он был командиром партизанского отряда, который действовал на территории Беларуси.",
    imageURI: "heroes/2.png",
  },
  {
    name: "Витька Хоменко",
    desc: "Витька Хоменко — герой Великой Отечественной войны, который в возрасте 12 лет стал одним из самых юных партизан. Он участвовал в боях против немецких оккупантов и проявил невероятную храбрость и отвагу.",
    imageURI: "heroes/3.png",
  },
  {
    name: "Ника Куковерова",
    desc: "Ника Куковерова — одна из самых известных женщин-партизан Великой Отечественной войны. Она была командиром партизанского отряда, который действовал на территории Беларуси.",
    imageURI: "heroes/4.png",
  },
  {
    name: "Лара Михеенко",
    desc: "За операцию по разведке и взрыву железнодорожного моста через реку Дрисса к правительственной награде была представлена ленинградская школьница Лариса Михеенко.",
    imageURI: "heroes/5.png",
  },
  {
    name: "Василий Коробко",
    desc: "Василий Коробко — один из самых известных партизан Великой Отечественной войны. Он был командиром партизанского отряда, который действовал на территории Беларуси.",
    imageURI: "heroes/6.png",
  },
  {
    name: "Володя Дубинин",
    desc: "Посмертно награжден Орденом Красного Знамени.",
    imageURI: "heroes/7.png"
  },
  {
    name: "Александр Колесников",
    desc: "Александр Колесников — один из самых известных партизан Великой Отечественной войны. Он был командиром партизанского отряда, который действовал на территории Беларуси.",
    imageURI: "heroes/8.png",
  }
];