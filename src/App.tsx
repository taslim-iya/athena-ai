import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import BrandIntel from './pages/dashboard/BrandIntel';
import SEO from './pages/dashboard/SEO';
import Social from './pages/dashboard/Social';
import Email from './pages/dashboard/Email';
import Ads from './pages/dashboard/Ads';
import Analytics from './pages/dashboard/Analytics';
import Calendar from './pages/dashboard/Calendar';
import Integrations from './pages/dashboard/Integrations';
import Settings from './pages/dashboard/Settings';
import Onboarding from './pages/Onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="brand" element={<BrandIntel />} />
          <Route path="seo" element={<SEO />} />
          <Route path="social" element={<Social />} />
          <Route path="email" element={<Email />} />
          <Route path="ads" element={<Ads />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
