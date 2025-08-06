'use client'

import styles from "./header.module.scss";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { likedIds, lastAddedId } = useSelector((state: { favorites: { likedIds: number[], lastAddedId: number | null } }) => state.favorites);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (lastAddedId) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedId]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Burger menu for mobile */}
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

        {/* Logo - centered on mobile */}
        <div className={styles.logoBlock}>
          <Image 
            src='/assets/images/logo.webp' 
            width={200} 
            height={80} 
            alt="logo"
            className={styles.logo}
          />
        </div>

        {/* Navigation - hidden on mobile */}
        <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul>
            <li>
              <a href="">Магазин</a>
            </li>
            <li>
              <a href="">Категорії</a>
            </li>
            <li>
              <a href="">Про нас</a>
            </li>
            <li>
              <a href="">Дизайнери</a>
            </li>
            <li>
              <a href="">Контакти</a>
            </li>
          </ul>
        </nav>

        {/* Features block - always visible */}
        <div className={styles.featuresBlock}>
          <div className={styles.favoriteWrapper}>
            <Image
              src="/assets/icons/heart.svg"
              width={20}
              height={20}
              alt="like-btn"
              className={`${styles.heartIcon} ${isAnimating ? styles.bounce : ''}`}
            />
            {likedIds.length > 0 && (
              <span className={styles.favoriteCount}>{likedIds.length}</span>
            )}
          </div>
          <Image
            src="/assets/icons/search.svg"
            width={20}
            height={20}
            alt="search"
          />
          <Image
            src="/assets/icons/paper-bag-cart.svg"
            width={20}
            height={20}
            alt="cart"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;