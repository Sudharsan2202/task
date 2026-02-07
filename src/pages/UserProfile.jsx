function UserProfile({ user }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Welcome, {user.name}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </p>

          {user.age && (
            <p className="flex justify-between">
              <span className="font-semibold">Age:</span>
              <span>{user.age}</span>
            </p>
          )}

          {user.bio && (
            <div>
              <p className="font-semibold mb-1">Bio:</p>
              <p className="bg-gray-50 p-3 rounded-lg text-sm">
                {user.bio}
              </p>
            </div>
          )}
        </div>

        {/* Optional Logout Button */}
        <button
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          onClick={() => window.location.href = "/login"}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default UserProfile;
