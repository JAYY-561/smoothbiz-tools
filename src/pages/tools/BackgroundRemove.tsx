
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
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
      const formData = new FormData();
      formData.append('image', file);
      
      // Here you would call your API endpoint to remove the background
      // For now, we'll simulate the process
      toast({
        title: "Processing image...",
        description: "This may take a few moments"
      });

      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demonstration, we're just returning the original image
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
            <h1 className="text-4xl font-display font-bold mb-4">Background Remove</h1>
            <p className="text-xl text-gray-600">Remove image backgrounds with AI precision</p>
          </motion.div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
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
              <div className="mt-8">
                <h3 className="font-medium mb-4">Preview:</h3>
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={handleRemoveBackground}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Remove Background
                  </button>
                </div>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundRemove;
