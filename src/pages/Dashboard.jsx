
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CampaignCard from '../components/CampaignCard';
import StatsDashboard from '../features/admin/StatsDashboard';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import './dashboard.css';

const COLORS = ['#4caf50', 
  '#2196f3', 
  '#ff9800', 
  '#9c27b0', 
  '#f44336', 
  '#00bcd4'  ];

const Dashboard = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const [profile, setProfile] = useState(null);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [dashboardOverview, setDashboardOverview] = useState(null);
  const [view, setView] = useState('overview');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDashboardOverview = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3001/api/users/dashboard', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDashboardOverview(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard overview:', err.response?.data || err.message);
        setError('Failed to load dashboard overview.');
      }
    };

    if (view === 'overview' && !isAdmin && profile) {
      fetchDashboardOverview();
    }
  }, [view, isAdmin, profile]);

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3001/api/campaigns/my', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMyCampaigns(res.data);
      } catch (err) {
        console.error('Failed to fetch campaigns:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('user');
          navigate('/auth');
        } else {
          setError('Failed to load campaigns.');
        }
      }
    };

    if (view === 'campaigns') {
      fetchMyCampaigns();
    }
  }, [view, navigate]);

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`http://localhost:3001/api/donations/my-donations`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMyDonations(res.data);
      } catch (err) {
        console.error('Failed to fetch donations:', err.response?.data || err.message);
        setError('Failed to load donations.');
      }
    };

    if (view === 'donations') {
      fetchMyDonations();
    }
  }, [view]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = myCampaigns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(myCampaigns.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleCampaignUpdate = (updatedCampaign) => {
    if (!updatedCampaign) return;
    setMyCampaigns((prev) =>
      prev.map((c) => (c._id === updatedCampaign._id ? updatedCampaign : c))
    );
  };

  if (error) {
    return (
      <div className="dashboard">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard">
        <p>Loading profile...</p>
      </div>
    );
  }

  const renderOverview = () => {
  if (isAdmin) return <StatsDashboard />;

  if (!dashboardOverview) return <p>Loading overview data...</p>;

  const campaignsData = [
    { name: 'Pending', count: dashboardOverview.pendingCount, className: 'status-pending' },
    { name: 'Rejected', count: dashboardOverview.rejectedCount, className: 'status-rejected' },
    { name: 'Active', count: dashboardOverview.activeCount, className: 'status-active' },
    { name: 'Completed', count: dashboardOverview.completedCount, className: 'status-completed' },
    { name: 'Withdrawn', count: dashboardOverview.withdrawnCount, className: 'status-withdrawn' },
    { name: 'Deleted', count: dashboardOverview.deletedCount, className: 'status-deleted' },
  ];

  const donationsData = [
    { name: 'Donations Made', value: dashboardOverview.totalDonationsMade ?? 0 },
    { name: 'Donations Received', value: dashboardOverview.totalDonationsReceived ?? 0 },
  ];

  return (
    <div className="overview-container">
      {/* Campaign Overview */}
      <h2 className="overview-section-title">Campaign Overview</h2>
      <div className="campaign-overview">
        {campaignsData.map((item, index) => (
          <div className={`status-card ${item.className}`} key={index}>
            <h4>{item.name}</h4>
            <p>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Donation Overview */}
      <h2 className="overview-section-title">Donation Overview</h2>
      <div className="donation-overview">
        <div className="donation-card donation-made">
          <h4>Donations Made</h4>
          <p>₹{(dashboardOverview.totalDonationsMade ?? 0).toLocaleString()}</p>
        </div>
        <div className="donation-card donation-received">
          <h4>Donations Received</h4>
          <p>₹{(dashboardOverview.totalDonationsReceived ?? 0).toLocaleString()}</p>
        </div>
      </div>

{/* Charts Row */}
<div className="charts-row">
  <div className="chart-card">
    <h4>Campaigns Status</h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={campaignsData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#4caf50" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="chart-card">
    <h4>Donations Summary</h4>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={donationsData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#82ca9d"
          label={(entry) => `${entry.name}: ₹${entry.value.toLocaleString()}`}
        >
          {donationsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};


  const renderContent = () => {
    switch (view) {
      case 'overview':
        return renderOverview();
      case 'campaigns':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>My Campaigns</h2>
              <button
                onClick={() => navigate('/campaigns/new')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                + Create New Campaign
              </button>
            </div>
            {myCampaigns.length === 0 ? (
              <p>You have no campaigns yet.</p>
            ) : (
              <>
                <div className="campaign-list" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                  marginTop: '20px',
                }}>
                  {currentCampaigns.map((campaign) => {
                    const isGoalReached = campaign.raisedAmount >= campaign.goalAmount;
                    return (
                      <CampaignCard
                        key={campaign._id}
                        campaign={campaign}
                        showEdit={true}
                        allowWithdraw={isGoalReached}
                        onUpdate={handleCampaignUpdate}
                      />
                    );
                  })}
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        margin: '0 5px',
                        padding: '8px 12px',
                        backgroundColor: currentPage === index + 1 ? '#333' : '#eee',
                        color: currentPage === index + 1 ? '#fff' : '#333',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      case 'donations':
        return (
          <div>
            <h2>My Donations</h2>
            {myDonations.length === 0 ? (
              <p>You haven't made any donations yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Campaign</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Amount</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Message</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                        {donation.campaign?.title || 'N/A'}
                      </td>
                      <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(donation.amount)}
                      </td>
                      <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                        {donation.message || '—'}
                      </td>
                      <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-sidebar">
        <button className={view === 'overview' ? 'active' : ''} onClick={() => setView('overview')}>
          Overview
        </button>
        <button className={view === 'campaigns' ? 'active' : ''} onClick={() => setView('campaigns')}>
          My Campaigns
        </button>
        <button className={view === 'donations' ? 'active' : ''} onClick={() => setView('donations')}>
          My Donations
        </button>
      </nav>
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;




