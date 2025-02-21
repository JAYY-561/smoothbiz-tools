
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, ArrowRight, CheckCircle2, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const BackgroundRemove = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    
    try {
      toast({
        title: "Processing image...",
        description: "This may take a few moments"
      });

      // Here you would implement the actual background removal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessedImage(imagePreview);
      
      toast({
        title: "Success!",
        description: "Background has been removed"
      });
    } catch (error) {
      toast({
        title: "Error processing image",
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
                Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                Background Remover
                <span className="text-primary block mt-2">AI-Powered Magic</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Remove backgrounds from images instantly using advanced AI technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>AI-powered processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>High-quality output</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Instant preview</span>
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
                <h2 className="text-2xl font-semibold mb-2">Upload Image</h2>
                <p className="text-gray-600">Select an image to remove background</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
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
                  <span className="text-lg font-medium mb-2">Choose image file</span>
                  <span className="text-sm text-gray-500">or drag and drop it here</span>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Preview:</h3>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRemoveBackground}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Remove Background
                  </button>
                </div>
              )}

              {processedImage && (
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Result:</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href={processedImage}
                    download="processed-image.png"
                    className="mt-4 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors inline-block text-center"
                  >
                    Download Image
                  </a>
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
              <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
              <p className="text-gray-600">Advanced machine learning</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quick Results</h3>
              <p className="text-gray-600">Process images in seconds</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Free to Use</h3>
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

export default BackgroundRemove;
