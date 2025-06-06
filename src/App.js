
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './features/auth/AuthForm';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CampaignList from './pages/CampaignList';
import CampaignDetails from './pages/CampaignDetails';
import CampaignForm from './features/campaigns/CampaignForm';
import AdminCampaignsByStatus from './pages/AdminCampaignsByStatus';
import UserManagement from './features/admin/UserManagement';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import GuestRoute from './components/GuestRoute';
import DonationPage from './pages/DonationPage';
import MockPaymentPage from './pages/MockPaymentPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminPendingCampaigns from './pages/AdminPendingCampaigns'; // ✅ NEW import
import AdminPanel from './pages/AdminPanel';
import Settings from './components/settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public home page (no Navbar) */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Donation page accessible publicly (no auth required) */}
        <Route path="/donate/:id" element={<DonationPage />} />

        {/* Mock Payment page public */}
        <Route path="/mock-payment" element={<MockPaymentPage />} />

        {/* Routes only for guests (not logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthForm />} />
        </Route>

        {/* Protected routes (only logged-in users) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/settings" element={<Settings />} />
            {/* Create new campaign */}
            <Route path="/campaigns/new" element={<CampaignForm />} />

            {/* Edit existing campaign */}
            <Route path="/campaigns/:id/edit" element={<CampaignForm />} />

  
            <Route element={<AdminRoute />}>
  <Route path="/admin">
    <Route index element={<AdminPanel />} /> {/* Admin main panel */}
    <Route path="pending-campaigns" element={<AdminPendingCampaigns />} /> {/* Pending campaigns */}
    <Route path="users" element={<UserManagement />} /> {/* User management */}
    <Route path="campaigns/status/:status" element={<AdminCampaignsByStatus />} />
  </Route>
</Route>

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
