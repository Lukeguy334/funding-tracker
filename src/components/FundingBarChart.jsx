import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function FundingBarChart({ data }) {
  const totalsByYear = {};

  data.forEach(entry => {
    const year = entry.year;
    totalsByYear[year] = (totalsByYear[year] || 0) + entry.amount;
  });

  const labels = Object.keys(totalsByYear).sort();
  const values = labels.map(year => totalsByYear[year]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Funding by Year ($)",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Year" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Total Funding ($)" },
      },
    },
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Total Funding by Year</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FundingBarChart;
