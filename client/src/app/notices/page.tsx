'use client';
import { useEffect, useState } from 'react';

interface Notice {
  _id: string;
  title: string;
  documentUrl: string;
}

const PAGE_SIZE = 10;

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/pdf")
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(notices.length / PAGE_SIZE);
  const paginated = notices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">All Notices & Announcements</h1>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : paginated.length === 0 ? (
        <div className="text-gray-500">No notices found.</div>
      ) : (
        <ul className="divide-y divide-blue-100 bg-white rounded shadow">
          {paginated.map(notice => (
            <li key={notice._id} className="py-4 px-2">
              <a
                href={notice.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium text-lg"
              >
                {notice.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-semibold text-blue-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 