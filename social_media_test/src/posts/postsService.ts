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
  }
};
