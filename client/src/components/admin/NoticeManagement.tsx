"use client";
import { useEffect, useRef, useState } from 'react';

interface Notice {
  _id: string;
  title: string;
  description: string;
  documentUrl: string;
  postedBy: string;
  createdAt: string;
}

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', postedBy: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/pdf')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file.');
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('postedBy', form.postedBy);
    const res = await fetch('http://localhost:5000/api/notices', {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      setForm({ title: '', description: '', postedBy: '' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchNotices();
      setAdding(false);
    } else {
      alert('Failed to add notice');
    }
  };

  const handleDelete = async (notice: Notice) => {
    if (!confirm('Delete this notice?')) return;
    const res = await fetch(`http://localhost:5000/api/notices/${notice._id}`, { method: 'DELETE' });
    if (res.ok) {
      setNotices(notices.filter(n => n._id !== notice._id));
    } else {
      alert('Failed to delete notice');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notice Management</h2>
      <div className="mb-6">
        {adding ? (
          <form onSubmit={handleAddNotice} className="bg-blue-50 p-4 rounded shadow flex flex-col gap-3 max-w-xl">
            <input
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              name="postedBy"
              value={form.postedBy}
              onChange={handleInputChange}
              placeholder="Posted By"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="border px-3 py-2 rounded"
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Add Notice'}
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setAdding(false)}
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
            onClick={() => setAdding(true)}
          >
            + Add Notice
          </button>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">All Notices</h3>
      {loading ? (
        <div className="text-gray-500">Loading notices...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Posted By</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">PDF</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice._id} className="border-b">
                <td className="py-2 px-4">{notice.title}</td>
                <td className="py-2 px-4">{notice.postedBy}</td>
                <td className="py-2 px-4">{new Date(notice.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <a
                    href={`http://localhost:5000${notice.documentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View PDF
                  </a>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(notice)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 