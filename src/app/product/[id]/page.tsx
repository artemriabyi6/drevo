import { notFound } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';
import { products } from '../../../data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = parseInt(params.id);
  
  if (isNaN(productId)) {
    return notFound();
  }

  const product = products.find(product => product.id === productId);
  
  if (!product) {
    return notFound();
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
};

export default ProductPage;