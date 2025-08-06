'use client'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addItem, removeItem, updateQuantity, clearCart } from '@/features/cart/cartSlice';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.scss';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleIncrease = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(id));
      }
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>КОШИК</h1>
        
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Ваш кошик порожній</p>
            <Link href="/" className={styles.continueShopping}>
              Продовжити покупки
            </Link>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsSection}>
              <div className={styles.itemsHeader}>
                <span>ТОВАР</span>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={100} 
                      height={100}
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <div className={styles.priceQuantity}>
                      <div className={styles.quantityControl}>
                        <button onClick={() => handleDecrease(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrease(item.id)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>€{item.price}</span>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className={styles.removeButton}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryBlock}>
                <h3>ПРОМІЖНИЙ ПІДСУМОК</h3>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.summaryBlock}>
                <h3>КОД КУПОНУ</h3>
                <div className={styles.couponInput}>
                  <input type="text" placeholder="Введіть код" />
                  <button>+</button>
                </div>
              </div>

              <div className={styles.summaryBlock}>
                <h3>ЗАГАЛОМ</h3>
                <span className={styles.totalPrice}>€{total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutButton}>
                ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}