
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystemStats } from './adminSlice';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import './StatsDashboard.css'; // Make sure to create and import this CSS file

const formatNumber = (num) => {
  if (num >= 1e7) return (num / 1e7).toFixed(1) + ' Cr';
  if (num >= 1e5) return (num / 1e5).toFixed(1) + ' L';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num?.toString();
};

const COLORS = ['#4caf50', 
  '#2196f3', 
  '#ff9800', 
  '#9c27b0', 
  '#f44336', 
  '#00bcd4'  ];

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-title">{title}</div>
  </div>
);

const StatsDashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSystemStats());
  }, [dispatch]);

  if (!stats) return <p>Loading stats...</p>;

  const barData = [
    { name: 'New Users', value: stats.newUsersToday },
    { name: 'Users', value: stats.totalUsers },
    { name: 'Campaigns', value: stats.totalCampaigns },
    { name: 'Donations', value: stats.totalDonations },
  ];

  const pieData = [
    { name: 'Total ₹', value: stats.totalDonationAmount },
    { name: 'Today ₹', value: stats.todaysDonationAmount },
  ];

  return (
    <div className="dashboard-container">
      {/* <h2 className="dashboard-heading">System Stats</h2> */}

      <div className="stats-grid">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Campaigns" value={stats.totalCampaigns} />
        <StatCard title="Total Donations" value={stats.totalDonations} />
        <StatCard title="New Users Today" value={stats.newUsersToday} />
        <StatCard title="Total Donation Amount" value={`₹${formatNumber(stats.totalDonationAmount)}`} />
        <StatCard title="Today's Donation Amount" value={`₹${formatNumber(stats.todaysDonationAmount)}`} />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-heading">User & Campaign Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-heading">Donation Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${formatNumber(value)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
