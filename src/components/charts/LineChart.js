import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import Data from '../Data.json';

// Register the necessary components for Chart.js
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const LineChart = () => {
    // Check if Data is defined and has items
    if (!Data || Object.keys(Data).length === 0) {
        return <div>No COVID information available to display.</div>;
    }

    // Prepare the data for the chart
    const labels = Object.values(Data).map(item => item.label); // Use province labels as labels
    const dataValues = Object.values(Data).map(item => item.totalCases); // Use total cases as data

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'COVID Cases',
                data: dataValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light background color
                borderColor: 'rgba(255, 99, 132, 1)', // Darker border color
                borderWidth: 2,
                fill: false, // Set to true if you want the area under the line to be filled
            },
        ],
    };

    return (
        <div>
            <h3>COVID Cases by Province</h3>
            <div className="chart-container">
                <Line data={data} />
            </div>
        </div>
    );
};

export default LineChart;
