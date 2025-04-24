import { useEffect, useState } from "react";
import FundingBarChart from "./components/FundingBarChart";
import IndustryTrendChart from "./components/IndustryTrendChart";

function App() {
  // State to hold the funding data fetched from the JSON file
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    // Fetch funding data from the local JSON file
    fetch("/funding.json")
      .then(res => res.json()) // Parse the response as JSON
      .then(data => setFundingData(data)) // Update the state with the fetched data
      .catch(err => console.error("Fetch error:", err)); // Log any errors during the fetch
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="p-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">Startup Funding Tracker</h1>
      
      {/* Render the FundingBarChart component with the fetched data */}
      <FundingBarChart data={fundingData} />
      
      {/* Render the IndustryTrendChart component with the fetched data */}
      <IndustryTrendChart data={fundingData} />
    </div>
  );
}

export default App;
