import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  _id: string | number;
  name: string;
  description: string[];
  price: number;
  images: string[];
  onRemove?: (_id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, description, price, images, onRemove }) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const productId = _id.toString();

  const handleClick = () => {
    router.push(`/product/${productId}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full mb-4">
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {isInWishlist(productId) ? (
            <FaHeart className="text-red-500 w-5 h-5" />
          ) : (
            <FaRegHeart className="text-gray-500 w-5 h-5" />
          )}
        </button>
        <div className="cursor-pointer" onClick={handleClick}>
          <Image
            src={images[0] || '/placeholder.png'}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={handleClick}>{name}</h3>
      <p className="text-gray-600 mb-2">{description[0]}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${price.toFixed(2)}</span>
        {onRemove && (
          <button
            onClick={() => onRemove(productId)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
