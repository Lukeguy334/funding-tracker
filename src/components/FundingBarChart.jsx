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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FundingBarChart({ data }) {
  const totalsByYear = {};

  data.forEach(entry => {
    if (entry.year && entry.amount) {
      totalsByYear[entry.year] = (totalsByYear[entry.year] || 0) + entry.amount;
    }
  });

  const labels = Object.keys(totalsByYear).sort();
  const values = labels.map(year => totalsByYear[year]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Funding by Year ($)",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Total Startup Funding per Year" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Funding ($)" },
      },
      x: {
        title: { display: true, text: "Year" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default FundingBarChart;
