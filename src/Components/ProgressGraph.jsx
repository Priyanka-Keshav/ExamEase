import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressGraph = ({ score, attempted, wrong }) => {
  const data = {
    labels: ["Score", "Attempted", "Wrong"],
    datasets: [
      {
        label: "Quiz Progress",
        data: [score, attempted, wrong],
        backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
        borderColor: ["#388E3C", "#1976D2", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quiz Progress",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProgressGraph;
