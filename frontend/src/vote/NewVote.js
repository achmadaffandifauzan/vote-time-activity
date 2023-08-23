import { React, useEffect, useRef } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/layouts/mobile.css";
import opacity from "react-element-popper/animations/opacity";

const NewVote = ({ flashMessage, setFlashMessage }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`tes`);
  };
  function handleChange(selectedDates) {
    //your modification on passed selectedDates ....
    setSelectedDates(selectedDates);
  }
  //   useEffect(() => {
  //     console.log(selectedDates);
  //   }, [selectedDates]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3 d-flex flex-column col-md-6 offset-md-3">
        <div className="mb-3">
          <label for="title" className="form-label mb-1 text-muted">
            Voting title
          </label>
          <input type="text" className="form-control " id="title"></input>
        </div>

        <DatePicker
          multiple
          render={<CustomMultipleInput />}
          plugins={[<DatePanel sort="date" header="Selected" />]}
          value={selectedDates}
          onChange={handleChange}
          className="rmdp-mobile"
          format="DD/MM/YYYY"
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
          <select class="form-select" id="allowMultipleVote">
            <option value="yes">Allow</option>
            <option value="no" selected>
              Don't allow
            </option>
          </select>
        </div>
      </div>
    </form>
  );
};
function CustomMultipleInput({ onFocus, value }) {
  return (
    <div class="mb-3">
      <label for="datePicker" className="form-label mb-1 text-muted">
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
