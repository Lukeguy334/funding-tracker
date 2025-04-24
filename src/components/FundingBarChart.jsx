import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function FundingBarChart({ data }) {
  const totalsByYear = {};

  data.forEach(entry => {
    const year = entry.year;
    totalsByYear[year] = (totalsByYear[year] || 0) + entry.funding;
  });

  const chartData = {
    labels: Object.keys(totalsByYear),
    datasets: [
      {
        label: "Total Funding",
        data: Object.values(totalsByYear),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Total Funding by Year</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default FundingBarChart;
