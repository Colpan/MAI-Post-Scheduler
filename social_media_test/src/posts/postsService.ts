import axios from 'axios';
import type { Post } from './posts';

const API_BASE_URL = 'http://localhost:3000';

export const postsService = {
  getAllPosts: async (): Promise<Post[]> => {
    try {
      const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  getPostById: async (id: number): Promise<Post> => {
    try {
      const response = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  createPost: async (post: Omit<Post,'id'>): Promise<Post> => {
    try {
      const response = await axios.post<Post>(`${API_BASE_URL}/posts`, {post: post});
      return response.data;
    } catch (error) {
      console.error('Error create post:', error);
      throw error;
    }
  },

  updatePost: async (post: Post): Promise<Post> => {
    try {
      const response = await axios.patch<Post>(`${API_BASE_URL}/posts/${post.id}`, {post: post});
      return response.data;
    } catch (error) {
      console.error('Error update post:', error);
      throw error;
    }
  },

  rewriteContent: async (id: number): Promise<Post> => {
    try {
      const response = await axios.patch<Post>(`${API_BASE_URL}/posts/${id}/rewrite`);
      return response.data;
    } catch (error) {
      console.error('Error rewrite post:', error);
      throw error;
    }
  }
};
