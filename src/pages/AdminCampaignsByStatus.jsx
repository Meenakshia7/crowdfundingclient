

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import adminAPI from '../features/admin/adminAPI';
import CampaignCard from '../components/CampaignCard';
import AdminWithdrawnCampaignCard from '../components/AdminWithdrawnCampaignCard'; // ✅ new import

const PAGE_SIZE = 8;

const AdminCampaignsByStatus = () => {
  const { status } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await adminAPI.getCampaignsByStatus(status, token);
        setCampaigns(response.data);
        setCurrentPage(1);
      } catch (err) {
        setError('Failed to load campaigns.');
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [status]);

  const totalPages = Math.ceil(campaigns.length / PAGE_SIZE);
  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Campaigns with status: {status}</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'flex-start',
            }}
          >
            {paginatedCampaigns.map((campaign) =>
              status.toLowerCase() === 'withdrawn' ? (
                <AdminWithdrawnCampaignCard key={campaign._id} campaign={campaign} />
              ) : (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign}
                  showEdit={false}
                  allowWithdraw={false}
                />
              )
            )}
          </div>

          {totalPages > 1 && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ marginRight: '10px' }}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                  style={{
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    marginRight: '5px',
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ marginLeft: '10px' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCampaignsByStatus;
