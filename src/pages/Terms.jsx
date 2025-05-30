import React from 'react';
import './Terms.css';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>

      <p>Last updated: May 29, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to FundHub. These Terms and Conditions ("Terms") govern your access 
        to and use of the FundHub platform, including all features, content, and services 
        we provide. By using our platform, you agree to abide by these Terms and our 
        Privacy Policy. If you do not agree, please do not use FundHub.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old (or the age of majority in your jurisdiction) 
        to create an account or make a donation on FundHub. By using the platform, you 
        represent that you meet these age requirements and that you have the legal 
        capacity to enter into a binding agreement. We may terminate or restrict access 
        if we believe you do not meet these eligibility requirements.
      </p>

      <h2>3. Use of the Platform</h2>
      <p>
        FundHub provides a space for individuals, nonprofits, and organizations to create 
        fundraising campaigns and for donors to contribute to those causes. You agree to 
        use the platform responsibly and only for its intended purpose. Misuse, unauthorized 
        access, or any harmful activities on the platform are strictly prohibited.
      </p>

      <h2>4. User Obligations</h2>
      <p>
        When creating an account or campaign, you must provide accurate, current, and complete 
        information. You are responsible for keeping your login credentials secure and for all 
        activities under your account. You agree to notify us immediately if you suspect any 
        unauthorized use or security breaches. We are not responsible for losses due to your 
        failure to safeguard your account.
      </p>

      <h2>5. Prohibited Activities</h2>
      <p>
        You agree not to engage in activities that:
        <ul>
          <li>Violate laws, regulations, or third-party rights</li>
          <li>Submit false, misleading, or fraudulent information or campaigns</li>
          <li>Distribute harmful code, viruses, or malware</li>
          <li>Harass, threaten, or abuse other users</li>
          <li>Infringe upon intellectual property or proprietary rights</li>
          <li>Attempt to reverse-engineer, hack, or disrupt platform operations</li>
        </ul>
        We reserve the right to suspend or terminate accounts engaging in these activities.
      </p>

      <h2>6. Donations</h2>
      <p>
        Donations made on FundHub are voluntary, final, and non-refundable. Donors are 
        responsible for carefully reviewing the details, goals, and legitimacy of a campaign 
        before contributing. FundHub is not responsible for the outcome or use of funds by 
        campaign owners, though we strive to monitor campaigns for compliance.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on FundHub — including logos, graphics, text, software, and the platform 
        itself — is the intellectual property of FundHub or its licensors. You are granted 
        a limited, non-exclusive, non-transferable license to use the platform solely for 
        personal or internal business use. Unauthorized reproduction, distribution, or 
        commercial use of our materials is strictly prohibited.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        FundHub provides the platform on an "as is" and "as available" basis without warranties 
        of any kind. We are not responsible for:
        <ul>
          <li>Delays, interruptions, or errors in platform availability</li>
          <li>Losses or damages arising from donations, campaigns, or third-party services</li>
          <li>Unauthorized access to or use of user data</li>
        </ul>
        To the fullest extent permitted by law, FundHub’s liability is limited to the amount 
        you paid us (if any) in the past 12 months.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction where FundHub is incorporated. 
        Any disputes arising under or in connection with these Terms will be subject to the 
        exclusive jurisdiction of the local courts. You agree to comply with all applicable 
        local, state, and international laws when using FundHub.
      </p>

      <h2>10. Dispute Resolution</h2>
      <p>
        We encourage users to contact us directly at 
        <a href="mailto:support@fundhub.com"> support@fundhub.com</a> 
        to resolve any disputes or concerns. If we are unable to resolve the issue, 
        you agree that any legal disputes will be resolved through binding arbitration 
        or mediation, rather than in court, to the extent permitted by law.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We reserve the right to modify or update these Terms at any time. We will notify 
        users of material changes by posting an updated version on the website or through 
        email. Continued use of the platform after changes are posted constitutes acceptance 
        of the revised Terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions, concerns, or feedback regarding these Terms, please reach out to us:
        <br />
        Email: <a href="mailto:support@fundhub.com">support@fundhub.com</a>
        <br />
        
      </p>
      <Footer/>
    </div>
  );
};

export default Terms;
