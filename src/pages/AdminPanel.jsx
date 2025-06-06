
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystemStats } from '../features/admin/adminSlice'; // Assuming this exists

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  width: '180px',
  height: '160px',
  margin: '10px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
};

const statValueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#4caf50',
};

const statTitleStyle = {
  fontSize: '16px',
  color: '#333',
  marginTop: '8px',
  textAlign: 'center',
};

const viewDetailsStyle = {
  marginTop: '10px',
  fontSize: '14px',
  color: '#3498db',
  fontWeight: '600',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSystemStats());
  }, [dispatch]);

  if (!stats) return <p>Loading stats...</p>;

  // Format numbers like before
  const formatNumber = (num) => {
    if (num >= 1e7) return (num / 1e7).toFixed(1) + ' Cr';
    if (num >= 1e5) return (num / 1e5).toFixed(1) + ' L';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num?.toString();
  };

  // Data for cards — title, count, navigation path, and color
  const cards = [
    {
      title: 'Pending Campaigns',
      count: stats.pendingCampaigns,
      link: '/admin/pending-campaigns',
      color: '#f39c12',
    },
    {
      title: 'Active Campaigns',
      count: stats.activeCampaigns || 0, // example calculation
      link: '/admin/campaigns/status/active',
      color: '#27ae60',
    },
    {
      title: 'Rejected Campaigns',
      count: stats.rejectedCampaigns || 0, // if you track rejected count
      link: '/admin/campaigns/status/rejected',
      color: '#e74c3c',
    },
    {
      title: 'Completed Campaigns',
      count: stats.completedCampaigns || 0,
      link: '/admin/campaigns/status/completed',
      color: '#2c3e50',
    },
    {
      title: 'Withdrawn Campaigns',
      count: stats.withdrawnCampaigns || 0,
      link: '/admin/campaigns/status/withdrawn',
      color: '#8e44ad',
    },
    {
      title: 'Total Users',
      count: stats.totalUsers,
      link: '/admin/users',
      color: '#3498db',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(({ title, count, link, color }) => (
          <div
            key={title}
            style={{ ...cardStyle, borderTop: `4px solid ${color}` }}
            onClick={() => navigate(link)}
          >
            <div style={statValueStyle}>{formatNumber(count)}</div>
            <div style={statTitleStyle}>{title}</div>
            <button
              style={{ ...viewDetailsStyle, color }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent div click
                navigate(link);
              }}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
