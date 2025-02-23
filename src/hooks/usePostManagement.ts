
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type BlogPost = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string | null;
  status: 'draft' | 'published';
  author_id?: string;
};

export const usePostManagement = (postId?: string) => {
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

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return false;
    }

    const { data, error } = await supabase.rpc('has_role', {
      user_id: session.user.id,
      role: 'admin'
    });

    if (error || !data) {
      console.error('Error checking admin role:', error);
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/admin");
      return false;
    }
    return true;
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
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
      if (!session?.user) {
        throw new Error("Not authenticated");
      }

      const isAdmin = await checkAdminAccess();
      if (!isAdmin) {
        throw new Error("Not authorized");
      }

      // Ensure all required fields are present
      if (!post.title || !post.excerpt || !post.content) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image_url: post.image_url,
        status: post.status,
        author_id: session.user.id,
      };

      console.log('Saving post with data:', postData);

      const { data, error } = postId
        ? await supabase
            .from('blog_posts')
            .update(postData)
            .eq('id', postId)
            .select()
        : await supabase
            .from('blog_posts')
            .insert([postData])
            .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Save response:', data);

      toast({
        title: "Success",
        description: postId ? "Post updated successfully" : "Post created successfully",
      });

      navigate("/admin");
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error.message || "Could not save the blog post.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const isAdmin = await checkAdminAccess();
      if (isAdmin && postId) {
        await fetchPost();
      } else if (isAdmin) {
        setIsLoading(false);
      }
    };
    init();
  }, [postId]);

  return {
    post,
    isLoading,
    isSaving,
    handleChange,
    handleSave
  };
};
