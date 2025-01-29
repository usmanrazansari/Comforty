import ProductDetails from '@/components/ProductDetails';
import ProductReviews from '@/components/ProductReviews';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ProductDetails id={params.id} />
      <ProductReviews productId={params.id} />
    </>
  );
} 