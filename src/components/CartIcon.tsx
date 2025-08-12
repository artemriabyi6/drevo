'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './CartIcon.module.scss';

const CartIcon = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCartItemsRef = useRef<string>('');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const cartKey = cartItems
    .map(item => `${item.id}-${item.quantity}`)
    .join('|');
    
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
   
    if (cartKey !== prevCartItemsRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      prevCartItemsRef.current = cartKey;
      return () => clearTimeout(timer);
    }
  }, [cartKey]);

  return (
    <div 
      className={styles.cartContainer}
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/cart" passHref>
        <div className={`${styles.cartIcon} ${isAnimating ? styles.bounce : ''}`}>
          <Image 
            src="/assets/icons/paper-bag-cart.svg" 
            width={24} 
            height={24} 
            alt="Кошик"
            priority
          />
          {itemsCount > 0 && (
            <span className={styles.cartBadge}>{itemsCount}</span>
          )}
        </div>
      </Link>

      {/* {isOpen && (
        <div className={styles.cartDropdown}>
          <div className={styles.dropdownHeader}>
            <h4>Кошик ({itemsCount})</h4>
          </div>
          
          {itemsCount > 0 ? (
            <>
              <div className={styles.cartItems}>
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.quantity}`} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image 
                        src={item.image} 
                        width={80}
                        height={80}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemPrice}>€{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <p className={styles.totalPrice}>Разом: €{totalPrice.toFixed(2)}</p>
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
              <Link href="/shop" className={styles.continueShopping}>
                Продовжити покупки
              </Link>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default CartIcon;