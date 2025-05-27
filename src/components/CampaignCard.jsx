
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCampaign } from '../features/campaigns/campaignSlice';
// import './CampaignCard.css'; // ⬅️ import the CSS file

// const CampaignCard = ({ campaign }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(state => state.auth.user);

//   const isOwner = user && campaign.ownerId === user._id;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this campaign?')) {
//       dispatch(deleteCampaign(campaign._id));
//     }
//   };

//   return (
//     <div className="campaign-card">
//       <h2 className="campaign-title">{campaign.title}</h2>
//       <p className="campaign-description">
//         {campaign.description.length > 100 ? campaign.description.slice(0, 100) + '...' : campaign.description}
//       </p>
//       <p className="campaign-stats">
//         Goal: ${campaign.goalAmount.toLocaleString()} | Raised: ${campaign.raisedAmount.toLocaleString()}
//       </p>
//       <p className="campaign-status">
//         Status: <strong>{campaign.status}</strong>
//       </p>

//       <Link to={`/campaigns/${campaign._id}`} className="campaign-link">
//         View Details
//       </Link>

//       {isOwner && (
//         <div className="campaign-owner-actions">
//           <button
//             className="campaign-button edit-button"
//             onClick={() => navigate(`/campaigns/${campaign._id}/edit`)}
//           >
//             Edit
//           </button>
//           <button
//             className="campaign-button delete-button"
//             onClick={handleDelete}
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CampaignCard;



import React from 'react';
import { Link } from 'react-router-dom';

const CampaignCard = ({ campaign }) => {
  return (
    <div style={styles.card}>
      <h2>{campaign.title}</h2>
      <p>{campaign.description.length > 100 ? campaign.description.slice(0, 100) + '...' : campaign.description}</p>
      <p>
        Goal: ${campaign.goalAmount.toLocaleString()} | Raised: ${campaign.raisedAmount.toLocaleString()}
      </p>
      <p>Status: <strong>{campaign.status}</strong></p>

      <Link to={`/campaigns/${campaign._id}`} style={styles.link}>
        View Details
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default CampaignCard;
