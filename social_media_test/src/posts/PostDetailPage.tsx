import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Post } from './posts';
import { postsService } from './postsService';
import { PostDetail } from './PostDetail';

export const PostDetailPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id, 10));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      setError(null);
      const fetchedPost = await postsService.getPostById(postId);
      setPost(fetchedPost);
    } catch (err) {
      setError('Failed to load post details. The post might not exist.');
      console.error('Error fetching post:', err);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (error) {
    return (
      <div className="mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-gray-800 rounded-lg"
        >
          Back to Posts
        </button>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => id && fetchPost(parseInt(id, 10))}
            className="mt-2 px-4 py-2 bg-red-800 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-gray-800 rounded-lg"
        >
          Back to Posts
        </button>
        <p className="text-gray-600">Post not found.</p>
      </div>
    );
  }

  return <PostDetail post={post} onBack={handleBack} />;
};
