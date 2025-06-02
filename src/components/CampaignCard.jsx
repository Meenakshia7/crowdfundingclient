
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './CampaignCard.css';

const formatINR = (num) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num.toLocaleString('en-IN')}`;
};

const CampaignCard = ({ campaign, onUpdate, showEdit = false, allowWithdraw = false }) => {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3001';
  const imageUrl = campaign?.image ? `${backendUrl}/uploads/${campaign.image}` : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: campaign?.title || '',
    description: campaign?.description || '',
    goalAmount: campaign?.goalAmount || 0,
  });
  const [loading, setLoading] = useState(false);

  const isGoalReached = campaign?.raisedAmount >= campaign?.goalAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleWithdraw = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to withdraw funds from "${campaign?.title}"?`)) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post(
        `${backendUrl}/api/campaigns/${campaign._id}/withdraw`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(`Funds withdrawn from "${campaign?.title}" successfully.`);
      if (onUpdate) onUpdate(res.data);
    } catch (err) {
      console.error('Failed to withdraw funds:', err);
      alert('Failed to withdraw funds. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [campaign, onUpdate]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to delete "${campaign?.title}"?`)) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`${backendUrl}/api/campaigns/${campaign._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert(`Campaign "${campaign?.title}" deleted successfully.`);
      if (onUpdate) onUpdate(null);
    } catch (err) {
      console.error('Failed to delete campaign:', err);
      alert('Failed to delete campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [campaign, onUpdate]);

  return (
    <div className="campaign-card">
      {imageUrl && (
        <div className="campaign-image-container">
          <img src={imageUrl} alt={campaign?.title} className="campaign-image" />
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
              aria-label="Campaign title input"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="campaign-textarea"
              aria-label="Campaign description input"
            />
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              placeholder="Goal Amount"
              className="campaign-input"
              aria-label="Campaign goal amount input"
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
            <h2 className="campaign-title">{campaign?.title}</h2>
            <p className="campaign-description">
              {campaign?.description?.length > 100
                ? `${campaign.description.slice(0, 100)}...`
                : campaign?.description}
            </p>
            <p className="campaign-goal">
              Goal: {formatINR(campaign?.goalAmount)} | Raised: {formatINR(campaign?.raisedAmount)}
            </p>
            <p className="campaign-status">
              Status:{' '}
              <strong>
                {campaign?.withdrawn
                  ? 'Withdrawn'
                  : isGoalReached
                  ? 'Completed'
                  : campaign?.status || 'Active'}
              </strong>
            </p>

            <div className="button-row actions-row">
              <Link to={`/campaigns/${campaign?._id}`} className="btn details-btn">
                View Details
              </Link>

              {showEdit && (
                <>
                  {campaign.withdrawn ? (
                    <>
                      <button
                        onClick={handleDelete}
                        className="btn delete-btn"
                        title="Delete Campaign"
                        aria-label="Delete Campaign"
                        disabled={loading}
                      >
                        <FiTrash2 size={20} />
                      </button>
                      <button className="btn withdrawn-btn" disabled>
                        Withdrawn
                      </button>
                    </>
                  ) : isGoalReached ? (
                    <>
                      <button
                        onClick={handleDelete}
                        className="btn delete-btn"
                        title="Delete Campaign"
                        aria-label="Delete Campaign"
                        disabled={loading}
                      >
                        <FiTrash2 size={20} />
                      </button>
                      {allowWithdraw && (
                        <button
                          onClick={handleWithdraw}
                          className="btn withdraw-btn"
                          disabled={loading}
                          aria-label="Withdraw Funds"
                        >
                          Withdraw
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn edit-btn"
                      title="Edit Campaign"
                      aria-label="Edit Campaign"
                    >
                      <FiEdit size={20} />
                    </button>
                  )}
                </>
              )}

              {!campaign.withdrawn && !isGoalReached && (
                <button
                  onClick={() => navigate(`/donate/${campaign?._id}`)}
                  className="btn donate-btn"
                  aria-label="Donate"
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

CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    goalAmount: PropTypes.number,
    raisedAmount: PropTypes.number,
    status: PropTypes.string,
    image: PropTypes.string,
    withdrawn: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func,
  showEdit: PropTypes.bool,
  allowWithdraw: PropTypes.bool,
};

export default CampaignCard;



