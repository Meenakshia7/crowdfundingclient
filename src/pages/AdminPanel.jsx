import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => navigate('/admin/pending-campaigns')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#f39c12',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Pending Campaigns
        </button>

        <button
          onClick={() => navigate('/admin/users')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
