import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
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
const Vote = ({ flashMessage, setFlashMessage }) => {
  const [votingAgenda, setVotingAgenda] = useState();
  const { voteId } = useParams();
  const navigate = useNavigate();
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
  if (votingAgenda) {
    return (
      <>
        <h5 className="fw-bold text-center mb-3 color-VoteSchedule">
          {votingAgenda.title}
        </h5>
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
