import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full min-h-screen text-center text-gray-800">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-white px-6 py-3 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};
