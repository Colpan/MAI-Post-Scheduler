import type React from 'react';
import type { Post } from './posts';
import { postsService } from './postsService';

interface PostFormProperties {
  post: Post | null;
}

export const PostForm: React.FC<PostFormProperties> = ({post}) => {

  const formatDate = (dateString: string) => {
    console.log('Formatting date:', dateString);
    const date = new Date(dateString);
    return (date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}) + 'T' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})).slice(0, 16);
  };

  const formatSubmissionDate = (dateString: string) => {
    return new Date(dateString).toUTCString();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);

    const newPost: Post = {
      id: post ? post.id : undefined,
      title: formData.get('post[title]') as string,
      post_text: formData.get('post[post_text]') as string,
      scheduled_date: formatSubmissionDate(formData.get('post[scheduled_date]') as string)
    }

    if (post) {
      postsService.updatePost(newPost);
    } else {
      postsService.createPost(newPost);
    }
  }

  const handleRewrite = () => {
    if (post && post.id) {
      postsService.rewriteContent(post.id);
    }
  }

  return (
    <div className="mb-4">
      <h1 className="text-gray-800">{post ? 'Edit Post' : 'Create Post'}</h1>

      <form onSubmit={handleSubmit} className="text-gray-800 px-5 py-5">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={post ? post.title : ''}
            className="w-full border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">Post Content</label>
          <textarea
            id="content"
            name="post_text"
            value={post ? post.post_text : ''}
            className="w-full border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="scheduled_date" className="block mb-2">Scheduled Date</label>
          <input
            id="scheduled_date"
            type="datetime-local"
            value={post ? formatDate(post.scheduled_date) : ''}
            className="w-full border"
          />
        </div>

        <button type="submit" className="text-white mr-4">Save Post</button>
        <button type="button" onClick={handleRewrite} className="text-white">Rewrite with AI</button>
      </form>
    </div>
  );
}