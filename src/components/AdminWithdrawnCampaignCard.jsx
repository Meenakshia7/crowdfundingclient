import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// This wrapper hides all actions except "View Details" for withdrawn cards
const AdminWithdrawnCampaignCard = ({ campaign }) => {
  const isWithdrawn = campaign.withdrawn === true || campaign.withdrawn === 'true';

  return (
    <div className="campaign-card">
      {campaign.image && (
        <div className="campaign-image-container">
          <img
            src={`http://localhost:3001/uploads/${campaign.image}`}
            alt={campaign.title}
            className="campaign-image"
          />
        </div>
      )}

      <div className="campaign-content">
        <h2 className="campaign-title">{campaign.title}</h2>
        <p className="campaign-description">
          {campaign.description?.length > 100
            ? `${campaign.description.slice(0, 100)}...`
            : campaign.description}
        </p>
        <p className="campaign-goal">
          Goal: ₹{campaign.goalAmount} | Raised: ₹{campaign.raisedAmount}
        </p>
        <p className="campaign-status">
          Status: <strong>{isWithdrawn ? 'Withdrawn' : campaign.status}</strong>
        </p>

        <div className="button-row actions-row">
          <Link to={`/campaigns/${campaign?._id}`} className="btn details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

AdminWithdrawnCampaignCard.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    goalAmount: PropTypes.number,
    raisedAmount: PropTypes.number,
    status: PropTypes.string,
    image: PropTypes.string,
    withdrawn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }).isRequired,
};

export default AdminWithdrawnCampaignCard;
