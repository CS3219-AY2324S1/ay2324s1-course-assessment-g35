import React from "react";

const usersData = [
  { id: 1, username: "John", role: "Admin" },
  { id: 2, username: "Jane", role: "User" },
  { id: 3, username: "Mike", role: "User" },
  // Add more user data as needed
];

export default function Users() {
  const handleEditUser = (userId: string) => {
    console.log(`Edit User with ID: ${userId}`);
    // Implement your edit user logic here
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Delete User with ID: ${userId}`);
    // Implement your delete user logic here
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-max divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 text-xs font-medium text-blue-600 hover:underline"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit User
                    </button>
                    <button
                      className="px-2 py-1 text-xs font-medium text-red-600 hover:underline"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
