import { useEffect, useState } from "react";
import FundingBarChart from "./components/FundingBarChart";
import IndustryTrendChart from "./components/IndustryTrendChart";

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch("/funding.json")
      .then(res => res.json())
      .then(data => setFundingData(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Startup Funding Tracker</h1>
      <FundingBarChart data={fundingData} />
      <IndustryTrendChart data={fundingData} />
    </div>
  );
}

export default App;
