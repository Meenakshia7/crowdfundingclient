
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserCampaigns } from '../features/campaigns/campaignSlice';
import CampaignCard from '../components/CampaignCard';

const MyCampaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCampaigns, status, error } = useSelector(state => state.campaigns);

  const [currentPage, setCurrentPage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchUserCampaigns());
  }, [dispatch]);

  useEffect(() => {
    setCampaigns(userCampaigns);
  }, [userCampaigns]);

  const handleCreateClick = () => {
    navigate('/create-campaign');
  };

  const handleCampaignUpdate = (updatedCampaign) => {
    if (updatedCampaign === null) {
      // If null, remove the campaign (deleted)
      setCampaigns(prev => prev.filter(c => c._id !== updatedCampaign._id));
    } else {
      // If present, update the campaign in the list
      setCampaigns(prev =>
        prev.map(c => (c._id === updatedCampaign._id ? updatedCampaign : c))
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (status === 'loading') return <p>Loading your campaigns...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Campaigns</h1>
        <button
          onClick={handleCreateClick}
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

      {campaigns.length === 0 ? (
        <p>You have no campaigns yet.</p>
      ) : (
        <>
          <div
            className="campaign-list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}
          >
            {currentCampaigns.map(campaign => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                showEdit={true}
                allowWithdraw={true} // 👈 this enables the withdraw + delete logic if goal reached
                onUpdate={handleCampaignUpdate}
              />
            ))}
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
};

export default MyCampaigns;

