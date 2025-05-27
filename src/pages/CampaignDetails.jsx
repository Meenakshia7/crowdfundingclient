
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById } from '../features/campaigns/campaignSlice';
import './CampaignDetails.css'; // ⏪ import the CSS file

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentCampaign, status, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaignById(id));
  }, [dispatch, id]);

  if (status === 'loading') return <p className="details-loading">Loading campaign details...</p>;
  if (status === 'failed') return <p className="details-error">Error: {error}</p>;
  if (!currentCampaign) return <p className="details-empty">No campaign found.</p>;

  return (
    <div className="details-container">
      <div className="details-card">
        <h1>{currentCampaign.title}</h1>
        <p>{currentCampaign.description}</p>

        <p>
          <strong>Goal Amount:</strong> ${currentCampaign.goalAmount.toLocaleString()}
        </p>
        <p>
          <strong>Raised Amount:</strong> ${currentCampaign.raisedAmount?.toLocaleString() || 0}
        </p>
        <p>
          <strong>Status:</strong> {currentCampaign.status}
        </p>
        <p>
          <strong>Owner:</strong>{' '}
          {typeof currentCampaign.owner === 'object'
            ? currentCampaign.owner.email || currentCampaign.owner._id
            : currentCampaign.owner}
        </p>

        <p className="details-meta">
          Created at: {new Date(currentCampaign.createdAt).toLocaleString()}
        </p>
        <p className="details-meta">
          Last updated: {new Date(currentCampaign.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="details-back">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
