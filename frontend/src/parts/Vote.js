import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
import { useParams } from "react-router-dom";
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
const Vote = async ({ flashMessage, setFlashMessage }) => {
  const [votingAgenda, setVotingAgenda] = useState();
  const { voteId } = useParams();
  try {
    const response = await api.get(`/api/vote/${voteId}`);
    console.log("response:::", response);
    setVotingAgenda(response.data.votingAgenda);
  } catch (error) {
    setFlashMessage({
      message: error.response.data,
      flash: "error",
    });
  }
  return (
    <>
      <CalendarDisplay
        flashMessage={flashMessage}
        setFlashMessage={setFlashMessage}
        votingAgenda={votingAgenda}
      />
      <CalendarSelect
        flashMessage={flashMessage}
        setFlashMessage={setFlashMessage}
      />
    </>
  );
};

export default Vote;
