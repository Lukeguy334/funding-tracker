import { Bar } from "react-chartjs-2"; // Import the Bar chart component from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary modules from chart.js

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FundingBarChart({ data }) {
  // Object to store the total funding amounts grouped by year
  const totalsByYear = {};

  // Iterate over the data array to calculate total funding for each year
  data.forEach(entry => {
    if (entry.year && entry.amount) {
      // Add the funding amount to the corresponding year
      totalsByYear[entry.year] = (totalsByYear[entry.year] || 0) + entry.amount;
    }
  });

  // Extract the years (labels) and corresponding funding totals (values)
  const labels = Object.keys(totalsByYear).sort(); // Sort the years in ascending order
  const values = labels.map(year => totalsByYear[year]); // Map years to their total funding amounts

  // Prepare the data object for the Bar chart
  const chartData = {
    labels, // X-axis labels (years)
    datasets: [
      {
        label: "Total Funding by Year ($)", // Dataset label
        data: values, // Y-axis data (funding amounts)
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: { display: false }, // Hide the legend
      title: { display: true, text: "Total Startup Funding per Year" }, // Chart title
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis at zero
        title: { display: true, text: "Funding ($)" }, // Y-axis title
      },
      x: {
        title: { display: true, text: "Year" }, // X-axis title
      },
    },
  };

  // Render the Bar chart with the prepared data and options
  return <Bar data={chartData} options={options} />;
}

export default FundingBarChart; // Export the component as the default export
