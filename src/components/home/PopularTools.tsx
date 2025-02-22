
import { motion } from "framer-motion";
import { ArrowRight, FileType, Image, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const popularTools = [
  {
    icon: <FileType className="h-6 w-6" />,
    title: "PDF Tools",
    description: "Convert, merge, and edit PDF files easily",
    link: "/tools/pdf-merge"
  },
  {
    icon: <Image className="h-6 w-6" />,
    title: "Image Tools",
    description: "Compress images and remove backgrounds",
    link: "/tools/compress-image"
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Business Tools",
    description: "Calculate GST and other business metrics",
    link: "/tools/gst-calculator"
  }
];

const PopularTools = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Popular Tools</h2>
          <p className="text-gray-600">Start with our most-used business tools</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {popularTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-primary/5 to-transparent rounded-tr-2xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Link
                  to={tool.link}
                  className="inline-flex items-center text-primary hover:text-primary-hover group-hover:gap-3 transition-all"
                >
                  Try Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTools;
