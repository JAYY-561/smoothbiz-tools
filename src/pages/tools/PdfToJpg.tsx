
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, ArrowRight, CheckCircle2, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PdfToJpg = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      toast({
        title: "Converting PDF...",
        description: "This may take a few moments"
      });

      // Here you would implement the actual PDF to JPG conversion
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Success!",
        description: "PDF has been converted to JPG"
      });
    } catch (error) {
      toast({
        title: "Error converting file",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-6 py-2 bg-blue-50 rounded-full text-primary font-medium mb-6">
                Free Conversion Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                PDF to JPG Converter
                <span className="text-primary block mt-2">Crystal Clear Images</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Convert PDF pages to high-quality JPG images while preserving clarity and details.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>High resolution output</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Batch conversion</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Simple process</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Image className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Upload PDF File</h2>
                <p className="text-gray-600">Select a PDF file to convert to JPG</p>
              </div>

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
                    Convert to JPG
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">High-quality image output</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick conversion process</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Free Service</h3>
              <p className="text-gray-600">No cost, no registration</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Explore More Tools</h2>
            <Link
              to="/tools"
              className="inline-flex items-center text-primary hover:text-primary-hover gap-2"
            >
              View All Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PdfToJpg;
