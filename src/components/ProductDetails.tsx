'use client'

import React, { useState } from 'react';
import styles from './ProductDetails.module.scss';
import { useDispatch } from 'react-redux';
import { addItem } from '@/features/cart/cartSlice';
import Image from 'next/image';

interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    price: string;
    desc: string;
    image: string;
    hoverImage: string;
    type: string;
  };
}

type Card = {
  title: string;
  price: string;
  id: number;
  desc: string;
  image: string;
  hoverImage: string;
  type: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch()
  const productImages = [product.image, product.hoverImage, product.image, product.hoverImage];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? productImages.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleAddToCart = (card: Card) => {
    console.log('Adding to cart:', card.title); 
    const priceValue = parseFloat(card.price.match(/[\d,]+/)?.[0].replace(',', '') || '0');
    
    console.log('Dispatching addItem action'); 
    dispatch(addItem({
      id: card.id,
      name: card.title,
      price: priceValue,
      image: card.image,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {productImages.map((image, index) => (
          <div 
            key={index}
            className={index === 0 ? styles.mainImage : styles.thumbnail}
            onClick={() => openModal(index)}
          >
            <Image 
              src={image} 
              alt={`${product.title} - фото ${index + 1}`}
              width={800}
              height={800}
              priority={index === 0}
            />
            <div className={styles.zoomHint}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 15l6-6m-6 6l-6-6m6 6l-6 6m6-6l6 6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>{product.desc}</p>
        
        <div className={styles.actions}>
          <button 
  className={styles.addToCart} 
   onClick={(e) => {
                    e.stopPropagation();
                     e.preventDefault();
                    handleAddToCart(product);
                  }}
>
  + ДОДАТИ В КОШИК
</button>
          <button className={styles.consultation}>ОТРИМАТИ КОНСУЛЬТАЦІЮ</button>
        </div>
        
        <div className={styles.delivery}>
          ДОСТАВКА ПО ВСЬОМУ СВІТУ
        </div>
      </div>

     
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            
            <Image 
              src={productImages[currentImageIndex]} 
              alt={`${product.title} - фото ${currentImageIndex + 1}`}
              width={1200}
              height={800}
            />
            
            <button 
              className={`${styles.navButton} ${styles.prev}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
             <Image src='/assets/icons/arrow-prev.svg' width={50} height={50} alt='arrow'/>
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.next}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
             <Image src='/assets/icons/arrow-next.svg' width={50} height={50} alt='arrow'/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;