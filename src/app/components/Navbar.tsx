import { Link, useLocation, useNavigate } from 'react-router';
import {
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";
import logo from '../../assets/logo.png';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(10,14,39,0.8)] border-b border-[rgba(148,163,184,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div>
              <img
                src={logo}
                alt="logo"
                className="w-16 h-16 object-contain drop-shadow-[0_0_8px_#00fff9] group-hover:scale-110 transition duration-300 "
              />
            </div>
            <span className="text-xl font-['Poppins'] font-bold bg-gradient-to-r from-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent">
              VideoVerify
            </span>
          </Link>

          {/* Menu only on landing */}
          {!isDashboard && (
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#94a3b8] hover:text-[#00fff9]">Features</a>
              <a href="#how-it-works" className="text-[#94a3b8] hover:text-[#00fff9]">How It Works</a>
              <a href="#faq" className="text-[#94a3b8] hover:text-[#00fff9]">FAQ</a>
            </div>
          )}

          {/* 🔥 AUTH BUTTON LOGIC */}
          {/* 🔥 AUTH BUTTON LOGIC */}
            <div className="flex items-center gap-4">

              {/* ❌ NOT LOGGED IN */}
              <SignedOut>

                <Link
                  to="/login"
                  className="px-5 py-2 text-[#e8edf5] hover:text-[#00fff9] transform hover:scale-105"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-medium hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Link>

              </SignedOut>

              {/* ✅ LOGGED IN */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

            </div>
        </div>
      </div>
    </nav>
  );
}