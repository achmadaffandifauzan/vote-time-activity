import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
const OwnedVote = ({
  flashMessage,
  setFlashMessage,
  currentUser,
  setCurrentUser,
}) => {
  const [votingAgendas, setVotingAgendas] = useState([]);
  const navigate = useNavigate();
  const getVotingAgendas = async () => {
    if (!currentUser) return null; // if currentUser not yet received, then this function retry another time
    try {
      const response = await api.get("/api/users/vote");
      if (!response.data.votingAgendas) {
        setFlashMessage({
          message: "You haven't created voting agenda.",
          flash: "error",
        });
      }
      console.log(response.data.votingAgendas);
      setVotingAgendas(response.data.votingAgendas);
    } catch (error) {
      if (error.response.data) {
        setFlashMessage(error.response.data);
      }
    }
  };
  useEffect(() => {
    getVotingAgendas();
  }, [currentUser]);
  if (votingAgendas) {
    return (
      <div className="d-flex flex-column col-md-6 offset-md-3">
        {votingAgendas.map((votingAgenda) => {
          return (
            <div key={votingAgenda._id} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center blueVoteScheduleBg-gradient text-white">
                <div>{votingAgenda.title}</div>
                <Link
                  to={`/vote/${votingAgenda._id}/manage`}
                  className="btn btn-sm btn-VoteSchedule box-shadow-19 text-light"
                  style={{ maxHeight: "30px" }}
                >
                  View
                </Link>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column justify-between">
                  <div className="card-text">
                    Total votes : {votingAgenda.totalVote}
                  </div>
                  <div className="card-text text-muted">
                    Notes : {votingAgenda.notes}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default OwnedVote;
