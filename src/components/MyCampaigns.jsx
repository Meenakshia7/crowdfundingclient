
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCampaign } from '../features/campaigns/campaignSlice';
// import { useNavigate } from 'react-router-dom';

// const CampaignCard = ({ campaign }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(state => state.auth.user);

//   const isOwner = user && user._id === campaign.ownerId;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this campaign?')) {
//       dispatch(deleteCampaign(campaign._id));
//     }
//   };

//   return (
//     <div className="campaign-card">
//       <h3>{campaign.title}</h3>
//       <p>{campaign.description}</p>
//       <p>Goal: ${campaign.goalAmount}</p>

//       {isOwner && (
//         <div className="campaign-actions">
//           <button onClick={() => navigate(`/campaigns/${campaign._id}/edit`)}>Edit</button>
//           <button onClick={handleDelete}>Delete</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CampaignCard;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCampaigns } from '../features/campaigns/campaignSlice';
import CampaignCard from '../components/CampaignCard';

const MyCampaigns = () => {
  const dispatch = useDispatch();
  const { userCampaigns, status, error } = useSelector(state => state.campaigns);

  useEffect(() => {
    dispatch(fetchUserCampaigns());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading your campaigns...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Campaigns</h1>
      {userCampaigns.length === 0 ? (
        <p>You have no campaigns yet.</p>
      ) : (
        userCampaigns.map(campaign => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))
      )}
    </div>
  );
};

export default MyCampaigns;
