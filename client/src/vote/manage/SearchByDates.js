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

const SearchByDates = ({ flashMessage, setFlashMessage, votingAgenda }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchByDatesData, setSearchByDatesData] = useState([]);
  const getNamesByDates = async (items) => {
    // console.log(items);
    try {
      const dates = items.map((item) => {
        return item.value;
      });
      setSelectedOption(dates);
      const response = await api.post("/api/vote/:id/searchByDates", {
        dates: dates,
        votingAgenda: votingAgenda._id,
      });
      if (response.data) {
        // console.log(response.data.users);
        setSearchByDatesData(response.data.users);
      }
    } catch (error) {
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
    }
  };
  const options = votingAgenda.dates.map((date) => {
    return {
      value: date,
      label: date,
    };
  });
  return (
    <div className="border border-2 border-light-subtle rounded-3 p-3">
      <div className="text-muted text-center mb-2">Search by dates</div>
      <Select
        defaultValue={selectedOption}
        onChange={getNamesByDates}
        options={options}
        isMulti
        className="mb-3 "
      />
      <div className=" text-center mb-2">
        People who voted on{" "}
        {selectedOption.map((date, i) => {
          if (i !== 0) {
            return (
              <span>
                {" "}
                & <span className="fw-bold color-VoteSchedule"> {date}</span>
              </span>
            );
          } else {
            return <span className="fw-bold color-VoteSchedule">{date}</span>;
          }
        })}
      </div>
      <table
        id="tableGetVotersByName"
        className="table text-center align-middle rounded-1 overflow-hidden"
      >
        <thead className="table-success align-middle ">
          <tr>
            <th scope="col" style={{ width: "35%" }}>
              Name
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
          {searchByDatesData.map((byDates) => {
            return (
              <tr key={`${byDates._id}`} className="table-light">
                <th scope="row">{byDates._id}</th>
                <td>
                  {new Date(byDates.createdAt).toString().split("GMT")[0]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchByDates;
