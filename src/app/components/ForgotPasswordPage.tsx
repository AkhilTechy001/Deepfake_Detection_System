import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import {
  useSignIn,
} from "@clerk/clerk-react";

export function ForgotPasswordPage() {

  const navigate = useNavigate();

  const {
    signIn,
    isLoaded,
    setActive,
  } = useSignIn();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [successfulCreation,
    setSuccessfulCreation] =
    useState(false);

  const [message,
    setMessage] = useState("");

  const [isSuccess,
    setIsSuccess] = useState(false);

  const [loading,
    setLoading] = useState(false);


  // 🔥 SEND RESET CODE
  const handleSendCode = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!isLoaded) return;

    try {

      setLoading(true);

      setMessage("");

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setSuccessfulCreation(true);

      setMessage(
        "Password reset code sent to your email ✅"
      );

      setIsSuccess(true);

    } catch (err: any) {

      console.error(err);

      setMessage(
        err.errors?.[0]?.message ||
        "Failed to send reset code ❌"
      );

      setIsSuccess(false);

    } finally {

      setLoading(false);
    }
  };


  // 🔥 RESET PASSWORD
  const handleResetPassword = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!isLoaded) return;

    try {

      setLoading(true);

      setMessage("");

      const result =
        await signIn.attemptFirstFactor({

          strategy:
            "reset_password_email_code",

          code,

          password,
        });

      if (
        result.status === "complete"
      ) {

        await setActive({
          session:
            result.createdSessionId,
        });

        setMessage(
          "Password reset successful ✅"
        );

        setIsSuccess(true);

        setTimeout(() => {

          navigate("/dashboard");

        }, 1000);
      }

    } catch (err: any) {

      console.error(err);

      setMessage(
        err.errors?.[0]?.message ||
        "Password reset failed ❌"
      );

      setIsSuccess(false);

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-[#11162f]/80 backdrop-blur-xl border border-[#00fff9]/20 rounded-2xl p-8 shadow-2xl shadow-[#00fff9]/10">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white mb-2">
            Forgot Password
          </h1>

          <p className="text-gray-400">
            Reset your account password
          </p>

        </div>


        {/* MESSAGE */}
        {message && (

          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
              isSuccess
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {message}
          </div>
        )}


        {/* EMAIL FORM */}
        {!successfulCreation ? (

          <form
            onSubmit={handleSendCode}
            className="space-y-6"
          >

            <div>

              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full bg-[#1a1f3a] border border-[#00fff9]/20 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#00fff9]"
                  required
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300"
            >
              {loading
                ? "Sending..."
                : "Send Reset Code"}
            </button>

          </form>

        ) : (

          /* RESET PASSWORD FORM */
          <form
            onSubmit={handleResetPassword}
            className="space-y-6"
          >

            <div>

              <label className="block text-gray-300 mb-2">
                Verification Code
              </label>

              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                className="w-full bg-[#1a1f3a] border border-[#00fff9]/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#00fff9]"
                required
              />

            </div>

            <div>

              <label className="block text-gray-300 mb-2">
                New Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-[#1a1f3a] border border-[#00fff9]/20 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#00fff9]"
                  required
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>
        )}


        {/* LOGIN LINK */}
        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-[#00fff9] hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}
