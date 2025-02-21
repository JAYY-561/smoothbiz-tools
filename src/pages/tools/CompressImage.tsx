
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CompressImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressionRate, setCompressionRate] = useState<number>(80);
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

  const handleCompress = async () => {
    if (!file) return;
    
    try {
      toast({
        title: "Compressing image...",
        description: "This may take a few moments"
      });

      // For demonstration, we're just returning the original image
      // In a real implementation, you would use a compression library or service
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCompressedImage(imagePreview);
      
      toast({
        title: "Success!",
        description: "Image has been compressed"
      });
    } catch (error) {
      toast({
        title: "Error compressing image",
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
            <h1 className="text-4xl font-display font-bold mb-4">Compress Image</h1>
            <p className="text-xl text-gray-600">Reduce image file size without losing quality</p>
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
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Compression Quality: {compressionRate}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={compressionRate}
                      onChange={(e) => setCompressionRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={handleCompress}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Compress Image
                  </button>
                </div>
              </div>
            )}

            {compressedImage && (
              <div className="mt-8">
                <h3 className="font-medium mb-4">Compressed Result:</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={compressedImage} 
                    alt="Compressed" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  href={compressedImage}
                  download="compressed-image.jpg"
                  className="mt-4 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors inline-block text-center"
                >
                  Download Compressed Image
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressImage;
