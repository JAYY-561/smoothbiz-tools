
import { ArrowRight, Bot, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900"
            >
              Automate Your Business,
              <br />
              <span className="text-primary">Amplify Your Success</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Transform your business operations with intelligent automation solutions.
              Streamline workflows, reduce costs, and boost productivity.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex justify-center gap-4"
            >
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors inline-flex items-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tools"
                className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Try Free Tools
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
