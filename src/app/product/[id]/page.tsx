import { notFound } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';
import { products } from '../../../data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = parseInt(params.id);
  const product = products.find(product => product.id === productId);
  
  if (!product) {
    return notFound();
  }

  return (
    <>
    <Header/>
    <div className="container">
      <ProductDetails product={product} />
    </div>
    <Footer/>
    </>
    
  );
};

export default ProductPage;