
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../features/campaigns/campaignSlice';
import './Home.css';
import Footer from '../components/Footer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < value) {
        setDisplayValue(start);
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [value]);

  return <span>{displayValue.toFixed(1)}</span>;
};

// Format numbers as ₹10K, ₹1.5L, ₹2Cr
const formatINR = (num) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num.toLocaleString('en-IN')}`;
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { campaigns, status, error } = useSelector((state) => state.campaigns);

  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 8;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCampaigns());
    }
  }, [status, dispatch]);

  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const backendUrl = 'http://localhost:3001';

  return (
    <div className="home-container">
      <header className="home-hero">
        <h1>Welcome to FundHub</h1>
        <p>Your place to support meaningful campaigns and make a difference.</p>

        <Link to="/auth" className="home-cta">
          Sign Up
        </Link>
      </header>

      <section className="home-features">
        {status === 'loading' && <p>Loading campaigns...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="campaign-grid">
          {currentCampaigns.map((campaign) => {
            const progressPercentage = Math.min(
              (campaign.raisedAmount / campaign.goalAmount) * 100,
              100
            );

            const imageUrl = campaign.image
              ? `${backendUrl}/uploads/${campaign.image}`
              : '/placeholder.jpg';

            return (
              <div key={campaign.id} className="campaign-card">
                <div className="campaign-image-container">
                  <img
                    src={imageUrl}
                    alt={campaign.title}
                    className="campaign-image"
                  />
                </div>

                <div className="campaign-content">
                  <h2 className="campaign-title">{campaign.title}</h2>

                  <p className="campaign-description">
                    {campaign.description?.length > 80
                      ? campaign.description.slice(0, 80) + '...'
                      : campaign.description}
                  </p>

                  <div className="donation-stats">
                    <span>{formatINR(campaign.raisedAmount)}</span> raised of{' '}
                    <span>{formatINR(campaign.goalAmount)}</span>
                  </div>

                  <div className="progress-section">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="progress-percentage">
                      <AnimatedNumber value={progressPercentage} />% funded
                    </div>
                  </div>

                  <button
                    className="donate-button"
                    onClick={() => navigate(`/donate/${campaign._id}`)}
                  >
                    Donate
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <FaChevronRight />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;




