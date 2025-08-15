import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmitForm from "./components/SubmitForm";

const App = () => {
  const handleFormSubmit = (data) => {
    console.log("Dữ liệu hợp lệ:", data);
    alert("Form đã gửi thành công!");
  };

  return (
    <div className="App">
      <SubmitForm
        title="Form Đăng Ký"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default App;