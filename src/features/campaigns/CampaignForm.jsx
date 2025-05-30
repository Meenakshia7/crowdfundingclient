
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCampaign, updateCampaign, fetchCampaignById } from './campaignSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './CampaignForm.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const CampaignForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentCampaign, loading, error } = useSelector((state) => state.campaigns);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [imageFile, setImageFile] = useState(null);  // For new uploaded file
  const [previewUrl, setPreviewUrl] = useState('');  // For preview

  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && currentCampaign) {
      setTitle(currentCampaign.title || '');
      setDescription(currentCampaign.description || '');
      setGoalAmount(currentCampaign.goalAmount || '');

      // Build server image URL if image exists and no new upload yet
      if (currentCampaign.image && !imageFile) {
        setPreviewUrl(`${BACKEND_URL}/uploads/${currentCampaign.image}`);
      }
    }
  }, [id, currentCampaign, imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Preview local uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !goalAmount) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('goalAmount', Number(goalAmount));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (id) {
      dispatch(updateCampaign({ id, campaignData: formData })).then((res) => {
        if (!res.error) {
          navigate(`/campaigns/${id}`);
        }
      });
    } else {
      dispatch(createCampaign(formData)).then((res) => {
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

      <form onSubmit={handleSubmit} className="campaign-form" encType="multipart/form-data">
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

        <div className="form-group">
          <label htmlFor="image">Campaign Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ marginTop: '10px', maxWidth: '300px', maxHeight: '200px', borderRadius: '8px' }}
            />
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {id ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
