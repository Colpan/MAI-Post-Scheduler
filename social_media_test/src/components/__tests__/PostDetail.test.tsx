import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostDetail } from '../PostDetail';
import { mockPost } from '../../test/mocks';

describe('PostDetail', () => {
  it('post has title and text', () => {
    const mockOnBack = vi.fn();
    render(<PostDetail post={mockPost} onBack={mockOnBack} />);
    
    expect(screen.getByText('First Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is the content of the first test post. It should be displayed properly in the list.')).toBeInTheDocument();
    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(2);
    expect(image[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(image[1]).toHaveAttribute('src', 'https://example.com/photo2.jpg');
  });
});
