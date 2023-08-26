import { React, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
const NewVote = ({ flashMessage, setFlashMessage }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [allowMultipleDateVotes, setAllowMultipleDateVotes] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dates = selectedDates.map((date) => {
        return date.format("DD-MM-YYYY");
      });
      if (dates.length < 2) {
        setFlashMessage({
          message: "You need to select at least two dates to create a vote.",
          flash: "error",
        });
        return null;
      }
      // months and years are needed in db schema (later needed to display custom calendar), and tools to get it are within DatePicker packeage, so better to convert it here (client side)
      const monthsWithYear = removeDuplicates(
        selectedDates.map((date) => {
          return date.format("MM-YYYY");
        })
      );
      const response = await api.post("/api/createVoting", {
        title,
        notes,
        dates,
        monthsWithYear,
        allowMultipleDateVotes,
      });
      if (response.data) {
        setFlashMessage(response.data);
      }
      if (response.data.flash === "success") {
        navigate(`/vote/${response.data.redirectData}`);
      }
    } catch (error) {
      console.log(error);
      setFlashMessage({
        message: error.response.data.message,
        flash: "error",
      });
    }
  };
  function handleChange(selectedDates) {
    setSelectedDates(selectedDates);
  }
  //   useEffect(() => {
  //     console.log(selectedDates);
  //   }, [selectedDates]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3 d-flex flex-column col-md-6 offset-md-3">
        <h5 className="fw-bold text-center mb-3 color-VoteSchedule">
          Create a Voting
        </h5>
        <div className="mb-3">
          <label htmlFor="title" className="form-label mb-1 text-muted">
            Voting title
          </label>
          <input
            type="text"
            className="form-control "
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </div>

        <DatePicker
          multiple
          sort
          render={<CustomMultipleInput />}
          plugins={[<DatePanel sort="date" header="Selected" />]}
          value={selectedDates}
          onChange={handleChange}
          className="rmdp-mobile"
          format="DD-MM-YYYY"
          placeholder="Select Dates"
          mapDays={({ date }) => {
            let props = {};
            let isWeekend = [0, 6].includes(date.weekDay.index);

            if (isWeekend) props.className = "highlight highlight-red";

            return props;
          }}
        />
        <div className="mb-3">
          <label
            htmlFor="allowMultipleVote"
            className="form-label mb-1 text-muted"
          >
            Allow multiple date votes
          </label>
          <select
            onChange={(e) => setAllowMultipleDateVotes(e.target.value)}
            className="form-select"
            id="allowMultipleVote"
            defaultValue={allowMultipleDateVotes}
          >
            <option value={true}>Allow</option>
            <option value={false}>Don't allow</option>
          </select>
        </div>
        <div className="form-floating my-3">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            onChange={(e) => setNotes(e.target.value)}
            style={{ height: "100px" }}
          ></textarea>
          <label className="text-muted" htmlFor="floatingTextarea2">
            Notes (Optional)
          </label>
        </div>
        <button className="btn btn-success btnNewCustom my-3">
          Generate link to vote
        </button>
      </div>
    </form>
  );
};
function CustomMultipleInput({ onFocus, value }) {
  return (
    <div className="mb-3">
      <label htmlFor="datePicker" className="form-label mb-1 text-muted">
        Select dates for voting
      </label>
      <input
        id="datePicker"
        className="form-control"
        onFocus={onFocus}
        value={value}
        readOnly
      />
    </div>
  );
}
export default NewVote;
