import { useEffect, useState } from "react";
import CalendarDisplay from "../submit/CalendarDisplay";
import Chart from "./FreqByDates";
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

const calculateDetailVoters = (votingAgenda) => {
  const detailVoters = votingAgenda.votersName.map((voterName) => {
    return { name: voterName, votes: [] };
  });
  for (let votingResult of votingAgenda.votingResults) {
    for (let key in votingResult.result) {
      //looping through result obj
      if (votingResult.result[key]) {
        votingResult.result[key].foreach((voter) => {
          if (votingAgenda.votersName.includes(voter.name)) {
          }
        });
      }
    }
  }
};
const DetailVoters = ({ flashMessage, setFlashMessage, votingAgenda }) => {
  const { voteId } = useParams();
  const navigate = useNavigate();

  return;
};
export default DetailVoters;
