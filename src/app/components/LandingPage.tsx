import { Link } from 'react-router';
import { Upload, Scan, CheckCircle2, Shield, Zap, Lock, Brain, Video, Mic } from 'lucide-react';
import { Navbar } from './Navbar';
import logo from '../../assets/logo.png';

export function LandingPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#050817] to-[#000000]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00fff9] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#00d4ff] opacity-10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-[rgba(0,255,249,0.1)] border border-[rgba(0,255,249,0.2)] backdrop-blur-sm">
              <span className="text-[#00fff9] text-sm font-medium">🔒 Powered by CNN & EfficientNet</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-['Poppins'] font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#e8edf5] via-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent">
                Detect AI-Generated Videos
              </span>
              <br />
              <span className="text-[#e8edf5]">Instantly</span>
            </h1>
            
            <p className="text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto">
              AI-powered video analysis to identify manipulated media with industry-leading accuracy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold text-lg hover:shadow-2xl hover:shadow-[#00fff9]/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload File
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-xl bg-[rgba(148,163,184,0.1)] backdrop-blur-sm border border-[rgba(148,163,184,0.2)] text-[#e8edf5] font-semibold text-lg hover:bg-[rgba(148,163,184,0.15)] hover:border-[#00fff9] transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent font-['Poppins']">
                  99.8%
                </div>
                <div className="text-[#94a3b8] mt-2">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent font-['Poppins']">
                  5s
                </div>
                <div className="text-[#94a3b8] mt-2">Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#00fff9] to-[#00d4ff] bg-clip-text text-transparent font-['Poppins']">
                  1M+
                </div>
                <div className="text-[#94a3b8] mt-2">Files Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Poppins'] font-bold mb-4 text-[#e8edf5]">
              How It Works
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
              Three simple steps to detect manipulated media
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#00d4ff] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative p-8 rounded-2xl bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00fff9] to-[#00d4ff] flex items-center justify-center mb-6 shadow-lg shadow-[#00fff9]/20">
                  <Upload className="w-8 h-8 text-[#0a0e27]" />
                </div>
                <div className="text-6xl font-bold text-[rgba(0,255,249,0.2)] mb-4 font-['Poppins']">01</div>
                <h3 className="text-2xl font-['Poppins'] font-semibold mb-3 text-[#e8edf5]">Upload</h3>
                <p className="text-[#94a3b8]">
                  Upload your video or audio file through our secure drag-and-drop interface
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#00d4ff] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative p-8 rounded-2xl bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00fff9] to-[#00d4ff] flex items-center justify-center mb-6 shadow-lg shadow-[#00fff9]/20">
                  <Scan className="w-8 h-8 text-[#0a0e27]" />
                </div>
                <div className="text-6xl font-bold text-[rgba(0,255,249,0.2)] mb-4 font-['Poppins']">02</div>
                <h3 className="text-2xl font-['Poppins'] font-semibold mb-3 text-[#e8edf5]">Analyze</h3>
                <p className="text-[#94a3b8]">
                  Our AI scans the file using advanced neural networks to detect manipulation patterns
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#00d4ff] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative p-8 rounded-2xl bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00fff9] to-[#00d4ff] flex items-center justify-center mb-6 shadow-lg shadow-[#00fff9]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#0a0e27]" />
                </div>
                <div className="text-6xl font-bold text-[rgba(0,255,249,0.2)] mb-4 font-['Poppins']">03</div>
                <h3 className="text-2xl font-['Poppins'] font-semibold mb-3 text-[#e8edf5]">Get Results</h3>
                <p className="text-[#94a3b8]">
                  Receive a detailed report with confidence scores and visual heatmaps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00d4ff] opacity-5 blur-[150px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Poppins'] font-bold mb-4 text-[#e8edf5]">
              Powerful Features
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
              Built with cutting-edge technology for maximum accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI-Powered Detection"
              description="Advanced neural networks trained on millions of samples"
            />
            <FeatureCard
              icon={<Video className="w-6 h-6" />}
              title="Video Analysis"
              description="Frame-by-frame analysis to detect facial manipulation"
            />
            <FeatureCard
              icon={<Mic className="w-6 h-6" />}
              title="Audio Analysis"
              description="Voice cloning and synthetic speech detection"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Results in under 5 seconds with 99.8% accuracy"
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6" />}
              title="Secure & Private"
              description="End-to-end encryption and automatic file deletion"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Detailed Reports"
              description="Comprehensive analysis with visual heatmaps"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Poppins'] font-bold mb-4 text-[#e8edf5]">
              FAQ
            </h2>
            <p className="text-xl text-[#94a3b8]">
              Common questions about our deepfake detection service
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="How accurate is the detection?"
              answer="Our AI achieves 99.8% accuracy on standard deepfake benchmarks, using state-of-the-art neural networks trained on millions of samples."
            />
            <FAQItem
              question="What file formats are supported?"
              answer="We support all major video formats (MP4, AVI, MOV) and audio formats (MP3, WAV, M4A) up to 500MB in size."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Yes! All files are encrypted during upload and automatically deleted after 24 hours. We never store or share your content."
            />
            <FAQItem
              question="How long does analysis take?"
              answer="Most files are analyzed in under 5 seconds. Larger files may take up to 30 seconds depending on length and resolution."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(148,163,184,0.1)] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div>
                  <img
                        src={logo}
                        alt="logo"
                        className="w-15 h-15 object-contain"
                      />
                </div>
                <span className="font-['Poppins'] font-bold text-[#e8edf5]">Deepfake Detector</span>
              </div>
              <p className="text-[#94a3b8] text-sm">
                Advanced AI-powered deepfake detection for a safer digital world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#e8edf5]">Product</h4>
              <ul className="space-y-2 text-[#94a3b8] text-sm">
                <li><a href="#features" className="hover:text-[#00fff9] transition-colors">Features</a></li>
              
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#e8edf5]">Company</h4>
              <ul className="space-y-2 text-[#94a3b8] text-sm">
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#e8edf5]">Legal</h4>
              <ul className="space-y-2 text-[#94a3b8] text-sm">
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#00fff9] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[rgba(148,163,184,0.1)] mt-8 pt-8 text-center text-[#94a3b8] text-sm">
            © 2026 Deepfake Detector. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-[rgba(0,255,249,0.1)] flex items-center justify-center mb-4 text-[#00fff9] group-hover:bg-[rgba(0,255,249,0.2)] transition-colors">
        {icon}
      </div>
      <h3 className="font-['Poppins'] font-semibold mb-2 text-[#e8edf5]">{title}</h3>
      <p className="text-[#94a3b8] text-sm">{description}</p>
    </div>
  );
}

function PricingCard({ name, price, features, highlighted = false }: { name: string; price: string; features: string[]; highlighted?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl backdrop-blur-md transition-all duration-300 ${
      highlighted
        ? 'bg-gradient-to-b from-[rgba(0,255,249,0.1)] to-[rgba(0,212,255,0.05)] border-2 border-[#00fff9] shadow-xl shadow-[#00fff9]/20 scale-105'
        : 'bg-[rgba(15,23,42,0.4)] border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)]'
    }`}>
      {highlighted && (
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-[#00fff9] text-[#0a0e27] text-xs font-semibold">
            MOST POPULAR
          </span>
        </div>
      )}
      <h3 className="text-2xl font-['Poppins'] font-bold text-[#e8edf5] mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-[#00fff9] font-['Poppins']">{price}</span>
        {price !== 'Custom' && <span className="text-[#94a3b8]">/month</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-[#94a3b8]">
            <CheckCircle2 className="w-5 h-5 text-[#00fff9]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] hover:shadow-lg hover:shadow-[#00fff9]/30'
          : 'bg-[rgba(148,163,184,0.1)] text-[#e8edf5] hover:bg-[rgba(148,163,184,0.2)] border border-[rgba(148,163,184,0.2)]'
      }`}>
        Get Started
      </button>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
      <h3 className="font-['Poppins'] font-semibold text-[#e8edf5] mb-2">{question}</h3>
      <p className="text-[#94a3b8] text-sm">{answer}</p>
    </div>
  );
}
