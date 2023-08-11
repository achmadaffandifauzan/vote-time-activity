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

function displayCalendarStat(vote, voteData) {
  const firstDay = new Date(vote.year, vote.month - 1, 1).getDay();
  const totalDays = new Date(vote.year, vote.month, 0).getDate();
  const totalVoters = voteData.length;
  //   return { firstDay, totalDays };
  return (
    <div>
      <div>{vote.month}</div>
      <div>{vote.year}</div>
      <div className="calendarGrid">
        {daysOfWeek.map((day) => {
          return <div className="calendarHeader">{day}</div>;
        })}
        {vote.frequencies.map((vote, i) => {
          return (
            <div
              className={(() => {
                let className = "calendarMain ";
                if (i == 0) {
                  className = className + "firstDay_" + firstDay;
                }
                className =
                  className +
                  " bg_color_red_" +
                  Math.round((vote / totalVoters) * 10);
                return className;
              })()}
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              {vote}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// console.log(displayCalendarStat(2023, 9));

function displayBlocksOfDate() {}
function Vote3() {
  const [votedDateFrequency, setVotedDateFrequency] = useState([
    {
      year: 2023,
      month: 8,
      frequencies: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 3,
      ],
    },
    {
      year: 2023,
      month: 9,
      frequencies: [
        5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
  ]);
  const [voteData, setVoteData] = useState([
    { contributor: "user1", voted: [new Date(1691082000000), "2023-08-13"] },
    { contributor: "user2", voted: ["2023-08-11", "2023-08-13"] },
    { contributor: "user3", voted: ["2023-08-12", "2023-08-14"] },
    { contributor: "user4", voted: [new Date(1691082000000), "2023-08-13"] },
    { contributor: "user5", voted: ["2023-08-11", "2023-08-13"] },
    { contributor: "user6", voted: ["2023-08-12", "2023-08-14"] },
    { contributor: "user7", voted: [new Date(1691082000000), "2023-08-13"] },
    { contributor: "user8", voted: ["2023-08-11", "2023-08-13"] },
    { contributor: "user9", voted: ["2023-08-12", "2023-08-14"] },
    { contributor: "user10", voted: [new Date(1691082000000), "2023-08-13"] },
    { contributor: "user11", voted: ["2023-08-11", "2023-08-13"] },
    { contributor: "user12", voted: ["2023-08-12", "2023-08-14"] },
  ]);
  return (
    <div className="mainPage">
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className={"col-6"}>
          {votedDateFrequency.map((vote) => {
            return displayCalendarStat(vote, voteData);
          })}
        </div>
      </div>
    </div>
  );
}

export default Vote3;
