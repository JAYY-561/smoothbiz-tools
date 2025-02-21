
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, ArrowRight, CheckCircle2, File } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const JpgToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      if (selectedFiles.length !== e.target.files.length) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files",
          variant: "destructive"
        });
      }
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    try {
      toast({
        title: "Converting images...",
        description: "This may take a few moments"
      });

      // Here you would implement the actual JPG to PDF conversion
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Success!",
        description: "Images have been converted to PDF"
      });
    } catch (error) {
      toast({
        title: "Error converting files",
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
                JPG to PDF Converter
                <span className="text-primary block mt-2">Professional PDFs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Convert your JPG images to professional PDF documents in seconds.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Multiple image support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Maintains image quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Instant conversion</span>
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
                  <File className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Upload Images</h2>
                <p className="text-gray-600">Select JPG images to convert to PDF</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <span className="text-lg font-medium mb-2">Choose image files</span>
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
                    onClick={handleConvert}
                    className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Convert to PDF
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
              <h3 className="text-lg font-semibold mb-2">Bulk Convert</h3>
              <p className="text-gray-600">Convert multiple images at once</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">High-quality PDF output</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Always Free</h3>
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

export default JpgToPdf;
