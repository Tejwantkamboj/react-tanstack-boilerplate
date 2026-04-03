import type { RouteObject } from 'react-router-dom';
import { lazyImport } from '../../../lib/lazyImport';

const About = lazyImport(() => import('./About'), 'About');
const TermsAndConditions = lazyImport(() => import('./TermsAndConditions'), 'TermsAndConditions');
const PrivacyPolicy = lazyImport(() => import('./PrivacyPolicy'), 'PrivacyPolicy');
const ContactUs = lazyImport(() => import('./ContactUs'), 'ContactUs');
const Dashboard = lazyImport(() => import('./Dashboard'), 'Dashboard');

export const CommonRoutes: RouteObject[] = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: 'contact-us',
    element: <ContactUs />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />,
  },
];
