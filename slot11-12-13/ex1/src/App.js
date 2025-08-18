import React from 'react';
import ProfileForm from './components/ProfileForm';
function App() {

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-center">Exercise 1: ProfileForm</h2>
      <ProfileForm
        initialValues={{ name: "", email: "", age: "" }}
        onSubmit={(data) => console.log("Submitted:", data)}
      />
    </div>
  );
}

export default App;
