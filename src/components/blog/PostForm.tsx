
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

type BlogPost = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string | null;
  status: 'draft' | 'published';
  author_id?: string;
};

type PostFormProps = {
  post: BlogPost;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSave: () => void;
  isSaving: boolean;
};

const PostForm = ({ post, onChange, onSave, isSaving }: PostFormProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? "Saving..." : "Save Post"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;
