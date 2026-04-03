import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyImport } from '../../../lib/lazyImport';

const About = lazyImport(() => import('./About'), 'About');
const TermsAndConditions = lazyImport(() => import('./TermsAndConditions'), 'TermsAndConditions');
const PrivacyPolicy = lazyImport(() => import('./PrivacyPolicy'), 'PrivacyPolicy');
const ContactUs = lazyImport(() => import('./ContactUs'), 'ContactUs');
const Dashboard = lazyImport(() => import('./Dashboard'), 'Dashboard');

// export const CommonRoutes: React.FC = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="about" element={<About />} />
//         <Route path="terms-and-conditions" element={<TermsAndConditions />} />
//         <Route path="contact-us" element={<ContactUs />} />
//         <Route path="privacy-policy" element={<PrivacyPolicy />} />
//       </Routes>
//     </Suspense>
//   );
// };

export const CommonRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Suspense>
  );
};
