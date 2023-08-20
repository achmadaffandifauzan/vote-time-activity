import React from "react";
import "./Flash.css";
const Flash = (props) => {
  const { message, deleteFlashState } = props;
  console.log("from FLASH component.....", message);
  if (message.status === "error") {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {message.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={deleteFlashState}
        ></button>
      </div>
    );
  } else if (message.status === "success") {
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {message.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={deleteFlashState}
        ></button>
      </div>
    );
  }
};

export default Flash;
