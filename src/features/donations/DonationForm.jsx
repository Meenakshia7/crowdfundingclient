import React, { useState } from 'react';
import { useCreateDonationMutation } from './donationAPI';

const DonationForm = ({ campaignId }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [createDonation, { isLoading, error }] = useCreateDonationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonation({ amount: Number(amount), message, campaignId }).unwrap();
      alert('Donation successful!');
      setAmount('');
      setMessage('');
    } catch (err) {
      alert('Failed to donate: ' + err.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in $"
        required
      />
      <input
        type="text"
        maxLength="200"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (optional)"
      />
      <button type="submit" disabled={isLoading}>
        Donate
      </button>
      {error && <p>Error: {error.data?.message || 'Something went wrong'}</p>}
    </form>
  );
};

export default DonationForm;
