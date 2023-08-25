import { React, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/layouts/mobile.css";
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
function CalendarSelect({ flashMessage, setFlashMessage, votingAgenda }) {
  console.log(votingAgenda);
  const [selectedDates, setSelectedDates] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(`/api${location.pathname}`);
      console.log(response);
    } catch (error) {
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
      navigate(`${location.pathname}`);
    }
  };
  const handleChange = (selectedDates) => {
    setSelectedDates(selectedDates);
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="my-3 d-flex flex-column col-md-6 offset-md-3"
    >
      <div>
        <div className="input-group input-group my-2">
          <span
            className="input-group-text text-muted"
            id="inputGroup-sizing-sm"
          >
            Your Name
          </span>
          <input
            type="text"
            className="form-control fw-bold text-success"
            required
          ></input>
        </div>
      </div>

      <DatePicker
        multiple={votingAgenda.allowMultipleDateVotes}
        render={<CustomMultipleInput />}
        plugins={[<DatePanel sort="date" header="Selected" />]}
        value={selectedDates}
        onChange={handleChange}
        className="rmdp-mobile "
        format="DD/MM/YYYY"
        placeholder="Select Dates"
        mapDays={({ date }) => {
          console.log(date);
          let props = {};
          let isWeekend = [0, 6].includes(date.weekDay.index);
          let isVoteAble = !votingAgenda.dates.includes(
            date.format("DD-MM-YYYY")
          );
          if (isWeekend) props.className = "highlight highlight-red";
          if (isVoteAble)
            return {
              disabled: true,
              style: { color: "#ccc" },
              onClick: () =>
                setFlashMessage({
                  message: "Selected day is not votable",
                  flash: "error",
                }),
            };
          return props;
        }}
      />
      <div className="mb-1">
        <div className="text-muted">
          Allowed multiple date votes :{" "}
          {votingAgenda.allowMultipleDateVotes ? (
            <span className="text-success">yes</span>
          ) : (
            <span className="text-danger">no</span>
          )}
        </div>
        <div>{votingAgenda.notes}</div>
      </div>
      <button className="btn  btn-VoteSchedule ms-1 my-2 text-center">
        Vote
      </button>
    </form>
  );
}
function CustomMultipleInput({ onFocus, value }) {
  return (
    <div class="input-group mb-1">
      <span class="input-group-text text-muted" id="basic-addon1">
        Your Vote
      </span>
      <input
        id="datePicker"
        type="text"
        class="form-control"
        onFocus={onFocus}
        value={value}
        placeholder="Click Here!"
        readOnly
      />
    </div>
  );
}
export default CalendarSelect;
