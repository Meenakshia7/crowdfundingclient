
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CampaignCard from '../components/CampaignCard';
import StatsDashboard from '../features/admin/StatsDashboard';
import './dashboard.css';

const Dashboard = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const [profile, setProfile] = useState(null);
  const [myCampaigns, setMyCampaigns] = useState([]);
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
    setMyCampaigns(prev =>
      prev.map(c => (c._id === updatedCampaign._id ? updatedCampaign : c))
    );
  };

  if (error) {
    return <div className="dashboard"><p className="error">{error}</p></div>;
  }

  if (!profile) {
    return <div className="dashboard"><p>Loading profile...</p></div>;
  }

  const renderContent = () => {
    switch (view) {
      case 'overview':
        if (isAdmin) {
          return <StatsDashboard />; // show admin stats dashboard
        }
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <p>Welcome, {profile.name}!</p>
            <p>Email: {profile.email}</p>
            <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        );
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
                  fontWeight: 'bold'
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
                  marginTop: '20px'
                }}>
                  {currentCampaigns.map(campaign => {
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
                        cursor: 'pointer'
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
            <p>(Donation history coming soon...)</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Account settings go here. (Coming soon)</p>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2>Admin Panel</h2>
            <p>Manage users, campaigns, and settings here. (Admin-only)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3>Welcome, {profile.name || 'User'}</h3>
        <ul>
          <li onClick={() => setView('overview')}>Overview</li>
          <li onClick={() => setView('campaigns')}>My Campaigns</li>
          <li onClick={() => setView('donations')}>My Donations</li>
          <li onClick={() => setView('settings')}>Settings</li>
          {isAdmin && <li onClick={() => setView('admin')}>Admin Panel</li>}
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
