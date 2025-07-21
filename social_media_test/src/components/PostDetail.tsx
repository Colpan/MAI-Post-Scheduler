import React from 'react';
import type { Post } from '../types/posts';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-800 rounded-lg transition-colors"
      >
        Back to Posts
      </button>
      
      <article className="bg-white border border-gray-200 rounded-lg p-6 text-gray-800">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div>
            <p>Scheduled: {formatDate(post.scheduled_date)}</p>
          </div>
        </header>
        
        <div>
          <p className="text-gray-600">
            {post.post_text}
          </p>
        </div>
      </article>
    </div>
  );
};
