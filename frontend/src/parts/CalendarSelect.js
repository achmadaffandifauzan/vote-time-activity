import { React, useEffect, useRef } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function CalendarSelect() {
  const [selectedDate, setSelectedDate] = useState(); // type : date
  const [times, setTimes] = useState([]); // type : number

  function onChange(nextValue) {
    try {
      const selectedDateConverted = nextValue.getTime();
      setSelectedDate(nextValue);
      if (times.includes(selectedDateConverted)) {
        setTimes(times.filter((curr) => curr !== selectedDateConverted));
      } else {
        setTimes([...times, selectedDateConverted]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(times);
  }, [times]);
  return (
    <div className={"d-flex justify-content-center "}>
      <Calendar
        onChange={onChange}
        value={selectedDate}
        calendarType={"gregory"}
      />
    </div>
  );
}

export default CalendarSelect;
