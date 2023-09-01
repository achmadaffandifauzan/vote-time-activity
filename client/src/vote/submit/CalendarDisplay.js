import { React, useEffect } from "react";
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
  console.log(votingAgenda);
  const [selectedMonthToDisplay, setSelectedMonthToDisplay] = useState();
  useEffect(() => {
    // automatically select a month to display on after page load
    if (votingAgenda) {
      document.querySelectorAll(".nav-link-months")[0].classList.add("active");
      setSelectedMonthToDisplay(votingAgenda.monthsWithYear[0]);
    }
  }, []);
  const displayCalendar = (votingResultsPerMonth) => {
    console.log("votingResultsPerMonth", votingResultsPerMonth);
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
        key={`votingResultsPerMonth_${votingResultsPerMonth.monthWithYear}`}
        className="tab-pane fade show active"
        id={"tabs_" + votingResultsPerMonth.monthWithYear.split("-")[0]}
        role="tabpanel"
        aria-labelledby="nav-home-tab"
        tabIndex="0"
      >
        <div className="calendarGrid my-3">
          {daysOfWeek.map((day) => {
            return (
              <div key={day} className="calendarHeader">
                {day}
              </div>
            );
          })}

          {votingResultsPerMonth.results.map((dayResult, i) => {
            if (i + 1 <= totalDays) {
              // limit display depends on max day on each month
              return (
                <div
                  key={`dayResult_${i + 1}`}
                  className={(() => {
                    let className = "calendarMain" + " ";
                    if (i + 1 === 1) {
                      className = className + "firstDay_" + firstDay;
                    }
                    // making sure it is not undefined
                    const darknessLevel = dayResult ? dayResult : 0;
                    className =
                      className +
                      " bg_color_red_" +
                      Math.round((darknessLevel / votingAgenda.totalVote) * 10);
                    return className;
                  })()}
                  // onMouseEnter and onMouseLeave is to view numbers of voter when hovering to a date in calendar by searching for date that has .badgeVoters
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
                >
                  {/* display the date number, if not in votable dates, add text-muted */}
                  {(() => {
                    if (
                      votingAgenda.dates.includes(
                        `${i + 1}-${votingResultsPerMonth.monthWithYear}`
                      ) ||
                      votingAgenda.dates.includes(
                        `0${i + 1}-${votingResultsPerMonth.monthWithYear}`
                      )
                    ) {
                      return <span className="fw-bold">{i + 1}</span>;
                    } else {
                      return <span className="text-black-50">{i + 1}</span>;
                    }
                  })()}
                  {/* if this date has voters, than give .badgeVoters to make it hover-able */}
                  {dayResult > 0 ? (
                    <span
                      style={{ display: "none" }}
                      className="badge badgeVoters bg-success mx-1"
                    >
                      {dayResult}
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
                key={`monthWithYear_${i}`}
                className={"nav-link nav-link-months py-1 px-2"}
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
              votingResultsPerMonth.monthWithYear === selectedMonthToDisplay
            ) {
              return displayCalendar(votingResultsPerMonth);
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default CalendarDisplay;
