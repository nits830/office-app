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
    fetch("http://localhost:5000/api/pdf")
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
        <h2 className="text-xl font-bold text-blue-700 mb-4">Latest Notices & Announcements</h2>
        <div className="relative h-80 overflow-hidden">
          <div
            className="flex flex-col animate-vertical-loop divide-y divide-blue-100"
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {loading ? (
              <div className="text-gray-500">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="text-gray-500">No notices available.</div>
            ) : (
              [...notices, ...notices].map((notice, idx) => (
                <a
                  key={notice._id + '-' + idx}
                  href={notice.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-blue-700 hover:text-blue-900 font-semibold text-lg bg-blue-50 hover:bg-blue-100 transition"
                >
                  {notice.title}
                </a>
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