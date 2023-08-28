import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the current origin in production
    : "http://localhost:3100"; // Use localhost in development
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // to include credentials (session cookie)
  headers: { "Content-Type": "application/json" },
});
const Vote = ({
  flashMessage,
  setFlashMessage,
  currentUser,
  setCurrentUser,
}) => {
  const [votingAgenda, setVotingAgenda] = useState();
  const { voteId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const getVotingAgenda = async () => {
    try {
      const response = await api.get(`/api/vote/${voteId}`);
      setVotingAgenda(response.data.votingAgenda);
    } catch (error) {
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
      navigate("/");
    }
  };
  useEffect(() => {
    getVotingAgenda();
  }, []);
  const manageVoteButton = () => {
    if (currentUser) {
      if (votingAgenda.author === currentUser._id) {
        const currentPath =
          location.pathname.slice(-1) == "/"
            ? `${location.pathname}manage`
            : `${location.pathname}/manage`;
        return (
          <Link to={`${currentPath}`} className="">
            <button className="btn btn-sm btn-VoteSchedule mb-2  w-100">
              Manage result
            </button>
          </Link>
        );
      }
    }
  };
  if (votingAgenda) {
    return (
      <>
        <div className="d-flex flex-column col-md-6 offset-md-3">
          <h5 className="fw-bold text-center mb-3 color-VoteSchedule">
            {votingAgenda.title}
          </h5>
          {manageVoteButton()}
        </div>
        <CalendarDisplay
          flashMessage={flashMessage}
          setFlashMessage={setFlashMessage}
          votingAgenda={votingAgenda}
        />
        <CalendarSelect
          flashMessage={flashMessage}
          setFlashMessage={setFlashMessage}
          votingAgenda={votingAgenda}
        />
      </>
    );
  } else {
    <div>Loading...</div>;
  }
};

export default Vote;
