import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
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

const SearchByNames = ({ flashMessage, setFlashMessage, votingAgenda }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchByNamesData, setSearchByNamesData] = useState([]);
  const getVoteByName = async (items) => {
    // console.log(items);
    try {
      const names = items.map((item) => {
        return item.value;
      });
      setSelectedOption(names);
      const response = await api.post("/api/vote/:id/searchByNames", {
        names: names,
        votingAgenda: votingAgenda._id,
      });
      if (response.data) {
        setSearchByNamesData(response.data.votes);
      }
    } catch (error) {
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
    }
  };
  const options = votingAgenda.votersName.map((name) => {
    return {
      value: name,
      label: name,
    };
  });
  return (
    <div className="border border-2 border-light-subtle rounded-3 p-3">
      <div className="text-muted text-center mb-2">Search by names</div>
      <Select
        defaultValue={selectedOption}
        onChange={getVoteByName}
        options={options}
        isMulti
        className="mb-3 "
      />
      <table
        id="tableGetVotersByName"
        className="table text-center align-middle rounded-1 overflow-hidden"
      >
        <thead className="table-primary align-middle ">
          <tr>
            <th scope="col" style={{ width: "35%" }}>
              Name
            </th>
            <th scope="col" style={{ width: "30%" }}>
              Vote
            </th>
            <th scope="col" style={{ width: "35%" }}>
              Submitted at (GMT{" "}
              {
                new Date()
                  .toString()
                  .split("GMT")[1]
                  .split("(")[0]
                  .split(" ")[0]
              }
              )
            </th>
          </tr>
        </thead>
        <tbody>
          {searchByNamesData.map((byName) => {
            return (
              <>
                {byName.map((byVote, i) => {
                  if (i === 0) {
                    return (
                      <tr key={`${byVote._id}_${i}`} className="table-light">
                        <th scope="row">{byVote.name}</th>
                        <td>{byVote.votedDate}</td>
                        <td>
                          {
                            new Date(byVote.createdAt)
                              .toString()
                              .split("GMT")[0]
                          }
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={`${byVote._id}_${i}`}>
                        <th scope="row"></th>
                        <td>{byVote.votedDate}</td>
                        <td>
                          {
                            new Date(byVote.createdAt)
                              .toString()
                              .split("GMT")[0]
                          }
                        </td>
                      </tr>
                    );
                  }
                })}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchByNames;
