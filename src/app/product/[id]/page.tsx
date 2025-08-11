import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function Page({ params }) {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main className="container">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </>
  );
}

