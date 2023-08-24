import { React, useEffect, useRef } from "react";
import { useState } from "react";
import "./CalendarDisplay.css";
const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = [
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
function CalendarDisplay({ flashMessage, setFlashMessage, votingAgenda }) {
  const [selectedMonthToDisplay, setSelectedMonthToDisplay] = useState();
  useEffect(() => {
    // automatically select a month to display on after page load
    if (votingAgenda) {
      document.querySelectorAll(".nav-link-months")[0].classList.add("active");
      setSelectedMonthToDisplay(votingAgenda.monthsWithYear[0]);
    }
  }, []);
  const displayCalendar = (votingResultsPerMonth) => {
    // console.log(votingResultsPerMonth);
    const firstDay = new Date(
      votingResultsPerMonth.monthWithYear.split("-")[1],
      votingResultsPerMonth.monthWithYear.split("-")[0] - 1,
      1
    ).getDay();
    const totalDays = new Date(
      votingResultsPerMonth.monthWithYear.split("-")[1],
      votingResultsPerMonth.monthWithYear.split("-")[0],
      0
    ).getDate();
    //   return { firstDay, totalDays };
    return (
      <div
        className="tab-pane fade show active"
        id={"tabs_" + votingResultsPerMonth.monthWithYear.split("-")[0]}
        role="tabpanel"
        aria-labelledby="nav-home-tab"
        tabIndex="0"
      >
        <div className="calendarGrid my-3">
          {daysOfWeek.map((day) => {
            return <div className="calendarHeader">{day}</div>;
          })}
          {/* Object.entries is used to convert from obj to array, because map only works on array */}
          {Object.entries(votingResultsPerMonth.result).map((dayResult, i) => {
            if (dayResult[0] <= totalDays) {
              return (
                <div
                  onMouseEnter={(e) => {
                    if (e.target.querySelector(".badgeVoters")) {
                      document
                        .querySelectorAll(".badgeVoters")
                        .forEach((badge) => {
                          return (badge.style.display = "inline");
                        });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.target.querySelector(".badgeVoters")) {
                      document
                        .querySelectorAll(".badgeVoters")
                        .forEach((badge) => {
                          return (badge.style.display = "none");
                        });
                    }
                  }}
                  className={(() => {
                    let className = "calendarMain" + " ";
                    if (dayResult[0] == 1) {
                      className = className + "firstDay_" + firstDay;
                    }
                    className =
                      className +
                      " bg_color_red_" +
                      Math.round(
                        (dayResult[1].length / votingAgenda.totalVote) * 10
                      );
                    return className;
                  })()}
                >
                  {/* <span>{i + 1}</span> */}
                  <span>{dayResult[0]}</span>
                  {dayResult[1].length > 0 ? (
                    <span
                      style={{ display: "none" }}
                      className="badge badgeVoters bg-success mx-1"
                    >
                      {dayResult[1].length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  };
  if (votingAgenda) {
    return (
      <>
        <nav>
          <div
            className="nav nav-tabs col-md-6 offset-md-3"
            id="nav-tab"
            role="tablist"
          >
            {votingAgenda.monthsWithYear.map((monthWithYear, i) => {
              return (
                <button
                  className={"nav-link nav-link-months"}
                  id={"btn_tabs_" + monthWithYear.split("-")[0]}
                  data-bs-toggle="tab"
                  onClick={() => setSelectedMonthToDisplay(monthWithYear)}
                >
                  {monthNames[monthWithYear.split("-")[0] - 1]}{" "}
                  {monthWithYear.split("-")[1]}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div className={"col-md-6 offset-md-3"}>
            {votingAgenda.votingResults.map((votingResultsPerMonth) => {
              if (
                votingResultsPerMonth.monthWithYear == selectedMonthToDisplay
              ) {
                return displayCalendar(votingResultsPerMonth);
              }
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading Bro...</div>;
  }
}

export default CalendarDisplay;
