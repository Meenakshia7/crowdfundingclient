import React from 'react';
import { useGetDonationsByCampaignQuery } from './donationAPI';

const DonationList = ({ campaignId }) => {
  const { data: donations, isLoading, isError } = useGetDonationsByCampaignQuery(campaignId);

  if (isLoading) return <p>Loading donations...</p>;
  if (isError) return <p>Failed to load donations.</p>;
  if (!donations?.length) return <p>No donations yet.</p>;

  return (
    <ul>
      {donations.map((donation) => (
        <li key={donation._id}>
          <strong>${donation.amount}</strong> by {donation.user.name} - {donation.message || 'No message'}
        </li>
      ))}
    </ul>
  );
};

export default DonationList;
