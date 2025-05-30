


import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AuthForm from '../features/auth/AuthForm';
import Dashboard from '../pages/Dashboard';
import CampaignList from '../pages/CampaignList';
import CampaignDetails from '../pages/CampaignDetails';
import MyCampaigns from '../pages/MyCampaigns';
import CampaignForm from '../features/campaigns/CampaignForm';



const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<AuthForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/campaigns" element={<CampaignList />} />               {/* ✅ All campaigns */}
    <Route path="/campaigns/:id" element={<CampaignDetails />} />        {/* ✅ Campaign details */}
    <Route path="/my-campaigns" element={<MyCampaigns />} />             {/* ✅ My campaigns */}
    <Route path="/campaigns/new" element={<CampaignForm />} />
    <Route path="/campaigns/:id/edit" element={<CampaignForm />} />
   
   
  </Routes>
);

export default AppRoutes;
