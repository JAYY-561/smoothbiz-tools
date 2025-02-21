
import Navigation from "@/components/Navigation";
import { ArrowRight, FileType, Image, FileText, Minimize2, File, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Tools = () => {
  const tools = [
    {
      title: "PDF Merge",
      icon: <FileType className="h-8 w-8" />,
      description: "Combine multiple PDF files into a single document",
      path: "/tools/pdf-merge",
      comingSoon: false,
    },
    {
      title: "Background Remove",
      icon: <Image className="h-8 w-8" />,
      description: "Remove image backgrounds with AI precision",
      path: "/tools/background-remove",
      comingSoon: false,
    },
    {
      title: "PDF to Word",
      icon: <FileText className="h-8 w-8" />,
      description: "Convert PDF files to editable Word documents",
      path: "/tools/pdf-to-word",
      comingSoon: false,
    },
    {
      title: "PDF to JPG",
      icon: <Image className="h-8 w-8" />,
      description: "Convert PDF pages to JPG images",
      path: "/tools/pdf-to-jpg",
      comingSoon: false,
    },
    {
      title: "JPG to PDF",
      icon: <File className="h-8 w-8" />,
      description: "Convert JPG images to PDF format",
      path: "/tools/jpg-to-pdf",
      comingSoon: false,
    },
    {
      title: "Compress Image",
      icon: <Minimize2 className="h-8 w-8" />,
      description: "Reduce image file size without losing quality",
      path: "/tools/compress-image",
      comingSoon: false,
    },
    {
      title: "GST Calculator",
      icon: <Calculator className="h-8 w-8" />,
      description: "Calculate GST amount and total price",
      path: "/tools/gst-calculator",
      comingSoon: false,
    },
  ];

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
              Free Business Tools
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-gray-600"
            >
              Boost your productivity with our collection of free business tools
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-primary mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                {tool.comingSoon ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Coming Soon
                  </span>
                ) : (
                  <Link
                    to={tool.path}
                    className="inline-flex items-center text-primary hover:text-primary-hover"
                  >
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
