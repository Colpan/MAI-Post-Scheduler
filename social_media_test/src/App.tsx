import { Routes, Route } from 'react-router-dom';
import { PostsListPage } from './pages/PostsListPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PostsListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
