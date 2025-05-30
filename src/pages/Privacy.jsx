import React from 'react';
import './Privacy.css';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>

      <p>Last updated: May 29, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        FundHub ("we," "our," "us") values your privacy and is committed to protecting 
        your personal information. This Privacy Policy explains how we collect, use, 
        and safeguard your data when you use our platform.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We may collect the following types of information:
        <ul>
          <li>Personal Information: Name, email address, mailing address, phone number</li>
          <li>Account Information: Username, password, profile details</li>
          <li>Payment Information: Donation amounts, payment method (processed securely by third-party providers)</li>
          <li>Usage Data: IP address, browser type, pages visited, device type</li>
          <li>Cookies and Tracking: Cookies and similar technologies to enhance user experience</li>
        </ul>
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use the collected information to:
        <ul>
          <li>Provide, operate, and improve the FundHub platform</li>
          <li>Process donations and transactions</li>
          <li>Communicate with users, including sending updates or notifications</li>
          <li>Ensure the security and integrity of our services</li>
          <li>Comply with legal obligations and enforce our Terms</li>
        </ul>
      </p>

      <h2>4. Sharing Your Information</h2>
      <p>
        We may share your information with:
        <ul>
          <li>Third-party payment processors to complete transactions</li>
          <li>Service providers that help us operate the platform (e.g., hosting, analytics)</li>
          <li>Legal authorities if required by law or to protect FundHub’s rights</li>
          <li>With your consent, in any other specific cases</li>
        </ul>
        We do not sell your personal information to third parties.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your 
        information. However, no system is 100% secure, and we cannot guarantee the 
        absolute security of your data. Please take steps to protect your own information, 
        such as using strong passwords.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to:
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict certain data processing activities</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>File a complaint with a data protection authority</li>
        </ul>
        To exercise your rights, contact us at 
        <a href="mailto:support@fundhub.com"> support@fundhub.com</a>.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain your personal data only as long as necessary to fulfill the purposes 
        described in this policy, comply with legal obligations, or resolve disputes. 
        When no longer needed, we securely delete or anonymize your data.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        If you access FundHub from outside the country where we operate, your information 
        may be transferred and processed across borders. By using the platform, you 
        consent to such international data transfers.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify users of 
        significant changes by posting updates on the website or sending notifications. 
        Please review this policy periodically.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us:
        <br />
        Email: <a href="mailto:support@fundhub.com">support@fundhub.com</a>
        <br />
        
      </p>
      <Footer/>
    </div>
  );
};

export default Privacy;
