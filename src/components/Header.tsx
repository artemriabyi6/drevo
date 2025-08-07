'use client'

import styles from "./header.module.scss";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CartIcon from "./CartIcon";
import { RootState } from '@/redux/store';

const Header = () => {
  // Отримуємо likedItems замість likedIds
  const { likedItems } = useSelector((state: RootState) => state.favorites);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Рахуємо кількість елементів у вішлісті
  const wishlistCount = likedItems ? likedItems.length : 0;

  useEffect(() => {
    if (wishlistCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button 
          className={styles.burgerMenu}
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <Image
            src="/assets/icons/burger.svg"
            width={24}
            height={24}
            alt="menu"
          />
        </button>

        <div className={styles.logoBlock}>
          <Link href='/'>
            <Image 
              src='/assets/images/logo.webp' 
              width={200} 
              height={80} 
              alt="logo"
              className={styles.logo}
            />
          </Link>
        </div>

        <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul>
            <li><a href="">Магазин</a></li>
            <li><a href="">Категорії</a></li>
            <li><a href="">Про нас</a></li>
            <li><a href="">Дизайнери</a></li>
            <li><a href="">Контакти</a></li>
          </ul>
        </nav>

        <div className={styles.featuresBlock}>
          <div className={styles.favoriteWrapper}>
            <Link href='/wishList'>
              <Image
                src="/assets/icons/heart.svg"
                width={20}
                height={20}
                alt="like-btn"
                className={`${styles.heartIcon} ${isAnimating ? styles.bounce : ''}`}
              />
            </Link>
            {wishlistCount > 0 && (
              <span className={styles.favoriteCount}>{wishlistCount}</span>
            )}
          </div>
          <CartIcon/>
        </div>
      </div>
    </header>
  );
};

export default Header;