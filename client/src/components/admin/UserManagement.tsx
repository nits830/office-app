"use client";
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const startEdit = (user: User) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditEmail('');
  };

  const saveEdit = async (id: number) => {
    setSaving(true);
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    if (res.ok) {
      setUsers(users.map(u => (u.id === id ? { ...u, name: editName, email: editEmail } : u)));
      cancelEdit();
    }
    setSaving(false);
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      {loading ? (
        <div className="text-gray-500">Loading users...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">
                  {editId === user.id ? (
                    <input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="border px-2 py-1 rounded"
                      disabled={saving}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="py-2 px-4">
                  {editId === user.id ? (
                    <input
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="border px-2 py-1 rounded"
                      disabled={saving}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {editId === user.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(user.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={saving}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 