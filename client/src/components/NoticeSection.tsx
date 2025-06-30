"use client";
import { useEffect, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  description: string;
  documentUrl: string;
  postedBy: string;
  createdAt: string;
}

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pdf/")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      });
  }, []);

  // Animation duration: 4s per notice, at least 8s
  const duration = Math.max((notices.length || 2) * 4, 8);

  return (
    <section className="relative bg-white border-t border-b border-blue-100 py-6 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Latest Notices</h2>
        <div className="relative h-80 overflow-hidden">
          <div
            className="flex flex-col animate-vertical-loop space-y-6"
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {loading ? (
              <div className="text-gray-500">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="text-gray-500">No notices available.</div>
            ) : (
              // Duplicate the notices for seamless looping
              [...notices, ...notices].map((notice, idx) => (
                <div key={notice._id + '-' + idx} className="flex items-center justify-between bg-blue-50 rounded px-4 py-2 shadow-sm">
                  <div>
                    <div className="font-semibold text-blue-900">{notice.title}</div>
                    <div className="text-xs text-blue-700">{new Date(notice.createdAt).toLocaleString()} by {notice.postedBy}</div>
                  </div>
                  <a
                    href={notice.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                  >
                    View PDF
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes vertical-loop {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-loop {
          animation-name: vertical-loop;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
} 