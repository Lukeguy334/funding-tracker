import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend);

function IndustryTrendChart({ data }) {
  const grouped = {};

  data.forEach(entry => {
    if (!grouped[entry.industry]) {
      grouped[entry.industry] = {};
    }
    grouped[entry.industry][entry.year] = (grouped[entry.industry][entry.year] || 0) + entry.funding;
  });

  const years = Array.from(new Set(data.map(d => d.year))).sort();
  const datasets = Object.entries(grouped).map(([industry, yearData]) => ({
    label: industry,
    data: years.map(year => yearData[year] || 0),
    fill: false,
    tension: 0.1,
  }));

  const chartData = {
    labels: years,
    datasets,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Funding Trends by Industry</h2>
      <Line data={chartData} />
    </div>
  );
}

export default IndustryTrendChart;
