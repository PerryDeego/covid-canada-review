import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import Card from "./components/SummaryCard";
import PieChart from "./components/charts/PieChart";
import LineChart from "./components/charts/LineChart";
import Data from "./components/Data.json";
import { FaBackspace, FaClipboardCheck, FaSkullCrossbones, FaSyringe } from 'react-icons/fa'; // Updated import
import "./App.css";

function App() {
  // State variables for managing location, last updated time, and summary data
  const [activeLocation, setActiveLocation] = useState("AB");
  const [lastUpdated, setLastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});

  // List of locations for the dropdown
  const locationList = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" },
  ];

  // Function to update the last updated time
  const getUpdate = async () => {
    try {
      setLastUpdated(new Date().toLocaleString("en-CA"));
    } catch (error) {
      console.error("Error fetching version data:", error);
    }
  };

  // Function to fetch summary data based on the active location
  const getSummaryData = useCallback(() => {
    try {
      if (activeLocation === "canada") {
        return;
      }

      const summaryData = Data[activeLocation];
      setSummaryData(summaryData);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  }, [activeLocation]);

  // Effect to fetch data when the component mounts or activeLocation changes
  useEffect(() => {
    const fetchData = async () => {
      getSummaryData();
      getUpdate();
    };

    fetchData();
  }, [getSummaryData, activeLocation]);

  // Return statement for rendering the page content
  return (
    <div className="App">
      <h1>COVID-19 Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-menu">
          <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.find(
              (option) => option.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date">Last Updated: {lastUpdated}</p>
        </div>
        <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.totalCases} icon={<FaBackspace />} />
          <Card title="Total Tests" value={summaryData.totalTests} icon={<FaClipboardCheck />} />
          <Card title="Total Deaths" value={summaryData.totalDeaths} icon={<FaSkullCrossbones />} />
          <Card title="Total Vaccinated" value={summaryData.totalVaccinated} icon={<FaSyringe />} /> {/* Updated icon */}
        </div>
        <div className="dashboard-chart">
          <div className="chart-content">
            <PieChart /> {/* PieChart component */}
          </div>
          <div className="chart-content">
            <LineChart /> {/* LineChart component */}
          </div>
        </div>
        <div className="dashboard-review">
          <h1>Covid Canada Review</h1>
          <p>
            The COVID-19 pandemic has significantly impacted Canada, with
            varying case numbers across provinces. As of recent reports,
            provinces like Ontario, Quebec, and Alberta have been at the
            forefront, accounting for a substantial majority of the country's
            cases. For instance, Ontario reported a staggering 9,571 new cases
            in a single day, highlighting the ongoing challenges faced by the
            healthcare system .
          </p>
          <p>
            Despite the high case counts, there are concerns that these numbers
            may be under reported due to testing capacity issues. Many provinces
            are experiencing backlogs in testing, which complicates the accurate
            assessment of the situation. This has led to calls for more robust
            public health measures and better coordination among provinces to
            manage the spread effectively.
          </p>
          <h3>Vulnerabilities in Canada's Healthcare</h3>
          <p>
            The pandemic has also exposed vulnerabilities in Canada's healthcare
            system, particularly in long-term care facilities, where a
            significant number of deaths occurred . While Canada has achieved a
            vaccination rate exceeding 80%, the uneven distribution of cases and
            the impact on marginalized communities remain pressing issues.
            Canada's approach to COVID-19 has been marked by a proactive and
            flexible regulatory environment, aimed at ensuring public health
            while responding to the dynamic challenges posed by the pandemic.
          </p>
          <h3>Current Developments</h3>
          <p>
            As of now, Health Canada is reviewing new formulations of COVID-19
            vaccines, which have adapted to target variants rather than the
            original strain, which is no longer circulating widely . This
            reflects a shift in strategy as the pandemic evolves, focusing on
            booster shots that are more effective against current variants.
          </p>
          <h3>Regulatory Measures</h3>
          <p>
            The regulatory framework established by Health Canada has been
            described as innovative, allowing for quick access to health
            products while maintaining rigorous safety standards . This includes
            not only vaccines but also treatments and antiviral medications,
            which are crucial in managing the pandemic.
          </p>
          <h3>Future Outlook</h3>
          <p>
            Looking ahead, the landscape of COVID-19 treatments and vaccines
            continues to evolve, with ongoing clinical evaluations and new
            applications being submitted for review . The focus remains on
            adapting to the changing nature of the virus and ensuring that
            Canadians have access to effective health products.
          </p>
          <p>
            In summary, while Canada has made strides in vaccination and
            managing the pandemic, the ongoing high case numbers and the strain
            on healthcare resources underscore the need for continued vigilance
            and improvement in public health strategies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;


