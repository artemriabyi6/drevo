export interface Product {
  title: string;
  price: string;
  id: number;
  desc: string;
  image: string;
  hoverImage: string;
  type: string;
}


export const products: Product[] = [
  {
    title: "BIBLIO ROUND",
    price: "€4,560 – €4,690",
    id: 1,
    desc: "Серія моделей з оригінальною конструкцією ніжок, що поєднують функції столу та міні-бібліотеки.",
    image: "/assets/images/table1.webp",
    hoverImage: "/assets/images/table.webp",
    type: 'table'
  },
  {
    title: "BUN",
    price: "€1,750 – €3,050",
    id: 2,
    desc: "Як би виглядало крісло, якби ви могли робити меблі з тіста, як равіолі, домашні макарони або круасани?",
    image: "/assets/images/Bun-armchair.webp",
    hoverImage: "/assets/images/Bun-armchair-1.webp",
    type: 'armchair'
  },
  {
    title: "UMI",
    price: "€1,340 – €2,230",
    id: 3,
    desc: "Дизайнер Ростислав Сороковий мав на меті створити об'єкт, що більше нагадує м'яку скульптуру, ніж меблі.",
    image: "/assets/images/UMI-armchair.webp",
    hoverImage: "/assets/images/UMI-armchair-4.webp",
    type: 'pouf'
  },
  {
    title: "BIBLIO L",
    price: "€950",
    id: 4,
    desc: "Серія моделей з оригінальною конструкцією ніжок, що поєднують функції столу та міні-бібліотеки.",
    image: "/assets/images/coffee-table-Biblio-L-1 - Edited.webp",
    hoverImage: "/assets/images/coffee-table-Biblio-L-2 - Edited.webp",
    type: 'table'
  },
  {
    title: "BIBLIO S",
    price: "€890",
    id: 5,
    desc: "Як би виглядало крісло, якби ви могли робити меблі з тіста, як равіолі, домашні макарони або круасани?",
    image: "/assets/images/Biblio-coffee-tables.001 - Edited.webp",
    hoverImage: "/assets/images/coffee-table-Biblio-L-2 - Edited.webp",
    type: 'table'
  },
  {
    title: "BALANCE",
    price: "€790 – €1,280",
    id: 6,
    desc: "Обідній стілець Balance пропонує нам розслабитися і спробувати знайти такий необхідний баланс у нашому житті.",
    image: "/assets/images/Balance-chair-1 - Edited.webp",
    hoverImage: "/assets/images/Balance-chair-2 - Edited.webp",
    type: 'pouf'
  },
  {
    title: "DROVA 6",
    price: "€980 – €2,200",
    id: 7,
    desc: "Конструкція пуфа “DROVA” складається з декількох м’яких блоків, покладених один на одного, які нагадують дрова, складені біля каміна.",
    image: "/assets/images/pouf-drova-6_1 - Edited.webp",
    hoverImage: "/assets/images/pouf-drova-6_2 - Edited.webp",
    type: 'pouf'
  },
  {
    title: "FULL FILL",
    price: "€910",
    id: 8,
    desc: "Він був натхненний творчістю художника-сюрреаліста Сальвадора Далі. Дзеркало, як рідка субстанція, витікає з рами і створює вхід у нову реальність.",
    image: "/assets/images/mirror-full-fill-1 - Edited.webp",
    hoverImage: "/assets/images/mirror-full-fill-2 - Edited.webp",
    type: 'mirror'
  },
  {
    title: "LAKE L",
    price: "€3200 – €7,480",
    id: 9,
    desc: "Ліжко з озером виділяється функціональним журнальним столиком з м’яким тканинним обідком, що нагадує латаття, яке плаває по озеру. Журнальний столик можна прибирати або пересувати вздовж ліжка за потреби.",
    image: "/assets/images/bed-lake-1 - Edited.webp",
    hoverImage: "/assets/images/bed-lake-2 - Edited.webp",
    type: 'bed'
  },
];