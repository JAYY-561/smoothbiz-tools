
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/home/HeroSection";
import PopularTools from "@/components/home/PopularTools";
import Benefits from "@/components/home/Benefits";
import HomeReviews from "@/components/home/HomeReviews";
import CustomAutomationCTA from "@/components/CustomAutomationCTA";
import { Bot, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <HeroSection />
      <PopularTools />
      <Benefits />
      <HomeReviews />
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold">Why Choose AutomatePro?</h2>
            <p className="mt-4 text-gray-600">
              We deliver comprehensive automation solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-8 w-8 text-primary" />,
                title: "Smart Automation",
                description: "Intelligent solutions that adapt to your business processes"
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Rapid Implementation",
                description: "Quick deployment with minimal disruption to your operations"
              },
              {
                icon: <BarChart className="h-8 w-8 text-primary" />,
                title: "Measurable Results",
                description: "Track and optimize your automation ROI in real-time"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CustomAutomationCTA className="mx-4 sm:mx-6 lg:mx-8 my-20 max-w-5xl lg:max-w-7xl lg:mx-auto" />
    </div>
  );
};

export default Index;
