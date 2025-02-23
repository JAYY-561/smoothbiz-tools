
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, Calendar, User } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
    fetchData();
  }, []);

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
      navigate("/");
      return;
    }

    setIsAdmin(true);
  };

  const fetchData = async () => {
    try {
      const [messagesResponse, blogPostsResponse] = await Promise.all([
        supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (messagesResponse.error) throw messagesResponse.error;
      if (blogPostsResponse.error) throw blogPostsResponse.error;

      setMessages(messagesResponse.data || []);
      setBlogPosts(blogPostsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "The blog post has been deleted successfully.",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Could not delete the blog post.",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin || loading) {
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="messages" className="space-y-6">
            <TabsList>
              <TabsTrigger value="messages">Contact Messages</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Contact Messages</h2>
                <div className="space-y-6">
                  {messages.map((message: any) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{message.name}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {message.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {message.phone}
                        </div>
                        {message.company && (
                          <div className="text-gray-600">
                            Company: {message.company}
                          </div>
                        )}
                        <p className="text-gray-700 mt-2">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="blog">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Blog Posts</h2>
                  <button
                    onClick={() => navigate("/admin/blog/new")}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    New Post
                  </button>
                </div>
                <div className="space-y-6">
                  {blogPosts.map((post: any) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                            className="text-primary hover:text-primary-hover"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Delete
                          </button>
                          <span className="text-sm text-gray-500">
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        Last updated: {new Date(post.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;
