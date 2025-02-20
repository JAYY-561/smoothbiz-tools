
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PdfToWord = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    // TODO: Implement PDF to Word conversion
    console.log("Converting PDF to Word:", file);
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
            <h1 className="text-4xl font-display font-bold mb-4">PDF to Word</h1>
            <p className="text-xl text-gray-600">Convert PDF files to editable Word documents</p>
          </motion.div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
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
                <span className="text-lg font-medium mb-2">Choose PDF file</span>
                <span className="text-sm text-gray-500">or drag and drop it here</span>
              </label>
            </div>

            {file && (
              <div className="mt-8">
                <h3 className="font-medium mb-4">Selected File:</h3>
                <div className="bg-gray-50 p-3 rounded flex items-center justify-between">
                  <span>{file.name}</span>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <button
                  onClick={handleConvert}
                  className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Convert to Word
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PdfToWord;
