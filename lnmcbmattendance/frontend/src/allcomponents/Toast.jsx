// Toast.js
import React from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 right-0 p-4">
      <div className="bg-blue-500 text-white p-2 rounded mb-2">
        {message}
        <button onClick={onClose} className="ml-2 text-white underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default Toast;
