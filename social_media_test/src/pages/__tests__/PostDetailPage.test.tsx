import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PostDetailPage } from '../PostDetailPage';
import { postsService } from '../../services/postsService';
import { mockPost } from '../../test/mocks';

// Mock the postsService
vi.mock('../../services/postsService');
const mockPostsService = vi.mocked(postsService);

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PostDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
  });

  it('renders post details', async () => {
    mockPostsService.getPostById.mockResolvedValueOnce(mockPost);
    renderWithRouter(<PostDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByText('First Test Post')).toBeInTheDocument();
      expect(screen.getByText('This is the content of the first test post. It should be displayed properly in the list.')).toBeInTheDocument();
      expect(screen.getByText('Back to Posts')).toBeInTheDocument();
    });
  });

  it('navigates back when back button is clicked', async () => {
    mockPostsService.getPostById.mockResolvedValueOnce(mockPost);
    renderWithRouter(<PostDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Back to Posts')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText('Back to Posts'));
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls API with correct post id', () => {
    mockUseParams.mockReturnValue({ id: '123' });
    mockPostsService.getPostById.mockImplementation(() => new Promise(() => {}));
    renderWithRouter(<PostDetailPage />);
    
    expect(mockPostsService.getPostById).toHaveBeenCalledWith(123);
  });
});
