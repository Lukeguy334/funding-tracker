import { useEffect, useState } from "react";
import FundingBarChart from "./components/FundingBarChart";
import IndustryTrendChart from "./components/IndustryTrendChart";

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch("/funding.json")
      .then(res => res.json())
      .then(data => setFundingData(data))
      .catch(err => console.error("Failed to fetch funding data", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Startup Funding Tracker</h1>
      <FundingBarChart data={fundingData} />
      <IndustryTrendChart data={fundingData} />
    </div>
  );
}


import { Bar } from "react-chartjs-2";

function FundingBarChart({ data }) {
  const fundingByYear = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    acc[year] = (acc[year] || 0) + item.funding;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(fundingByYear),
    datasets: [
      {
        label: "Total Funding",
        data: Object.values(fundingByYear),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Funding",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

import { Line } from "react-chartjs-2";

function IndustryTrendChart({ data }) {
  const fundingByIndustryAndYear = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    const industry = item.industry;

    if (!acc[industry]) {
      acc[industry] = {};
    }

    acc[industry][year] = (acc[industry][year] || 0) + item.funding;
    return acc;
  }, {});

  const chartData = {
    labels: Array.from(
      new Set(
        data.map((item) => new Date(item.date).getFullYear())
      )
    ).sort(),
    datasets: Object.keys(fundingByIndustryAndYear).map((industry) => ({
      label: industry,
      data: chartData.labels.map(
        (year) => fundingByIndustryAndYear[industry][year] || 0
      ),
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Funding Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default IndustryTrendChart;