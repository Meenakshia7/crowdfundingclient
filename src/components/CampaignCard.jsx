
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './CampaignCard.css';

// Format numbers as ₹10K, ₹1.5L, ₹2Cr
const formatINR = (num) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num.toLocaleString('en-IN')}`;
};

const CampaignCard = ({ campaign, onUpdate, showEdit = false, allowWithdraw = false }) => {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3001';
  const imageUrl = campaign.image ? `${backendUrl}/uploads/${campaign.image}` : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goalAmount: campaign.goalAmount,
  });
  const [loading, setLoading] = useState(false);

  const isGoalReached = campaign.raisedAmount >= campaign.goalAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.put(`${backendUrl}/api/campaigns/${campaign._id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (onUpdate) onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update campaign:', err);
      alert('Failed to update campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = () => {
    alert(`Withdrawing funds from campaign: "${campaign.title}"`);
    // Add real withdraw logic here
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${campaign.title}"?`)) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`${backendUrl}/api/campaigns/${campaign._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert(`Campaign "${campaign.title}" deleted successfully.`);
      if (onUpdate) onUpdate(null);
    } catch (err) {
      console.error('Failed to delete campaign:', err);
      alert('Failed to delete campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="campaign-card">
      {imageUrl && (
        <div className="campaign-image-container">
          <img src={imageUrl} alt={campaign.title} className="campaign-image" />
        </div>
      )}

      <div className="campaign-content">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="campaign-input"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="campaign-textarea"
            />
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              placeholder="Goal Amount"
              className="campaign-input"
            />
            <div className="button-row">
              <button onClick={handleSave} disabled={loading} className="btn save-btn">
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsEditing(false)} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="campaign-title">{campaign.title}</h2>
            <p className="campaign-description">
              {campaign.description.length > 100
                ? campaign.description.slice(0, 100) + '...'
                : campaign.description}
            </p>
            <p className="campaign-goal">
              Goal: {formatINR(campaign.goalAmount)} | Raised: {formatINR(campaign.raisedAmount)}
            </p>
            <p className="campaign-status">
              Status: <strong>{campaign.status}</strong>
            </p>

            <div className="button-row actions-row">
              <Link to={`/campaigns/${campaign._id}`} className="btn details-btn">
                View Details
              </Link>

              {showEdit && (
                isGoalReached ? (
                  allowWithdraw && (
                    <button
                      onClick={handleDelete}
                      className="btn delete-btn"
                      title="Delete Campaign"
                      aria-label="Delete Campaign"
                      disabled={loading}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn edit-btn"
                    title="Edit Campaign"
                    aria-label="Edit Campaign"
                  >
                    <FiEdit size={20} />
                  </button>
                )
              )}

              {isGoalReached && allowWithdraw ? (
                <button
                  onClick={handleWithdraw}
                  className="btn withdraw-btn"
                  disabled={loading}
                >
                  Withdraw
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/donate/${campaign._id}`)}
                  className="btn donate-btn"
                >
                  Donate
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
