import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { postsService } from '../posts/postsService';
import { mockPosts, mockPost } from '../test/mocks';

// Mock the postsService
vi.mock('../posts/postsService');
const mockPostsService = vi.mocked(postsService);

const renderWithRouter = (component: React.ReactElement, initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders posts list on root route', async () => {
    mockPostsService.getAllPosts.mockResolvedValueOnce(mockPosts);
    
    renderWithRouter(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('First Test Post')).toBeInTheDocument();
      expect(screen.getByText('Second Test Post')).toBeInTheDocument();
      expect(screen.getByText('Third Test Post')).toBeInTheDocument();
    });
  });

  it('renders post detail', async () => {
    mockPostsService.getPostById.mockResolvedValueOnce(mockPost);
    
    renderWithRouter(<App />, ['/posts/1']);
    
    await waitFor(() => {
      expect(screen.getByText('First Test Post')).toBeInTheDocument();
      expect(screen.getByText('Back to Posts')).toBeInTheDocument();
    });
    
    expect(mockPostsService.getPostById).toHaveBeenCalledWith(1);
  });

  it('renders 404 page for invalid routes', () => {
    renderWithRouter(<App />, ['/invalid-route']);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
