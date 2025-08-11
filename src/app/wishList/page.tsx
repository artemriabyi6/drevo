'use client'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromWishlist } from '@/features/favorites/favoritesSlice';
import { addItem } from '@/features/cart/cartSlice';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { likedItems } = useSelector((state: RootState) => state.favorites);
  const wishlistItems = likedItems || [];
  const isEmpty = wishlistItems.length === 0;

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>СПИСОК БАЖАНЬ</h1>
        
        {isEmpty ? (
          <div className={styles.emptyWishlist}>
            <Link href='/'>
             <Image
              src="/assets/icons/heart.svg"
              width={100}
              height={100}
              alt="Empty wishlist"
            />
            </Link>
            <p>Your Wishlist Is Currently Empty</p>
            <p>Click the icon to add products</p>
            <Link href="/" className={styles.backToShop}>
              ПОВЕРНУТИСЬ В МАГАЗИН
            </Link>
          </div>
        ) : (
          <div className={styles.wishlistContent}>
            <table className={styles.wishlistTable}>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>ЦІНА</th>
                  <th>STOCK STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.productCell}>
                      <div className={styles.productInfo}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                        />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>€{item.price}</td>
                    <td>IN STOCK</td>
                    <td className={styles.actionsCell}>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className={styles.addToCartBtn}
                      >
                        + ДОДАТИ В КОШИК
                      </button>
                      <button 
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className={styles.removeBtn}
                      >
                        <Image
                          src="/assets/icons/remove.svg"
                          width={20}
                          height={20}
                          alt="Remove"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.shareSection}>
              <h3>ПОДІЛИТИСЯ ПОСИЛАННЯМ:</h3>
              <div className={styles.shareLink}>
                <input 
                  type="text" 
                  value={`${window.location.origin}/wishlist`} 
                  readOnly 
                />
                <button onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/wishlist`);
                }}>Копіювати</button>
              </div>
              <div className={styles.socialIcons}>
                <span>ПОДІЛИТИСЯ БАЖАННЯМИ:</span>
                <div className={styles.icons}>
                  {/*temporal buttons */}
                  <button>💬</button>
                  <button>💭</button>
                  <button>💮</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}