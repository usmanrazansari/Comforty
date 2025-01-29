'use client'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type Review = {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to submit a review');
        return;
      }

      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: newRating,
          comment: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.success('Review submitted successfully');
      setNewRating(0);
      setNewComment('');
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium">Write a Review</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewRating(star)}
              className={`text-2xl ${
                star <= newRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="w-full p-2 border rounded-lg"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={submitting || newRating === 0}
          className="px-4 py-2 bg-[#2B9DC3] text-white rounded-lg hover:bg-[#2589ab] disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-medium">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 