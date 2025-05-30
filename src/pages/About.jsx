import React from 'react';
import './About.css';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-container">
      <h1>About FundHub</h1>
      <p>
        FundHub is a platform dedicated to connecting passionate individuals and organizations 
        with causes that matter. We believe in the power of collective action, 
        where small contributions can create massive impact.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to empower changemakers, social entrepreneurs, and non-profits 
        by providing them with the tools and visibility they need to bring their visions to life. 
        Whether it's supporting education, healthcare, environmental projects, or local community initiatives, 
        FundHub makes it easy for people to give and get involved.
      </p>

      <h2>Why Choose FundHub?</h2>
      <ul>
        <li>✅ Easy-to-use fundraising tools</li>
        <li>✅ Transparent progress tracking</li>
        <li>✅ Secure and reliable donation process</li>
        <li>✅ A passionate community of donors and supporters</li>
      </ul>

      <h2>Join Us</h2>
      <p>
        Ready to make a difference? Explore active campaigns, start your own fundraiser, 
        or join our growing community of change agents today!
      </p>
      <Footer/>
    </div>
  );
};

export default About;
