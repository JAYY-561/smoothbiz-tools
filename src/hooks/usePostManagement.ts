
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
      if (!session?.user) throw new Error("Not authenticated");

      const postData = {
        ...post,
        author_id: session.user.id,
      };

      const { error } = postId
        ? await supabase
            .from('blog_posts')
            .update(postData)
            .eq('id', postId)
        : await supabase
            .from('blog_posts')
            .insert([postData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: postId ? "Post updated successfully" : "Post created successfully",
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

  useEffect(() => {
    checkAdminAccess();
    if (postId) {
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [postId]);

  return {
    post,
    isLoading,
    isSaving,
    handleChange,
    handleSave
  };
};
