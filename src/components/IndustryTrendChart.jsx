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

// Register the required Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function IndustryTrendChart({ data }) {
  // Group data by industry and year, summing up the funding amounts
  const grouped = {};

  data.forEach(entry => {
    if (!grouped[entry.industry]) {
      grouped[entry.industry] = {};
    }
    grouped[entry.industry][entry.year] = (grouped[entry.industry][entry.year] || 0) + entry.amount;
  });

  // Extract unique years from the data and sort them in ascending order
  const years = Array.from(new Set(data.map(d => d.year))).sort((a, b) => a - b);

  // Generate a random color for each dataset
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Create datasets for each industry, mapping funding amounts to corresponding years
  const datasets = Object.entries(grouped).map(([industry, yearData]) => ({
    label: industry, // Industry name as the label
    data: years.map(year => yearData[year] || 0), // Funding amounts for each year
    borderColor: getRandomColor(), // Random color for the line
    borderWidth: 2, // Line thickness
    pointRadius: 3, // Size of data points
    pointHoverRadius: 5, // Size of data points on hover
    tension: 0.3, // Line tension for smooth curves
  }));

  // Chart data configuration
  const chartData = {
    labels: years, // X-axis labels (years)
    datasets, // Data for each industry
  };

  // Chart options configuration
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: { position: "bottom" }, // Position the legend at the bottom
      tooltip: { mode: "index", intersect: false }, // Tooltip behavior
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis at zero
        title: { display: true, text: "Funding Amount ($)" }, // Y-axis title
      },
      x: {
        title: { display: true, text: "Year" }, // X-axis title
      },
    },
  };

  return (
    <div className="mb-8">
      {/* Chart title */}
      <h2 className="text-xl font-semibold mb-2">Funding Trends by Industry</h2>
      {/* Render the line chart */}
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;
