import React from "react";

const ERROR = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold text-red-600 animate-bounce">
          AN ERROR OCCURRED: {error}
        </h1>
      </div>
    </div>
  );
};

export default ERROR;
