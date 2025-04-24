import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function IndustryTrendChart({ data }) {
  const grouped = {};

  data.forEach(entry => {
    if (!grouped[entry.industry]) {
      grouped[entry.industry] = {};
    }
    grouped[entry.industry][entry.year] = (grouped[entry.industry][entry.year] || 0) + entry.amount;
  });

  const years = Array.from(new Set(data.map(d => d.year))).sort((a, b) => a - b);

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  const datasets = Object.entries(grouped).map(([industry, yearData]) => ({
    label: industry,
    data: years.map(year => yearData[year] || 0),
    borderColor: getRandomColor(),
    borderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 5,
    tension: 0.3,
  }));

  const chartData = {
    labels: years,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Funding Amount ($)" },
      },
      x: {
        title: { display: true, text: "Year" },
      },
    },
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Funding Trends by Industry</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;
