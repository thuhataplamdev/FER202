import React from "react";

export default function Welcome({ name }) {
  return (
    <div className="p-3 bg-light mb-4">
      <h2>Welcome, {name}!</h2>
    </div>
  );
}
