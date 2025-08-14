import React from "react";

export default function NameList({ names }) {
  return (
    <div className="p-3 mb-4">
      <h3>Name List</h3>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
