import React from "react";

export default function UserProfile({ user }) {
  return (
    <div className="p-3 rounded mb-4">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
}
