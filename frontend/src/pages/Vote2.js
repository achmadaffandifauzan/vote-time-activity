import { React, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [
  { title: "Meeting", start: new Date(1691082000000), end: "2023-08-13" },
  { title: "Tes", start: "2023-08-11", end: "2023-08-13" },
  { title: "Lol", start: "2023-08-11", end: "2023-08-13" },
];

function Vote2() {
  return (
    <div className="mainPage">
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className={"col-6"}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            // eventContent={renderEventContent}
          />
        </div>
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default Vote2;
