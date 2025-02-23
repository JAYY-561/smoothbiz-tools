
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";
import { Save, ArrowLeft } from "lucide-react";

type BlogPost = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string | null;
  status: 'draft' | 'published';
  author_id?: string;
};

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState<BlogPost>({
    title: "",
    excerpt: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    checkAdminAccess();
    if (id) {
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase.rpc('has_role', {
      user_id: session.user.id,
      role: 'admin'
    });

    if (error || !data) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/admin");
    }
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setPost({
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url,
          status: data.status as 'draft' | 'published',
          author_id: data.author_id
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Could not load the blog post.",
        variant: "destructive",
      });
      navigate("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ 
      ...prev, 
      [name]: name === 'status' ? (value as 'draft' | 'published') : value 
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("Not authenticated");

      const postData = {
        ...post,
        author_id: session.user.id,
      };

      const { error } = id
        ? await supabase
            .from('blog_posts')
            .update(postData)
            .eq('id', id)
        : await supabase
            .from('blog_posts')
            .insert([postData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: id ? "Post updated successfully" : "Post created successfully",
      });

      navigate("/admin");
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Could not save the blog post.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? "Saving..." : "Save Post"}
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={post.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
                placeholder="Brief description of the post"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={12}
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={post.image_url || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={post.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogEditor;
