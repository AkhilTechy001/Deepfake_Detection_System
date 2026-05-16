
import {

  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router";

import {

  SignedIn,
  SignedOut,
  AuthenticateWithRedirectCallback,

} from "@clerk/clerk-react";

import { LandingPage }
from "./components/LandingPage.tsx";

import { LoginPage }
from "./components/LoginPage.tsx";

import { RegisterPage }
from "./components/RegisterPage.tsx";

import { DashboardPage }
from "./components/DashboardPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage.tsx";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* GOOGLE CALLBACK */}
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback />
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={

            <>
              <SignedIn>
                <DashboardPage />
              </SignedIn>

              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}