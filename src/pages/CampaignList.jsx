
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../features/campaigns/campaignSlice';
import CampaignCard from '../components/CampaignCard';

const CampaignList = () => {
  const dispatch = useDispatch();
  const { campaigns, isLoading, error } = useSelector(state => state.campaigns);

  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 8;

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  // Calculate displayed campaigns
  const indexOfLast = currentPage * campaignsPerPage;
  const indexOfFirst = indexOfLast - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (isLoading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error loading campaigns: {error}</p>;

  return (
    <section style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Campaigns</h1>
      </div>

      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <>
          <div
            className="campaign-list"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}
          >
            {currentCampaigns.map(campaign => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                showEdit={false}  // ✅ explicitly no edit button here
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px'
            }}
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                margin: '0 10px',
                border: 'none',
                backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
                color: 'white',
                borderRadius: '5px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                margin: '0 10px',
                border: 'none',
                backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
                color: 'white',
                borderRadius: '5px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CampaignList;
