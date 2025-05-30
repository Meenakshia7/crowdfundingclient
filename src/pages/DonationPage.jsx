

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById } from '../features/campaigns/campaignSlice';
import './DonationPage.css';

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentCampaign, status, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaignById(id));
  }, [dispatch, id]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/donate/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentCampaign.title,
          text: `Support this campaign: ${currentCampaign.title}`,
          url: shareUrl,
        });
        console.log('Shared successfully');
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard! Share it with your friends.');
    }
  };

  const handleDonate = () => {
    // 🚀 MOCK PAYMENT REDIRECT: replace this with real Stripe/Razorpay link later
    const mockPaymentUrl = `/mock-payment?campaign=${id}`;
    // window.location.href = mockPaymentUrl;
    navigate(mockPaymentUrl);
  };

  if (status === 'loading') return <p className="details-loading">Loading donation page...</p>;
  if (status === 'failed') return <p className="details-error">Error: {error}</p>;
  if (!currentCampaign) return <p className="details-empty">Campaign not found.</p>;

  const percentage = Math.min(
    Math.round((currentCampaign.raisedAmount / currentCampaign.goalAmount) * 100),
    100
  );

  return (
    <div className="donation-page-wrapper">
      <button onClick={() => navigate(-1)} className="top-back-button">
        ← Back
      </button>

      <div className="donation-card">
        <h1 className="donation-title">{currentCampaign.title}</h1>
        <p className="donation-description">{currentCampaign.description}</p>

        <div className="progress-container">
          <div className="progress-circle">
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e0e0e0"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#4caf50"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 50}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
                {percentage}%
              </text>
            </svg>
          </div>
        </div>

        <p>
          <strong>Goal:</strong> ${currentCampaign.goalAmount.toLocaleString()}
        </p>
        <p>
          <strong>Raised:</strong> ${currentCampaign.raisedAmount.toLocaleString()}
        </p>

        <div className="button-group">
          <button className="donate-action-button" onClick={handleDonate}>
            Donate 
          </button>

          <button className="share-action-button" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
