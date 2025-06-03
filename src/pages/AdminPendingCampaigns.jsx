

import React, { useEffect, useState } from 'react';
import adminAPI from '../features/admin/adminAPI';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const AdminPendingCampaigns = () => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    goalAmount: '',
    image: null,
  });

  const adminToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const response = await adminAPI.getPendingCampaigns(adminToken);
        setPendingCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, [adminToken]);

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveCampaign(id, adminToken);
      alert('Campaign approved!');
      setPendingCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error approving campaign');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectCampaign(id, adminToken);
      alert('Campaign rejected!');
      setPendingCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error rejecting campaign');
    }
  };

  const openEditModal = (campaign) => {
    setEditingCampaign(campaign);
    setEditForm({
      title: campaign.title,
      description: campaign.description,
      goalAmount: campaign.goalAmount,
      image: null, // Reset image, user can upload new
    });
  };

  const closeEditModal = () => {
    setEditingCampaign(null);
    setEditForm({
      title: '',
      description: '',
      goalAmount: '',
      image: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingCampaign) return;

    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      formData.append('goalAmount', editForm.goalAmount);
      if (editForm.image) {
        formData.append('image', editForm.image);
      }

      // Assuming you have an endpoint to update campaigns for admin:
      // Adjust path as per your backend routes
      await adminAPI.updateCampaign(editingCampaign._id, formData, adminToken);

      alert('Campaign updated successfully!');
      // Refresh list or update state locally
      setPendingCampaigns((prev) =>
        prev.map((c) =>
          c._id === editingCampaign._id
            ? { ...c, title: editForm.title, description: editForm.description, goalAmount: editForm.goalAmount, image: editForm.image ? URL.createObjectURL(editForm.image) : c.image }
            : c
        )
      );
      closeEditModal();
    } catch (err) {
      console.error(err);
      alert('Error updating campaign');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (pendingCampaigns.length === 0) return <p>No pending campaigns.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pending Campaigns</h1>
      {pendingCampaigns.map((campaign) => (
        <div
          key={campaign._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '1rem 0',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            gap: '1rem',
          }}
        >
          {/* Campaign image */}
          {campaign.image && (
            <img
              src={`/uploads/${campaign.image}`}
              alt={campaign.title}
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          )}

          {/* Campaign info */}
          <div style={{ flex: 1 }}>
            <h3>{campaign.title}</h3>
            <p><strong>Description:</strong> {campaign.description}</p>
            <p><strong>Goal Amount:</strong> ₹{campaign.goalAmount}</p>
            <p><strong>Raised Amount:</strong> ₹{campaign.raisedAmount}</p>
            <p><strong>Deadline:</strong> {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Created At:</strong> {new Date(campaign.createdAt).toLocaleString()}</p>
            <hr />
            <p><strong>Created By:</strong> {campaign.owner?.name} ({campaign.owner?.email})</p>
            <p><strong>User Role:</strong> {campaign.owner?.role}</p>
            <p><strong>User Since:</strong> {new Date(campaign.owner?.createdAt).toLocaleDateString()}</p>

            {/* Action buttons */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleApprove(campaign._id)}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <FaCheck /> Approve
              </button>

              <button
                onClick={() => handleReject(campaign._id)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <FaTimes /> Reject
              </button>

              <button
                onClick={() => openEditModal(campaign)}
                style={{
                  backgroundColor: '#ff9800',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingCampaign && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={closeEditModal} // close on clicking outside modal
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '2rem',
              width: '400px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2>Edit Campaign</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                  rows={4}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="goalAmount">Goal Amount (₹)</label>
                <input
                  type="number"
                  id="goalAmount"
                  name="goalAmount"
                  value={editForm.goalAmount}
                  onChange={handleEditChange}
                  required
                  min={1}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPendingCampaigns;
