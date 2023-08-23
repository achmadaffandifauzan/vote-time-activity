import { React, useEffect, useRef } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function CalendarSelect() {
  const [selectedDate, setSelectedDate] = useState(); // single date, type : object
  const [selectedDateFormatted, setSelectedDateFormatted] = useState(""); // single date, type : string
  // times is for multiple date vote (not yet implemented)
  const [times, setTimes] = useState([]); // multiple dates, type : number

  function onChange(nextValue) {
    try {
      const selectedDateConverted = nextValue.getTime();
      setSelectedDate(nextValue);
      setSelectedDateFormatted(
        `${daysOfWeek[nextValue.getDay()]} , ${nextValue.getDate()} ${
          monthsOfYear[nextValue.getMonth()]
        } ${nextValue.getFullYear()}`
      );
      if (times.includes(selectedDateConverted)) {
        // if nextValue exist, then remove
        setTimes(times.filter((curr) => curr !== selectedDateConverted));
      } else {
        // if nextValue does not exist, then add
        setTimes([...times, selectedDateConverted]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   console.log(times);
  // }, [times]);
  // useEffect(() => {
  //   if (selectedDate) {
  //     console.log(selectedDate);
  //   }
  // }, [selectedDate]);
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`tes`);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <form action="" onSubmit={handleSubmit} className="my-3 d-flex flex-row">
        <div>
          <div className="input-group input-group-sm my-2">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Your Name
            </span>
            <input
              type="text"
              className="form-control fw-bold text-success"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              required
            ></input>
          </div>
          <div className="input-group input-group-sm my-2">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Your Vote
            </span>
            <input
              type="text"
              className="form-control fw-bold text-success"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={selectedDateFormatted}
              readOnly
              required
            ></input>
          </div>
        </div>
        <div className="d-flex ms-1 my-2">
          <button className="btn btn-success">Vote</button>
        </div>
      </form>
      <div className={"d-flex justify-content-center "}>
        <Calendar
          onChange={onChange}
          value={selectedDate}
          calendarType={"gregory"}
        />
      </div>
    </div>
  );
}

export default CalendarSelect;
