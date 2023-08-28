import { useEffect, useState } from "react";
import CalendarDisplay from "../submit/CalendarDisplay";
import Chart from "./Chart";
import { useParams, useNavigate } from "react-router-dom";
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
const ManageVote = ({
  flashMessage,
  setFlashMessage,
  currentUser,
  setCurrentUser,
}) => {
  const [votingAgenda, setVotingAgenda] = useState();
  const { voteId } = useParams();
  const navigate = useNavigate();
  const getVotingAgenda = async () => {
    if (!currentUser) return null; // if currentUser not yet received, then this function retry another time
    try {
      const response = await api.get(`/api/vote/${voteId}`);
      if (currentUser._id !== response.data.votingAgenda.author) {
        setFlashMessage({
          message: "You're not authorized",
          flash: "error",
        });
        return navigate("/");
      }
      setVotingAgenda(response.data.votingAgenda);
    } catch (error) {
      console.log(error);
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
      navigate("/");
    }
  };
  useEffect(() => {
    getVotingAgenda();
  }, [currentUser]);
  if (votingAgenda && currentUser) {
    return (
      <>
        <div className="text-center  fw-bold">
          <span className=" color-VoteSchedule">Voting result of</span>{" "}
          <span>{votingAgenda.title}</span>
        </div>
        <button
          className="btn btn-VoteSchedule col-md-6 offset-md-3 my-3"
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.replace("/manage", "")
            );
            setFlashMessage({
              message: "The link has been copied successfully.",
              flash: "success",
            });
          }}
        >
          Get Vote Link
        </button>
        <CalendarDisplay
          flashMessage={flashMessage}
          setFlashMessage={setFlashMessage}
          votingAgenda={votingAgenda}
        />
        <Chart
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

export default ManageVote;
