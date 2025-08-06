// Footer.tsx
'use client'

import styles from './Footer.module.scss';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут можна додати логіку підписки
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>
            ПІДПИШІТЬСЯ, ЩОБ БУТИ В КУРСІ ОСТАННІХ<br />
            ВИПУСКІВ ПРОДУКТІВ, СПЕЦІАЛЬНИХ<br />
            ПРОПОЗИЦІЙ ТА НОВИН
          </h3>
          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className={styles.linksContainer}>
          <div className={styles.linksColumn}>
            <h4 className={styles.linksTitle}>МАГАЗИН</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Категорії</a></li>
              <li><a href="#">Новинки</a></li>
              <li><a href="#">Акції</a></li>
              <li><a href="#">Колекції</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.linksTitle}>КАР'ЄРА</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Вакансії</a></li>
              <li><a href="#">Стажировка</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.linksTitle}>ПЛАТЕЖІ ТА ДОСТАВКА</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Способи оплати</a></li>
              <li><a href="#">Доставка</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.linksTitle}>ПОВЕРНЕННЯ ТА ВІДШКОДУВАННЯ</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Політика повернення</a></li>
              <li><a href="#">Гарантія</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <p className={styles.contactText}>
            Якщо у вас виникли запитання, будь ласка, зв'яжіться з нами
          </p>
          
          <div className={styles.contactInfo}>
            <p className={styles.contactHours}>
              ПОНЕДІЛОК - П'ЯТНИЦЯ: 10:00 - 19:00
            </p>
            <p className={styles.contactPhone}>ТЕЛ.: +380996360676</p>
            <p className={styles.contactEmail}>ЕЛЕКТРОННА ПОШТА: INFO@DREVO.FURNITURE</p>
            <p className={styles.contactAddress}>
              АДРЕСА: АНДРІЇВСЬКА, 47Б, 04080, КИЇВ, УКРАЇНА
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;