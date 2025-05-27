
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCampaign, updateCampaign, fetchCampaignById } from './campaignSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './CampaignForm.css'; // Scoped CSS for this component only

const CampaignForm = () => {
  const { id } = useParams(); // If editing, get id from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentCampaign, loading, error } = useSelector((state) => state.campaigns);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  // If editing, fetch existing campaign details on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }
  }, [dispatch, id]);

  // Populate form fields when currentCampaign updates (edit mode)
  useEffect(() => {
    if (id && currentCampaign) {
      setTitle(currentCampaign.title || '');
      setDescription(currentCampaign.description || '');
      setGoalAmount(currentCampaign.goalAmount || '');
    }
  }, [id, currentCampaign]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !goalAmount) {
      alert('Please fill all fields');
      return;
    }

    const campaignData = {
      title,
      description,
      goalAmount: Number(goalAmount),
    };

    if (id) {
      // Update campaign
      dispatch(updateCampaign({ id, campaignData })).then((res) => {
        if (!res.error) {
          navigate(`/campaigns/${id}`);
        }
      });
    } else {
      // Create campaign
      dispatch(createCampaign(campaignData)).then((res) => {
        if (!res.error) {
          navigate('/campaigns');
        }
      });
    }
  };

  return (
    <div className="campaign-form-container">
      <h2>{id ? 'Edit Campaign' : 'Create New Campaign'}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={1000}
          />
        </div>

        <div className="form-group">
          <label htmlFor="goalAmount">Goal Amount:</label>
          <input
            id="goalAmount"
            type="number"
            min="1"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {id ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
