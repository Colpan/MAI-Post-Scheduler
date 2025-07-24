import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostsList } from '../PostsList';
import { mockPosts } from '../../test/mocks';

describe('PostsList', () => {

  it('renders all of the posts', () => {
    const mockOnPostClick = vi.fn();
    render(<PostsList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('First Test Post')).toBeInTheDocument();
    expect(screen.getByText('Second Test Post')).toBeInTheDocument();
    expect(screen.getByText('Third Test Post')).toBeInTheDocument();
  });

  it('displays post text and images', () => {
    const mockOnPostClick = vi.fn();
    render(<PostsList posts={mockPosts} onPostClick={mockOnPostClick} />);

    expect(screen.getByText('This is the content of the first test post. It should be displayed properly in the list.')).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/home1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/home2.jpg');
    expect(images[2]).toHaveAttribute('src', 'https://example.com/home3.jpg');
  });

  it('calls onPostClick when a post is clicked', () => {
    const mockOnPostClick = vi.fn();
    render(<PostsList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    const firstPost = screen.getByText('First Test Post').closest('div');
    if (firstPost) {
      act(() => {
        fireEvent.click(firstPost);
      });
      expect(mockOnPostClick).toHaveBeenCalledWith(1);
    }
  });

  it('shows no posts message when no posts exist', () => {
    const mockOnPostClick = vi.fn();
    render(<PostsList posts={[]} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });
});
