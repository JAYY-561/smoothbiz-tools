
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CustomAutomationCTAProps {
  className?: string;
  variant?: "default" | "light" | "dark";
}

const CustomAutomationCTA = ({ className = "", variant = "default" }: CustomAutomationCTAProps) => {
  const bgColorClass = {
    default: "bg-blue-50",
    light: "bg-white",
    dark: "bg-gray-900",
  }[variant];

  const textColorClass = variant === "dark" ? "text-white" : "text-gray-900";
  const descriptionColorClass = variant === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${bgColorClass} ${className} p-6 rounded-xl`}
    >
      <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>
        Need a Custom Automation Solution?
      </h3>
      <p className={`${descriptionColorClass} mb-4`}>
        We specialize in creating tailored automation solutions for businesses of all sizes.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
      >
        Get a Custom Solution
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

export default CustomAutomationCTA;
