import React from "react";

const Flash = ({ message }) => {
  return (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      {message}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Flash;
