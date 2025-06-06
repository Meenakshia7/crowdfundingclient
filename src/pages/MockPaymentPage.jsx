
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './MockPaymentPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const MockPaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign');

  const [campaignTitle, setCampaignTitle] = useState('Loading...');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const formatINR = (num) => {
    if (!num) return '';
    const number = Number(num);
    if (number >= 10000000) return `₹${(number / 10000000).toFixed(1)}Cr`;
    if (number >= 100000) return `₹${(number / 100000).toFixed(1)}L`;
    if (number >= 1000) return `₹${(number / 1000).toFixed(1)}K`;
    return `₹${number.toLocaleString('en-IN')}`;
  };

  // Fetch the campaign title
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/campaigns/${campaignId}`);
        setCampaignTitle(response.data.title || 'Untitled Campaign');
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setCampaignTitle('Unknown Title');
      }
    };

    if (campaignId) {
      fetchCampaign();
    } else {
      setCampaignTitle('Unknown Title');
    }
  }, [campaignId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaignId) {
      setPopupMessage('Campaign ID is missing.');
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const donationPayload = {
        amount: Number(formData.amount),
        message: `Donation from ${formData.name}`,
        campaignId: campaignId,
        donorName: formData.name,
        donorEmail: formData.email,
      };

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}; // No headers if not logged in

      const response = await axios.post(
        'http://localhost:3001/api/donations',
        donationPayload,
        config
      );

      console.log('Donation response:', response.data);

      setPopupMessage(
        `✅ Payment successful!\nThank you, ${formData.name}, for donating ${formatINR(
          formData.amount
        )} to "${campaignTitle}".`
      );
    } catch (error) {
      console.error('Error making donation:', error);
      setPopupMessage('❌ Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopupMessage('');
    if (popupMessage.startsWith('✅')) {
      navigate('/campaigns');
    }
  };

  return (
    <div className="mock-payment-container">
      <h1>Mock Payment Page</h1>
      <p>
        Title: <strong>{campaignTitle}</strong>
      </p>

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
          Amount (INR):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <button type="submit" className="confirm-button" disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </form>

      <button onClick={() => navigate(-1)} className="back-button">
        <FontAwesomeIcon icon={faChevronLeft} /> Back
      </button>

      {popupMessage && (
        <div className="popup-message">
          <span>{popupMessage}</span>
          <button onClick={closePopup} aria-label="Close popup">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MockPaymentPage;
