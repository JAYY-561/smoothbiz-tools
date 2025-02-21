
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-6 py-2 bg-blue-50 rounded-full text-primary font-medium mb-4"
            >
              All-in-One Business Tools
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-display font-bold text-gray-900 max-w-3xl mx-auto leading-tight"
            >
              Free Business Tools to 
              <span className="text-primary"> Boost Your Productivity</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Access our collection of powerful business tools designed to streamline your workflow and enhance efficiency - all completely free.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-primary/5 to-transparent rounded-tr-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{tool.title}</h3>
                  <p className="text-gray-600 mb-6 min-h-[48px]">{tool.description}</p>
                  {tool.comingSoon ? (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      to={tool.path}
                      className="inline-flex items-center text-primary hover:text-primary-hover group-hover:gap-3 transition-all"
                    >
                      Try Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full text-gray-600">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              All tools are free to use
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <h3 className="font-semibold text-lg mb-2">No Registration</h3>
                <p className="text-gray-600">Start using tools instantly without signing up</p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <h3 className="font-semibold text-lg mb-2">100% Free</h3>
                <p className="text-gray-600">All tools are completely free to use</p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                <p className="text-gray-600">Your files are processed securely</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
