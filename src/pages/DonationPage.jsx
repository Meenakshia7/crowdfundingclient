
// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCampaignById } from '../features/campaigns/campaignSlice';
// import './DonationPage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


// const DonationPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentCampaign, status, error } = useSelector((state) => state.campaigns);

//   useEffect(() => {
//     dispatch(fetchCampaignById(id));
//   }, [dispatch, id]);

//   // INR formatting function
//   const formatINR = (num) => {
//     if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
//     if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
//     if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
//     return `₹${num.toLocaleString('en-IN')}`;
//   };

//   const handleShare = async () => {
//     const shareUrl = `${window.location.origin}/donate/${id}`;
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: currentCampaign.title,
//           text: `Support this campaign: ${currentCampaign.title}`,
//           url: shareUrl,
//         });
//         console.log('Shared successfully');
//       } catch (err) {
//         console.error('Error sharing:', err);
//       }
//     } else {
//       navigator.clipboard.writeText(shareUrl);
//       alert('Link copied to clipboard! Share it with your friends.');
//     }
//   };

//   const handleDonate = () => {
//     const mockPaymentUrl = `/mock-payment?campaign=${id}`;
//     navigate(mockPaymentUrl);
//   };

//   if (status === 'loading') return <p className="details-loading">Loading donation page...</p>;
//   if (status === 'failed') return <p className="details-error">Error: {error}</p>;
//   if (!currentCampaign) return <p className="details-empty">Campaign not found.</p>;

//   const percentage = Math.min(
//     Math.round((currentCampaign.raisedAmount / currentCampaign.goalAmount) * 100),
//     100
//   );

//   return (
//     <div className="donation-page-wrapper">
//       <button onClick={() => navigate(-1)} className="top-back-button">
//         <FontAwesomeIcon icon={faChevronLeft} /> Back
//       </button>

//       <div className="donation-card">
//         <h1 className="donation-title">{currentCampaign.title}</h1>
//         <p className="donation-description">{currentCampaign.description}</p>

//         <div className="progress-container">
//           <div className="progress-circle">
//             <svg width="120" height="120">
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="50"
//                 stroke="#e0e0e0"
//                 strokeWidth="10"
//                 fill="none"
//               />
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="50"
//                 stroke="#4caf50"
//                 strokeWidth="10"
//                 fill="none"
//                 strokeDasharray={2 * Math.PI * 50}
//                 strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 50}
//                 transform="rotate(-90 60 60)"
//                 style={{ transition: 'stroke-dashoffset 0.5s ease' }}
//               />
//               <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
//                 {percentage}%
//               </text>
//             </svg>
//           </div>
//         </div>

//         <p>
//           <strong>Goal:</strong> {formatINR(currentCampaign.goalAmount)}
//         </p>
//         <p>
//           <strong>Raised:</strong> {formatINR(currentCampaign.raisedAmount)}
//         </p>

//         <div className="button-group">
//           <button className="donate-action-button" onClick={handleDonate}>
//             Donate 
//           </button>

//           <button className="share-action-button" onClick={handleShare}>
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonationPage;


import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById } from '../features/campaigns/campaignSlice';
import './DonationPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentCampaign, status, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaignById(id));
  }, [dispatch, id]);

  // INR formatting function
  const formatINR = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

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
    const mockPaymentUrl = `/mock-payment?campaign=${id}`;
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
        <FontAwesomeIcon icon={faChevronLeft} /> Back
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
          <strong>Goal:</strong> {formatINR(currentCampaign.goalAmount)}
        </p>
        <p>
          <strong>Raised:</strong> {formatINR(currentCampaign.raisedAmount)}
        </p>

        <div className="button-group">
          <button
            className="donate-action-button"
            onClick={handleDonate}
            disabled={currentCampaign.raisedAmount >= currentCampaign.goalAmount}
          >
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
