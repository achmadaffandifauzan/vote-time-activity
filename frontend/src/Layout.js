import { React, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Flash from "./components/Flash";

const Layout = ({ children, flashMessage, setFlashMessage }) => {
  return (
    <div className="mainPage">
      <Navbar flashMessage={flashMessage} setFlashMessage={setFlashMessage} />
      <div className="container-xxl">
        {flashMessage ? (
          <Flash
            message={flashMessage}
            deleteFlashState={() => setFlashMessage()}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Layout;
