
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

        {currentCampaigns.map((campaign) => {
          const progressPercentage = Math.min(
            (campaign.raisedAmount / campaign.goalAmount) * 100,
            100
          );

          return (
            <div key={campaign.id} className="feature-card">
              <h2>{campaign.title}</h2>

              <div className="donation-stats">
                <span>${campaign.raisedAmount.toLocaleString()}</span> raised of{' '}
                <span>${campaign.goalAmount.toLocaleString()}</span>
              </div>

              <div className="card-bottom">
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

                <button onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                  View Campaign
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )} */}
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
<Footer/>
    </div>
  );
};

export default Home;
