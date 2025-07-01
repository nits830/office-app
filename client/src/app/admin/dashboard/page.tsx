'use client';
import { useState } from 'react';
import UserManagement from '@/components/admin/UserManagement';
import NoticeManagement from '@/components/admin/NoticeManagement';

const adminName = 'Admin'; // Replace with real admin name from context/auth if available

const TABS = [
  { label: 'User Management', key: 'users' },
  { label: 'Notice Management', key: 'notices' },
  { label: 'Create an Election', key: 'create-election' },
  { label: 'Election Results', key: 'results' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState(TABS[0].key);

  const handleLogout = () => {
    // TODO: Implement real logout logic
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-700">Admin Dashboard</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hello, {adminName}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="flex border-b border-blue-200 mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 -mb-px font-semibold text-blue-700 border-b-2 transition-all duration-150 ${
                tab === t.key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-transparent hover:bg-blue-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded shadow p-8 min-h-[300px]">
          {tab === 'users' && <UserManagement/>}
          {tab === 'notices' && <NoticeManagement />}
          {tab === 'create-election' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Create an Election</h2>
              <p className="text-gray-600">(Election creation form goes here.)</p>
            </div>
          )}
          {tab === 'results' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Election Results</h2>
              <p className="text-gray-600">(Election results view goes here.)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 