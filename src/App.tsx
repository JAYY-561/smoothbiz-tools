import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingCTA from "@/components/FloatingCTA";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import Auth from "./pages/Auth";
import PdfMerge from "./pages/tools/PdfMerge";
import PdfToWord from "./pages/tools/PdfToWord";
import PdfToJpg from "./pages/tools/PdfToJpg";
import JpgToPdf from "./pages/tools/JpgToPdf";
import BackgroundRemove from "./pages/tools/BackgroundRemove";
import CompressImage from "./pages/tools/CompressImage";
import GstCalculator from "./pages/tools/GstCalculator";
import UseCases from "./pages/UseCases";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tools/pdf-merge" element={<PdfMerge />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/tools/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/tools/background-remove" element={<BackgroundRemove />} />
            <Route path="/tools/compress-image" element={<CompressImage />} />
            <Route path="/tools/gst-calculator" element={<GstCalculator />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingCTA />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
