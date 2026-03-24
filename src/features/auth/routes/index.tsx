import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { lazyImport } from "../../../lib/lazyImport";

const Login = lazyImport(() => import("./Login"), "Login");
const Register = lazyImport(() => import("./Register"), "Register");
const VerifyOtp = lazyImport(() => import("./VerifyOtp"), "VerifyOtp");
const ResetPassword = lazyImport(
  () => import("./ResetPassword"),
  "ResetPassword",
);
const ForgotPassword = lazyImport(
  () => import("./ForgotPassword"),
  "ForgotPassword",
);

export const AuthRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="reset" element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};
