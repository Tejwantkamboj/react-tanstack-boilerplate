import { lazyImport } from "../lib/lazyImport";
const AuthRoutes = lazyImport(
  () => import("../features/auth/routes"),
  "AuthRoutes",
);

// const Home = lazyImport(() => import("../features/home"), "Home");
// const About = lazyImport(() => import("../features/about"), "About");
// const Contact = lazyImport(() => import("../features/contact"), "Contact");

export const publicRoutes = [
  //   { path: "/", element: <Home /> },
  //   { path: "/about", element: <About /> },
  //   { path: "/contact", element: <Contact /> },
  { path: "/auth/*", element: <AuthRoutes /> },
];
