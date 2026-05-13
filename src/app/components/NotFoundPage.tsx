import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#050817] to-[#000000] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-['Poppins'] font-bold text-[#e8edf5] mb-4">404</h1>
        <p className="text-xl text-[#94a3b8] mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
