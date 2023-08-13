import { React, useEffect, useRef } from "react";
import { useState } from "react";
import "./CalendarDisplay.css";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
function displayCalendarStat(vote, voteData) {
  const firstDay = new Date(vote.year, vote.month - 1, 1).getDay();
  const totalDays = new Date(vote.year, vote.month, 0).getDate();
  const totalVoters = voteData.length;
  //   return { firstDay, totalDays };
  return (
    <div
      className="tab-pane fade show active"
      id={"tabs_" + vote.month}
      role="tabpanel"
      aria-labelledby="nav-home-tab"
      tabIndex="0"
    >
      <div className="calendarGrid my-3">
        {daysOfWeek.map((day) => {
          return <div className="calendarHeader">{day}</div>;
        })}
        {vote.frequencies.map((vote, i) => {
          return (
            <div
              onMouseEnter={(e) => {
                if (e.target.querySelector(".badgeVoters")) {
                  document.querySelectorAll(".badgeVoters").forEach((badge) => {
                    return (badge.style.display = "inline");
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (e.target.querySelector(".badgeVoters")) {
                  document.querySelectorAll(".badgeVoters").forEach((badge) => {
                    return (badge.style.display = "none");
                  });
                }
              }}
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
            >
              <span>{i + 1}</span>
              {vote > 0 ? (
                <span
                  style={{ display: "none" }}
                  className="badge badgeVoters bg-primary"
                >
                  {vote}
                </span>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// console.log(displayCalendarStat(2023, 9));

function CalendarDisplay() {
  const [selectedMonthToDisplay, setSelectedMonthToDisplay] = useState();
  useEffect(() => {
    // automatically select a month to display on after page load
    return () => {
      if (votedDateFrequency) {
        document
          .querySelectorAll(".nav-link-months")[0]
          .classList.add("active");
        setSelectedMonthToDisplay(votedDateFrequency[0].month);
      }
    };
  }, []);
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
    <>
      <nav>
        <div
          className="nav nav-tabs col-sm-6 offset-sm-3"
          id="nav-tab"
          role="tablist"
        >
          {votedDateFrequency.map((vote, i) => {
            return (
              <button
                className={"nav-link nav-link-months"}
                id={"btn_tabs_" + vote.month}
                data-bs-toggle="tab"
                onClick={() => setSelectedMonthToDisplay(vote.month)}
              >
                {monthsOfYear[vote.month - 1]} {vote.year}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div className={"col-sm-6 offset-sm-3"}>
          {votedDateFrequency.map((vote) => {
            if (vote.month == selectedMonthToDisplay) {
              return displayCalendarStat(vote, voteData);
            }
          })}
        </div>
      </div>
    </>
  );
}

export default CalendarDisplay;
