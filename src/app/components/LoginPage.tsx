import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Shield, Mail, Lock } from 'lucide-react';
import {
  useSignIn,
  useUser
} from "@clerk/clerk-react";
import logo from '../../assets/logo.png';


export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, setActive, isLoaded, } = useSignIn();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const {
      isLoaded: signInLoaded
    } = useSignIn();
  const { isSignedIn } = useUser();


////// HANDLERS ////
const handleGoogleLogin = async () => {

  // 🔥 already signed in
  if (isSignedIn) {

    setMessage(
      "Already logged in ✅"
    );

    setIsSuccess(true);

    setTimeout(() => {

      navigate("/dashboard");

    }, 1000);

    return;
  }

  if (!isLoaded || !signInLoaded) return;

  try {

    setMessage("");

    await signIn.authenticateWithRedirect({

      strategy: "oauth_google",

      redirectUrl: "https://akhiltechy001.github.io/Deepfake_Detection_System/#/sso-callback",

      redirectUrlComplete: "https://akhiltechy001.github.io/Deepfake_Detection_System/#/dashboard",
    });

  } catch (err: any) {

    console.error(err);

    setMessage(

      err.errors?.[0]?.message ||

      "Google login failed ❌"
    );

    setIsSuccess(false);
  }
};

///// FORGOT PASSWORD ///
const handleForgotPassword = async () => {
  navigate("/forgot-password");
};



///// REAL LOGIN ///
const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (!isLoaded) return;

  try {

    setMessage("");

    const result =
      await signIn.create({

        identifier:
          username.trim(),

        password,
      });

    // ❌ NO SESSION
    if (!result.createdSessionId) {

      setMessage(
        "Session creation failed ❌"
      );

      setIsSuccess(false);

      return;
    }

    // ✅ ACTIVATE SESSION
    await setActive({

      session:
        result.createdSessionId,
    });
    

    // ✅ SUCCESS
    setMessage(
      "Login successful ✅"
    );

    setIsSuccess(true);

    // ✅ REDIRECT
    setTimeout(() => {

      navigate("/dashboard");

    }, 1000);

  } catch (err: any) {

    console.error(
      "LOGIN ERROR:",
      err
    );

    setMessage(

      err.errors?.[0]?.longMessage ||

      err.errors?.[0]?.message ||

      "Login failed ❌"
    );

    setIsSuccess(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#050817] to-[#000000] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00fff9] opacity-10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d4ff] opacity-10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className=" rounded-lg bg-gradient-to-br from-[#00fff9] to-[#00d4ff] shadow-lg shadow-[#00fff9]/20">
            <img 
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xl font-['Poppins'] font-bold bg-gradient-to-r from-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent">
            Deepfake Detector
          </span>
        </Link>

        {/* Login Card */}
        <div className="p-8 rounded-2xl bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border border-[rgba(148,163,184,0.15)] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-['Poppins'] font-bold text-[#e8edf5] mb-2">Welcome Back</h1>
            <p className="text-[#94a3b8]">Sign in to your account</p>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  isSuccess
                    ? 'bg-[#00fff9]/10 border border-[#00fff9] text-[#00fff9]'
                    : 'bg-red-500/10 border border-red-500 text-red-400'
                }`}
            >
              {message}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#e8edf5] mb-2">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[rgba(15,23,42,0.5)] border border-[rgba(148,163,184,0.1)] text-[#e8edf5] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00fff9] focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#e8edf5] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[rgba(15,23,42,0.5)] border border-[rgba(148,163,184,0.1)] text-[#e8edf5] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00fff9] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.5)] text-[#00fff9] focus:ring-[#00fff9] focus:ring-offset-0"
                />
                <span className="ml-2 text-sm text-[#94a3b8]">Remember me</span>
              </label>
              <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[#00fff9] hover:text-[#00d4ff] transition-colors"
                >
                  Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-[#94a3b8]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00fff9] hover:text-[#00d4ff] font-medium transition-colors">
                Register
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(148,163,184,0.1)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[rgba(15,23,42,0.6)] text-[#94a3b8]">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className=" flex justify-center w-full mt-4 ">
            <button onClick={handleGoogleLogin}  className="w-full py-3 rounded-lg bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.1)] text-[#e8edf5] hover:bg-[rgba(148,163,184,0.15)] hover:border-[#00fff9] transition-all duration-200 text-sm font-medium">
              Continue With Google
            </button>
          </div>
        </div>
        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-[#94a3b8] hover:text-[#00fff9] transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

