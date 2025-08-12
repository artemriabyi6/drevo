'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart } from '@/features/cart/cartSlice';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from './OrderForm.module.scss';

export default function OrderForm() {
 
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      phone: '',
      address: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = "Введіть ваше ім'я";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введіть номер телефону";
      valid = false;
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Введіть адресу доставки";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert('Кошик порожній! Додайте товари перед замовленням');
      return;
    }

    
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      date: new Date().toISOString(),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        alert('Замовлення успішно оформлено!');
        dispatch(clearCart());
      } else {
        throw new Error('Помилка сервера');
      }
    } catch (error) {
      console.error('Помилка при оформленні замовлення:', error);
      alert('Сталася помилка при оформленні замовлення');
    }
  };

  return (
   <>
   <Header/>
    <div className={styles.orderFormContainer}>
        
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {`Ім'я *`}
          </label>
          <input
            id="name"
            type="text"
            className={`${styles.input} ${errors.name && styles.errorInput}`}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            className={`${styles.input} ${errors.phone && styles.errorInput}`}
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email 
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Адреса доставки *
          </label>
          <textarea
            id="address"
            className={`${styles.input} ${styles.textarea} ${errors.address && styles.errorInput}`}
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && <span className={styles.errorText}>{errors.address}</span>}
        </div>

        <div className={styles.cartSummary}>
          <h3 className={styles.summaryTitle}>Ваше замовлення:</h3>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <Image 
                src={item.image} 
                alt={item.name} 
                className={styles.itemImage}
                width={80}
                height={80}
              />
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <div className={styles.itemMeta}>
                  <span className={styles.itemPrice}>{item.price} грн</span>
                  <span className={styles.itemQuantity}>× {item.quantity}</span>
                  <span className={styles.itemTotal}>{item.price * item.quantity} грн</span>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.orderTotal}>
            <span>Всього:</span>
            <span className={styles.totalAmount}>
              {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} грн
            </span>
          </div>
        </div>

       
         <button type="submit" className={styles.submitButton}>
          Підтвердити замовлення
        </button>
       
       
      </form>
    </div>
    <Footer/>
    </>
  );
}