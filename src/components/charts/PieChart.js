// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Data from '../Data.json';
import './PieChart.css'; // Adjust the path as necessary

// Register the necessary components from Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Prepare the data for the Pie chart
  const pieData = {
    labels: Object.values(Data).map(region => region.label), // Extract labels from Data.json
    datasets: [
      {
        data: Object.values(Data).map(region => region.totalCases), // Extract total cases for each region
        backgroundColor: ['#badbcc', '#f8d7da', '#ffcccb', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a'], // Colors for each segment
        hoverBackgroundColor: ['#badbcc', '#f8d7da', '#ffcccb', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a'], // Hover colors
      },
    ],
  };

  return (
    <div>
      <h3>Covid Cases Overview</h3>
      <div className="pie-chart-container">
        <Pie data={pieData} /> {/* Render the Pie chart with the prepared data */}
      </div>
    </div>
  );
};

export default PieChart;
