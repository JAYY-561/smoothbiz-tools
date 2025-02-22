
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

interface ReviewItemProps {
  review: {
    rating: number;
    comment: string;
    created_at: string;
    profiles?: {
      first_name: string;
      last_name: string;
    };
  };
  index: number;
}

const ReviewItem = ({ review, index }: ReviewItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="ml-4">
          <p className="text-gray-900 font-medium">
            {review.profiles?.first_name} {review.profiles?.last_name}
          </p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-2">{review.comment}</p>
      <p className="text-sm text-gray-500">
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default ReviewItem;
