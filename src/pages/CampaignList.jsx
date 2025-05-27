
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCampaigns } from '../features/campaigns/campaignSlice';
import CampaignCard from '../components/CampaignCard';

const CampaignList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaigns, isLoading, error } = useSelector(state => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleCreateClick = () => {
    navigate('/campaigns/new');
  };

  if (isLoading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error loading campaigns: {error}</p>;

  return (
    <section style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Campaigns</h1>
        <button
          onClick={handleCreateClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Create New Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="campaign-list">
          {campaigns.map(campaign => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CampaignList;


