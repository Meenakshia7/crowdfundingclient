// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const MockPaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const campaignId = params.get('campaign');

//   const handleSuccess = () => {
//     alert('Payment successful! Thank you for your donation.');
//     navigate(`/campaigns/${campaignId}`);
//   };

//   const handleCancel = () => {
//     alert('Payment canceled.');
//     navigate(`/donate/${campaignId}`);
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//       <h1>Mock Payment Page</h1>
//       <p>You're donating to campaign ID: {campaignId}</p>
//       <button onClick={handleSuccess} style={{ marginRight: '1rem' }}>
//         Simulate Success
//       </button>
//       <button onClick={handleCancel}>Simulate Cancel</button>
//     </div>
//   );
// };

// export default MockPaymentPage;



import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './MockPaymentPage.css'; // create this CSS file for styling

const MockPaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful payment
    alert(
      `Payment successful!\nThank you, ${formData.name}, for donating $${formData.amount} to campaign ${campaignId}.`
    );

    // Redirect back to campaigns or dashboard
    navigate('/campaigns');
  };

  return (
    <div className="mock-payment-container">
      <h1>Mock Payment Page</h1>
      <p>Campaign ID: {campaignId}</p>

      <form className="mock-payment-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount (USD):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <button type="submit" className="confirm-button">
          Confirm Payment
        </button>
      </form>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default MockPaymentPage;
