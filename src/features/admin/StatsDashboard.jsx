

import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystemStats } from './adminSlice';

const formatNumber = (num) => {
  if (num >= 1e7) return (num / 1e7).toFixed(1) + ' Cr';
  if (num >= 1e5) return (num / 1e5).toFixed(1) + ' L';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

const StatsDashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSystemStats());
  }, [dispatch]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">System Stats</h2>
      <ul>
        <li>Total Users: {stats.totalUsers}</li>
        <li>Total Campaigns: {stats.totalCampaigns}</li>
        <li>Total Donations: {stats.totalDonations}</li>
        <li>New Users Today: {stats.newUsersToday}</li>
        <li>Pending Campaigns: {stats.pendingCampaigns}</li>
        <li>Total Donation Amount: ₹{formatNumber(stats.totalDonationAmount)}</li>
        <li>Today's Donation Amount: ₹{formatNumber(stats.todaysDonationAmount)}</li>
      </ul>
    </div>
  );
};

export default StatsDashboard;

