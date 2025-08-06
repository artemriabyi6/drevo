'use client'

import { useState, useRef, useEffect } from 'react';
import styles from './CategorySlider.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '@/features/filter/filterSlice';
import { RootState } from '../redux/store';

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(7);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentCategory = useSelector((state: RootState) => state.filter.category);
  const dispatch = useDispatch();

  const categories = [
    { id: 'all', name: 'Всі товари' },
    { id: 'table', name: 'Столи' },
    { id: 'armchair', name: 'Крісла' },
    { id: 'bed', name: 'Ліжка' },
    { id: 'sofa', name: 'Дивани' },
    { id: 'wardrobe', name: 'Шафи' },
    { id: 'chest', name: 'Комоди' },
    { id: 'shelf', name: 'Полиці' },
    { id: 'pouf', name: 'Пуфи' },
    { id: 'cabinet', name: 'Тумби' },
    { id: 'mirror', name: 'Зеркала' },
    { id: 'office', name: 'Офісні' },
    { id: 'garden', name: 'Садові' }
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
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setCategory(categoryId === 'all' ? null : categoryId));
  };

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
            <div 
              key={category.id} 
              className={`${styles.categoryItem} ${
                (currentCategory === category.id || 
                (currentCategory === null && category.id === 'all')) ? styles.active : ''
              }`}
              onClick={() => dispatch(setCategory(category.id === 'all' ? null : category.id))}
            >
              {category.name}
              <span className={styles.underline} />
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