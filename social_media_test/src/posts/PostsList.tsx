import React from 'react';
import type { Post } from './posts';

interface PostsListProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
}

export const PostsList: React.FC<PostsListProps> = ({ posts, onPostClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No posts available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-gray-800">
      <h2 className="text-2xl mb-6">Social Media Posts</h2>
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <div
            key={post.id || index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => post.id && onPostClick(post.id)}
          >
            <div className="flex items-center mb-2">
              {post.photos?.map((photo, _) => (
                <img
                  src={photo.photo_url}
                  alt={photo.caption}
                  className="h-auto mx-2 max-w-3xs"
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="mb-3">{post.post_text}</p>
            <div className="text-sm text-gray-500">
              <p>Scheduled: {formatDate(post.scheduled_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
