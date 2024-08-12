/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const ChartHistory = ({ player }) => {
  const { historyScore, score } = player;

  const chartData = {
    labels: Array.from(
      { length: historyScore.length },
      (_, index) => `round ${index + 1}`
    ),
    datasets: [
      {
        data: historyScore,
        fill: true,
        backgroundColor: score >= 0 ? "#68D391" : "#FC8181",
        borderColor: score >= 0 ? "green" : "red",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box w="100%" h="400px">
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default ChartHistory;
