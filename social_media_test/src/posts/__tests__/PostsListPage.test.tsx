import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PostsListPage } from '../PostsListPage';
import { postsService } from '../postsService';
import { mockPosts } from '../../test/mocks';

// Mock the postsService
vi.mock('../../services/postsService');
const mockPostsService = vi.mocked(postsService);

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PostsListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all of the posts', async () => {
    mockPostsService.getAllPosts.mockResolvedValueOnce(mockPosts);
    renderWithRouter(<PostsListPage />);
    
    await waitFor(() => {
      expect(screen.getByText('First Test Post')).toBeInTheDocument();
      expect(screen.getByText('Second Test Post')).toBeInTheDocument();
      expect(screen.getByText('Third Test Post')).toBeInTheDocument();
    });
  });

  it('navigates to post detail when post is clicked', async () => {
    mockPostsService.getAllPosts.mockResolvedValueOnce(mockPosts);
    renderWithRouter(<PostsListPage />);
    
    await waitFor(() => {
      expect(screen.getByText('First Test Post')).toBeInTheDocument();
    });
    
    const firstPost = screen.getByText('First Test Post').closest('div');
    if (firstPost) {
      fireEvent.click(firstPost);
      expect(mockNavigate).toHaveBeenCalledWith('/posts/1');
    }
  });

  it('displays error message when API call fails', async () => {
    mockPostsService.getAllPosts.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter(<PostsListPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load posts/)).toBeInTheDocument();
    });
  });

  it('retries fetching when try again button is clicked', async () => {
    mockPostsService.getAllPosts.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter(<PostsListPage />);
    await waitFor(() => {
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
    
    mockPostsService.getAllPosts.mockResolvedValueOnce(mockPosts);

    act(() => {
      fireEvent.click(screen.getByText('Try Again'));
    });

    expect(mockPostsService.getAllPosts).toHaveBeenCalledTimes(2);
  });
});
