import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
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
