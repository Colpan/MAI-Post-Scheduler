import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from './posts';
import { postsService } from './postsService';
import { PostsList } from './PostsList';

export const PostsListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      const fetchedPosts = await postsService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load posts. Please make sure the backend server is running.');
      console.error('Error fetching posts:', err);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchPosts}
          className="mt-2 px-4 py-2 bg-red-800 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <PostsList posts={posts} onPostClick={handlePostClick} />
    </div>
  );
};
