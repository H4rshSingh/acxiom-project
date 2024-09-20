"use client";
import { useEffect, useState } from 'react';

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the user from the state after successful deletion
        setUsers(users.filter((user) => user._id !== userId));
        setMessage(data.message);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Users</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {users.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
