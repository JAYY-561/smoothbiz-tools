
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReviewItem from "@/components/reviews/ReviewItem";
import ReviewForm from "@/components/reviews/ReviewForm";
import CustomAutomationCTA from "@/components/CustomAutomationCTA";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    setReviews(data || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold"
            >
              Customer Reviews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-gray-600"
            >
              See what our clients say about our automation solutions
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {reviews.map((review, index) => (
              <ReviewItem key={review.id} review={review} index={index} />
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Share Your Experience</h2>
            <ReviewForm onSubmit={fetchReviews} />
            
            <CustomAutomationCTA className="mt-12" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
