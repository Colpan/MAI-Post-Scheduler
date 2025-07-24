import type { Post } from '../photos/posts';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'First Test Post',
    post_text: 'This is the content of the first test post. It should be displayed properly in the list.',
    scheduled_date: '2025-01-15T10:30:00.000Z',
    photos: [
      {
        caption: 'First photo caption',
        photo_url: 'https://example.com/home1.jpg'
      },
      {
        caption: 'Second photo caption',
        photo_url: 'https://example.com/home2.jpg'
      }
    ]
  },
  {
    id: 2,
    title: 'Second Test Post',
    post_text: 'This is the content of the second test post with some different content to test various scenarios. Unique content is great!',
    scheduled_date: '2025-07-21T14:45:00.000Z',
    photos: []
  },
  {
    id: 3,
    title: 'Third Test Post',
    post_text: 'This is a longer post content that should test the line clamping functionality and make sure the UI handles longer text content properly. We will put some random content in here that will help to pad out the length longer than a normal post would be.',
    scheduled_date: '2025-07-27T09:15:00.000Z',
    photos: [
      {
        photo_url: 'https://example.com/home3.jpg'
      }
    ]
  }
];

export const mockPost: Post = mockPosts[0];
