import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Landing = ({ flashMessage, setFlashMessage }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/") {
      document.querySelector(".mainPage").classList.add("landing-page");
      document.querySelector("#nav").classList.add("no-border");
    }
    return () => {
      document.querySelector(".mainPage").classList.remove("landing-page");
      document.querySelector("#nav").classList.remove("no-border");
    };
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div
        className=" mt-3 mb-4 text-white col-sm-8 fw-bold text-center"
        style={{ fontSize: "54px" }}
      >
        Get the ideal time for your activity!
      </div>
      <div className="fs-4 mt-3 mb-5 text-body text-white-50 text-center">
        Create, then share the vote link and let others vote the time for your
        activity.
      </div>
      <Link to={"/create"} className="text-center">
        <button className="btn btn-sm btn-success btn-VoteSchedule-purple mb-2 p-5 rounded-5">
          <span className="text-white fs-3">Create</span>
        </button>
      </Link>
    </div>
  );
};

export default Landing;
