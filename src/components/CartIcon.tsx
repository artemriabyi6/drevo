'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './CartIcon.module.scss';

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Анімація при зміні вмісту кошика
  useEffect(() => {
    if (itemsCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemsCount, cartItems]);

  return (
    <div 
      className={styles.cartContainer}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/cart" passHref>
        <div className={`${styles.cartIcon} ${isAnimating ? styles.bounce : ''}`}>
          <Image 
            src="/assets/icons/paper-bag-cart.svg" 
            width={24} 
            height={24} 
            alt="Cart"
          />
          {itemsCount > 0 && (
            <span className={styles.cartBadge}>{itemsCount}</span>
          )}
        </div>
      </Link>

      {isOpen && (
        <div className={styles.cartDropdown}>
          <div className={styles.dropdownHeader}>
            <h4>Кошик ({itemsCount})</h4>
          </div>
          
          {itemsCount > 0 ? (
            <>
              <div className={styles.cartItems}>
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.quantity}`} className={styles.cartItem}>
                    <Image 
                      src={item.image} 
                      width={100} 
                      height={100} 
                      alt={item.name}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>€{item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <p>Разом: €{totalPrice.toFixed(2)}</p>
                <Link href="/cart" passHref>
                  <button className={styles.checkoutButton}>
                    Оформити замовлення
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.emptyCart}>
              <p>Кошик порожній</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIcon;