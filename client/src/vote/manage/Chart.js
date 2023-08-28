import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Horizontal Bar Chart",
    },
  },
};

const Chart = ({ flashMessage, setFlashMessage, votingAgenda }) => {
  console.log(votingAgenda);
  const labels = votingAgenda.dates;
  const data = {
    labels,
    // // example
    // datasets: [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() => 1000),
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   },
    // ],
    datasets: votingAgenda.votingResults.map((votingResultBymonth) => {
      const borderColor = `rgb(255, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      const backgroundColor = borderColor.replace(")", ", 0.5)");
      return {
        label: votingResultBymonth.monthWithYear,
        data: votingAgenda.dates.map((date) => {
          // mapping all available dates to vote
          if (
            date.split("-")[1] ==
            votingResultBymonth.monthWithYear.split("-")[0]
          ) {
            // match the same month first (because votingAgenda.dates contain all selected dates)
            for (let key in votingResultBymonth.result) {
              // looping object
              if (parseInt(date.split("-")[0]) == parseInt(key)) {
                // then match the same date
                return votingResultBymonth.result[key].length;
              }
            }
          }
        }),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      };
    }),
  };

  return <Bar options={options} data={data} />;
};
export default Chart;
