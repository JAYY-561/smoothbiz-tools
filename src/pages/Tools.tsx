
import Navigation from "@/components/Navigation";
import { ArrowRight, FileType, Image, FileText, Minimize2, File } from "lucide-react";
import { motion } from "framer-motion";

const Tools = () => {
  const tools = [
    {
      title: "PDF Merge",
      icon: <FileType className="h-8 w-8" />,
      description: "Combine multiple PDF files into a single document",
      comingSoon: true,
    },
    {
      title: "Background Remove",
      icon: <Image className="h-8 w-8" />,
      description: "Remove image backgrounds with AI precision",
      comingSoon: true,
    },
    {
      title: "Edit PDF",
      icon: <FileText className="h-8 w-8" />,
      description: "Edit text and images in your PDF files",
      comingSoon: true,
    },
    {
      title: "PDF to JPG",
      icon: <Image className="h-8 w-8" />,
      description: "Convert PDF pages to JPG images",
      comingSoon: true,
    },
    {
      title: "JPG to PDF",
      icon: <File className="h-8 w-8" />,
      description: "Convert JPG images to PDF format",
      comingSoon: true,
    },
    {
      title: "Compress Image",
      icon: <Minimize2 className="h-8 w-8" />,
      description: "Reduce image file size without losing quality",
      comingSoon: true,
    },
    {
      title: "PDF to Word",
      icon: <FileText className="h-8 w-8" />,
      description: "Convert PDF files to editable Word documents",
      comingSoon: true,
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
                  <button className="inline-flex items-center text-primary hover:text-primary-hover">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
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
