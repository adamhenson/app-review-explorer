import Link from 'next/link';

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <div className='container py-12'>
      <div className='max-w-lg mx-auto text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
        <h2 className='text-xl font-semibold text-gray-700 mb-6'>Page Not Found</h2>
        <p className='text-gray-600 mb-8'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
        >
          ← Back to Reviews
        </Link>
      </div>
    </div>
  );
}
