import { React, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import "./Vote3.css";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function displayCalendarStat(vote) {
  const firstDay = new Date(vote.year, vote.month - 1, 1).getDay();
  const totalDays = new Date(vote.year, vote.month, 0).getDate();
  //   return { firstDay, totalDays };
  return (
    <>
      <div>{vote.month}</div>
      <div>{vote.year}</div>
      <div className="calendarGrid">
        {daysOfWeek.map((day) => {
          return <div className="calendarHeader">{day}</div>;
        })}
        {vote.voteData.map((totalVoters, i) => {
          return (
            <div
              className={
                i == 0
                  ? "calendarMain" + " " + "firstDay_" + firstDay
                  : "calendarMain"
              }
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "lightblue",
              }}
            >
              {totalVoters}
            </div>
          );
        })}
      </div>
    </>
  );
}
// console.log(displayCalendarStat(2023, 9));

function displayBlocksOfDate() {}
function Vote3() {
  const [votedDateFrequency, setVotedDateFrequency] = useState([
    {
      year: 2023,
      month: 8,
      voteData: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 4, 30,
      ],
    },
    {
      year: 2023,
      month: 9,
      voteData: [
        30, 15, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    },
  ]);
  const [voteData, setVoteData] = useState([
    { contributor: "user1", voted: [new Date(1691082000000), "2023-08-13"] },
    { contributor: "user2", voted: ["2023-08-11", "2023-08-13"] },
    { contributor: "user3", voted: ["2023-08-12", "2023-08-14"] },
  ]);
  return (
    <div className="mainPage">
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className={"col-6"}>
          {votedDateFrequency.map((voteData) => {
            return displayCalendarStat(voteData);
          })}
        </div>
      </div>
    </div>
  );
}

export default Vote3;
