import React from "react";

export default function userLogin() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-teal-300 p-6 rounded-lg shadow-md max-w-md">
          <h1 className="text-3xl font-medium mb-6 text-gray-800">Login</h1>

          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>

              <input
                className="border p-2 w-full rounded-lg"
                type="text"
                id="username"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="border p-2 w-full rounded-lg"
                type="password"
                id="password"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
