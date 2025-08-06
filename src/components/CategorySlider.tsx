'use client'

import { useState, useRef, useEffect } from 'react';
import styles from './CategorySlider.module.scss';
import Image from 'next/image';

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(7);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 1, name: 'Дивани' },
    { id: 2, name: 'Ліжка' },
    { id: 3, name: 'Столи' },
    { id: 4, name: 'Стільці' },
    { id: 5, name: 'Шафи' },
    { id: 6, name: 'Комоди' },
    { id: 7, name: 'Полиці' },
    { id: 8, name: 'Пуфи' },
    { id: 9, name: 'Тумби' },
    { id: 10, name: 'Дитячі' },
    { id: 11, name: 'Офісні' },
    { id: 12, name: 'Садові' },
  ];

  const totalCategories = categories.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVisibleCategories(3);
      } else if (window.innerWidth < 768) {
        setVisibleCategories(4);
      } else if (window.innerWidth < 1024) {
        setVisibleCategories(5);
      } else {
        setVisibleCategories(7);
      }
      setCurrentIndex(0); // Reset to first item on resize
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(totalCategories - visibleCategories);
    }
    smoothScroll();
  };

  const slideRight = () => {
    if (currentIndex < totalCategories - visibleCategories) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    smoothScroll();
  };

  const smoothScroll = () => {
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.scrollBehavior = 'auto';
        }
      }, 500);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button 
        className={`${styles.arrowButton} ${styles.leftArrow}`}
        onClick={slideLeft}
        aria-label="Попередні категорії"
      >
        <Image src='/assets/icons/arrow-prev.svg' width={24} height={24} alt='arrow'/>
      </button>
      
      <div className={styles.sliderWrapper}>
        <div 
          ref={sliderRef}
          className={styles.slider}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCategories)}%)`
          }}
        >
          {categories.map(category => (
            <div key={category.id} className={styles.categoryItem}>
              {category.name}
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className={`${styles.arrowButton} ${styles.rightArrow}`}
        onClick={slideRight}
        aria-label="Наступні категорії"
      >
        <Image src='/assets/icons/arrow-next.svg' width={24} height={24} alt='arrow'/>
      </button>
    </div>
  );
};

export default CategorySlider;