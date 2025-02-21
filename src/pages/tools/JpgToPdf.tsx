
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
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
      // For now, we'll simulate the process
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
            <h1 className="text-4xl font-display font-bold mb-4">JPG to PDF</h1>
            <p className="text-xl text-gray-600">Convert JPG images to PDF format</p>
          </motion.div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default JpgToPdf;
