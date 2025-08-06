'use client'

import styles from "./hero.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '@/features/favorites/favoritesSlice';
import { setCategory } from '@/features/filter/filterSlice';
import { RootState } from '../../redux/store';

type Card = {
  title: string;
  price: string;
  id: number;
  desc: string;
  image: string;
  hoverImage: string;
  type: string;
};

const cards: Card[] = [
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

const Hero = () => {
 const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const dispatch = useDispatch();
  const likedIds = useSelector((state: RootState) => state.favorites.likedIds);
  const currentCategory = useSelector((state: RootState) => state.filter.category);

  const filteredCards = currentCategory
    ? cards.filter(card => card.type === currentCategory)
    : cards;

    const handleResetCategory = () => {
    dispatch(setCategory(null)); 
  };

  return (
    <section className={styles.section}>
      {filteredCards.length > 0 ? (
           filteredCards.map((card) => (
        <div 
          key={card.id}
          className={styles.card}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image 
                src={card.image} 
                alt={card.title}
                width={506}
                height={506}
                className={`${styles.image} ${styles.mainImage} ${
                  hoveredCard === card.id ? styles.hidden : ''
                }`}
              />
              <Image 
                src={card.hoverImage} 
                alt={card.title}
                width={506}
                height={506}
                className={`${styles.image} ${styles.hoverImage} ${
                  hoveredCard === card.id ? styles.visible : ''
                }`}
              />
            </div>
            <button 
              className={`${styles.favoriteButton} ${
                hoveredCard === card.id ? styles.visible : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(card.id));
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={likedIds.includes(card.id) ? "red" : "none"} 
                stroke={likedIds.includes(card.id) ? "red" : "black"} 
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <div className={`${styles.buttonGroup} ${
              hoveredCard === card.id ? styles.visible : ''
            }`}>
              <button className={styles.actionButton}>QUICK VIEW</button>
              <button className={styles.actionButton}>+ ДОДАТИ В КОШИК</button>
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.description}>{card.desc}</p>
            <p className={styles.price}>{card.price}</p>
          </div>
        </div>
      ))) : (
        <div className={styles.emptyMessage}>
          <p>У цій категорії на жаль відсутні товари</p>
          <button 
            className={styles.backButton}
            onClick={handleResetCategory}
          >
            Повернутись до всіх товарів
          </button>
        </div>
      )
   
      }
    </section>
  );
};

export default Hero;