
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PdfMerge = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleMerge = async () => {
    // TODO: Implement PDF merge functionality
    console.log("Merging PDFs:", files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-display font-bold mb-4">PDF Merge</h1>
            <p className="text-xl text-gray-600">Combine multiple PDF files into a single document</p>
          </motion.div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-lg font-medium mb-2">Choose PDF files</span>
                <span className="text-sm text-gray-500">or drag and drop them here</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="font-medium mb-4">Selected Files:</h3>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span>{file.name}</span>
                      <button
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleMerge}
                  className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Merge PDFs
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PdfMerge;
