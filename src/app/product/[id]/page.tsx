import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: PageProps) {
  // Валідація параметра
  const productId = Number(params.id);
  if (isNaN(productId)) {
    notFound();
  }

  // Пошук продукту
  const product = products.find(p => p.id === productId);
  if (!product) {
    notFound();
  }

  // Рендер сторінки
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


