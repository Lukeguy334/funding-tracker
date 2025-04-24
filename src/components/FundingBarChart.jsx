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
import { Line } from "react-chartjs-2";

function FundingLineChart({ data }) {
  const trendsByIndustry = {};

  data.forEach(entry => {
    const { industry, year, funding } = entry;
    if (!trendsByIndustry[industry]) {
      trendsByIndustry[industry] = {};
    }
    trendsByIndustry[industry][year] = (trendsByIndustry[industry][year] || 0) + funding;
  });

  const chartData = {
    labels: [...new Set(data.map(entry => entry.year))].sort(),
    datasets: Object.keys(trendsByIndustry).map(industry => ({
      label: industry,
      data: chartData.labels.map(year => trendsByIndustry[industry][year] || 0),
      fill: false,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })),
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Funding Trends by Industry</h2>
      <Line data={chartData} />
    </div>
  );
}

export { FundingLineChart };