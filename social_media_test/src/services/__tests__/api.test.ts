import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { postsService } from '../api';
import { mockPosts, mockPost } from '../../test/mocks';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

const axiosGet = vi.mocked(axios.get);

describe('postsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should fetch all posts successfully', async () => {
      axiosGet.mockResolvedValueOnce({ data: mockPosts });

      await postsService.getAllPosts();

      expect(axiosGet).toHaveBeenCalledWith('http://localhost:3000/posts');
    });
  });

  describe('getPostById', () => {
    it('should fetch a single post by id successfully', async () => {
      axiosGet.mockResolvedValueOnce({ data: mockPost });

      await postsService.getPostById(1);

      expect(axiosGet).toHaveBeenCalledWith('http://localhost:3000/posts/1');
    });
  });
});
