import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Office App
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to the Association Management System
          </p>
          
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
            >
              Go to Dashboard
            </Link>
            
            <p className="text-sm text-gray-500">
              Cast your vote and view election results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
