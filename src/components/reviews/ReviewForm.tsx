
import { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ReviewFormProps {
  onSubmit: () => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            user_id: session.user.id,
            rating,
            comment,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Review submitted successfully",
        description: "Thank you for your feedback!"
      });

      // Reset form
      setRating(0);
      setComment("");
      onSubmit();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (!session) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">Please sign in to submit a review</p>
        <button
          onClick={() => navigate('/auth')}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={4}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with our services..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
