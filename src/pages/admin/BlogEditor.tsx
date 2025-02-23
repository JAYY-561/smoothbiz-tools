
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import PostForm from "@/components/blog/PostForm";
import { usePostManagement } from "@/hooks/usePostManagement";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, isLoading, isSaving, handleChange, handleSave } = usePostManagement(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navigation />
        <div className="pt-32 pb-20 px-4 text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Admin
            </button>
          </div>

          <PostForm
            post={post}
            onChange={handleChange}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogEditor;
