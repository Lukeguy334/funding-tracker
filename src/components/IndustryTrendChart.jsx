import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

function IndustryTrendChart({ data }) {
  const grouped = {};

  data.forEach(entry => {
    if (!grouped[entry.industry]) {
      grouped[entry.industry] = {};
    }
    grouped[entry.industry][entry.year] = (grouped[entry.industry][entry.year] || 0) + entry.funding;
  });

  const years = Array.from(new Set(data.map(d => d.year))).sort();

  // Helper to generate bright, readable colors
  const getRandomColor = () => {
    const r = Math.floor(100 + Math.random() * 155);
    const g = Math.floor(100 + Math.random() * 155);
    const b = Math.floor(100 + Math.random() * 155);
    return `rgba(${r}, ${g}, ${b}, 0.9)`;
  };

  const datasets = Object.entries(grouped).map(([industry, yearData]) => ({
    label: industry,
    data: years.map(year => yearData[year] || 0),
    borderColor: getRandomColor(),
    backgroundColor: "transparent",
    borderWidth: 3,
    pointRadius: 5,
    pointHoverRadius: 7,
    tension: 0.3,
  }));

  const chartData = {
    labels: years,
    datasets,
  };

  return (
    <div className="mb-8">
     <h2 className="text-xl font-semibold mb-2">Funding Trends by Industry</h2>
     <Line data={chartData} options={chartOptions} />
    </div>
    );
  
  }