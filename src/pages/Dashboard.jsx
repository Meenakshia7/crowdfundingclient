
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../features/auth/authSlice';
import axios from 'axios';
import CampaignCard from '../components/CampaignCard';
import './dashboard.css';

const Dashboard = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const [profile, setProfile] = useState(null);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [view, setView] = useState('overview');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
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
      if (!profile) return;
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:3001/api/campaigns', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const myOwnCampaigns = res.data.filter(c => c.owner._id === profile._id);
        setMyCampaigns(myOwnCampaigns);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaigns.');
      }
    };

    if (view === 'campaigns') {
      fetchMyCampaigns();
    }
  }, [view, profile]);

  if (error) {
    return <div className="dashboard"><p className="error">{error}</p></div>;
  }

  if (!profile) {
    return <div className="dashboard"><p>Loading profile...</p></div>;
  }

  const renderContent = () => {
    switch (view) {
      case 'overview':
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
            <h2>My Campaigns</h2>
            {myCampaigns.length === 0 ? (
              <p>You have no campaigns yet.</p>
            ) : (
              myCampaigns.map(campaign => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
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
          {isAdmin && (
            <li onClick={() => setView('admin')}>Admin Panel</li>
          )}
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
