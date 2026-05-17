import { useState, useRef, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Upload, FileVideo, FileAudio, Loader2, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { data, useNavigate } from 'react-router';


type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'complete';

interface AnalysisResult {
  prediction: 'Real' | 'Fake';
  confidence: number;
  processingTime: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/dashboard');
  }
  }, []);

  // Get username from sessionStorage or default
  const username = sessionStorage.getItem('username') || 'User';

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setSelectedFile(file);   // ✅ STORE FILE
  };

 const analyzeFile = async () => {
  if (!selectedFile) {
    alert("Please select a file");
    return;
  }

  setAnalysisState('uploading');

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("https://deepfake-ai-backend.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });


    const data = await response.json();

    setResult(data);
    setAnalysisState('complete');

    if (response.ok) {
      console.error("✅ Success:", data);

      setResult({
        prediction: data.prediction,
        confidence: data.confidence,
        processingTime: data.processingTime,
      });

      setAnalysisState('complete');
    }

  } catch (error) {
    console.error( error);
    setAnalysisState('idle');
  }
};

  const handleReset = () => {
    setAnalysisState('idle');
    setResult(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#050817] to-[#000000]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-4xl font-['Poppins'] font-bold text-[#e8edf5] mb-2">
            Welcome back, {username}! 👋
          </h1>
          <p className="text-[#94a3b8] text-lg">
            Upload a file to start analyzing for deepfake manipulation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard
            label="Files Analyzed"
            value="23"
            icon={<FileVideo className="w-6 h-6" />}
          />
          <StatCard
            label="Deepfakes Detected"
            value="8"
            icon={<AlertTriangle className="w-6 h-6" />}
            trend="+2 this week"
          />
          <StatCard
            label="Accuracy Rate"
            value="99.8%"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Main Content Area */}
        {analysisState === 'idle' && (
          <UploadSection
            dragActive={dragActive}
            fileInputRef={fileInputRef}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleChange={handleChange}
            handleAnalyze={analyzeFile}
          />
        )}

        {(analysisState === 'uploading' || analysisState === 'analyzing') && (
          <LoadingSection state={analysisState} fileName={fileName} />
        )}

        {analysisState === 'complete' && result && (
          <ResultSection result={result} fileName={fileName} onReset={handleReset} />
        )}

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-2xl font-['Poppins'] font-bold text-[#e8edf5] mb-6">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem
              fileName="interview_video.mp4"
              result="Real"
              confidence={96.5}
              date="2 hours ago"
            />
            <ActivityItem
              fileName="social_media_clip.mp4"
              result="Fake"
              confidence={89.2}
              date="5 hours ago"
            />
            <ActivityItem
              fileName="podcast_audio.mp3"
              result="Real"
              confidence={94.1}
              date="1 day ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string; value: string; icon: React.ReactNode; trend?: string }) {
  return (
    <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border border-[rgba(148,163,184,0.15)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-[rgba(0,255,249,0.1)] flex items-center justify-center text-[#00fff9]">
          {icon}
        </div>
        {trend && (
          <span className="text-xs text-[#39ff14] font-medium">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-['Poppins'] font-bold text-[#e8edf5] mb-1">{value}</div>
      <div className="text-sm text-[#94a3b8]">{label}</div>
    </div>
  );
}

function UploadSection({
  dragActive,
  fileInputRef,
  handleDrag,
  handleDrop,
  handleChange,
  handleAnalyze,
}: {
  dragActive: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#00fff9] to-[#00d4ff] opacity-0 blur-2xl transition-opacity duration-500"></div>
      
      <div
        className={`relative p-16 rounded-2xl backdrop-blur-xl border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? 'border-[#00fff9] bg-[rgba(0,255,249,0.05)]'
            : 'border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.4)]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="video/*,audio/*"
          onChange={handleChange}
        />

        <div className="text-center ">
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#00fff9] to-[#00d4ff] flex items-center justify-center shadow-lg shadow-[#00fff9]/20">
            <Upload className="w-10 h-10 text-[#0a0e27]" />
          </div>

          <h3 className="text-2xl font-['Poppins'] font-bold text-[#e8edf5] mb-3">
            Upload or Drag File
          </h3>
          <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
            Drop your video or audio file here, or click to browse. We support MP4, AVI, MOV, MP3, WAV, and M4A.
          </p>
           
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300 transform hover:scale-105"
              >
              Select File
            </button>
            <button
              onClick={handleAnalyze}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#00d4ff] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00fff9]/30 transition-all duration-300 transform hover:scale-105"
              >
              Analyze File
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <FileVideo className="w-4 h-4" />
              <span>Video files</span>
            </div>
            <div className="flex items-center gap-2">
              <FileAudio className="w-4 h-4" />
              <span>Audio files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSection({ state, fileName }: { state: AnalysisState; fileName: string }) {
  const progress = state === 'uploading' ? 30 : 70;

  return (
    <div className="p-12 rounded-2xl bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border border-[rgba(148,163,184,0.15)]">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-[rgba(0,255,249,0.1)] flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#00fff9] animate-spin" />
        </div>

        <h3 className="text-2xl font-['Poppins'] font-bold text-[#e8edf5] mb-2">
          {state === 'uploading' ? 'Uploading...' : 'Analyzing with AI...'}
        </h3>
        <p className="text-[#94a3b8] mb-8">{fileName}</p>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-[rgba(148,163,184,0.1)] rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00fff9] to-[#00d4ff] rounded-full transition-all duration-500 shadow-lg shadow-[#00fff9]/50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-[#94a3b8] mt-4">
          {state === 'uploading' ? 'Uploading file...' : 'Running deep neural network analysis...'}
        </p>
      </div>
    </div>
  );
}

function ResultSection({ result, fileName, onReset }: { result: AnalysisResult; fileName: string; onReset: () => void }) {
  const isFake = result.prediction === 'Fake';

  return (
    <div className="space-y-6">
      {/* Result Card */}
      <div className={`p-8 rounded-2xl backdrop-blur-xl border-2 ${
        isFake
          ? 'bg-[rgba(255,51,102,0.05)] border-[#ff3366]'
          : 'bg-[rgba(57,255,20,0.05)] border-[#39ff14]'
      }`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {isFake ? (
                <AlertTriangle className="w-8 h-8 text-[#ff3366]" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-[#39ff14]" />
              )}
              <h3 className="text-3xl font-['Poppins'] font-bold text-[#e8edf5]">
                {result.prediction}
              </h3>
            </div>
            <p className="text-[#94a3b8]">{fileName}</p>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)] text-[#e8edf5] hover:bg-[rgba(148,163,184,0.15)] hover:border-[#00fff9] transition-all duration-200 text-sm font-medium"
          >
            Analyze Another
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.1)]">
            <div className="text-sm text-[#94a3b8] mb-1">Prediction</div>
            <div className={`text-2xl font-bold font-['Poppins'] ${
              isFake ? 'text-[#ff3366]' : 'text-[#39ff14]'
            }`}>
              {result.prediction}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.1)]">
            <div className="text-sm text-[#94a3b8] mb-1">Confidence</div>
            <div className="text-2xl font-bold text-[#00fff9] font-['Poppins']">
              {result.confidence}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.1)]">
            <div className="text-sm text-[#94a3b8] mb-1">Processing Time</div>
            <div className="text-2xl font-bold text-[#00d4ff] font-['Poppins']">
              {result.processingTime}s
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#94a3b8]">Confidence Level</span>
            <span className="text-sm font-semibold text-[#e8edf5]">{result.confidence}%</span>
          </div>
          <div className="relative w-full h-3 bg-[rgba(148,163,184,0.1)] rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                isFake ? 'bg-[#ff3366]' : 'bg-[#39ff14]'
              }`}
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Analysis Details */}
      <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border border-[rgba(148,163,184,0.15)]">
        <h4 className="font-['Poppins'] font-semibold text-[#e8edf5] mb-4">Analysis Details</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Neural Network Model:</span>
            <span className="text-[#e8edf5]">DeepFake-V4.2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Frames Analyzed:</span>
            <span className="text-[#e8edf5]">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Anomalies Detected:</span>
            <span className="text-[#e8edf5]">{isFake ? '18' : '0'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">File Size:</span>
            <span className="text-[#e8edf5]">24.5 MB</span>
          </div>
        </div>

        {isFake && (
          <div className="mt-4 p-4 rounded-lg bg-[rgba(255,51,102,0.1)] border border-[rgba(255,51,102,0.2)]">
            <p className="text-sm text-[#94a3b8]">
              <span className="text-[#ff3366] font-semibold">Warning:</span> This file shows signs of manipulation. 
              Detected inconsistencies in facial movements and audio synchronization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityItem({ fileName, result, confidence, date }: { fileName: string; result: 'Real' | 'Fake'; confidence: number; date: string }) {
  const isFake = result === 'Fake';

  return (
    <div className="p-4 rounded-lg bg-[rgba(15,23,42,0.4)] backdrop-blur-md border border-[rgba(148,163,184,0.1)] hover:border-[rgba(0,255,249,0.3)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isFake ? 'bg-[rgba(255,51,102,0.1)]' : 'bg-[rgba(57,255,20,0.1)]'
          }`}>
            {isFake ? (
              <AlertTriangle className="w-5 h-5 text-[#ff3366]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#39ff14]" />
            )}
          </div>
          <div>
            <div className="text-[#e8edf5] font-medium">{fileName}</div>
            <div className="text-sm text-[#94a3b8]">{date}</div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-semibold ${isFake ? 'text-[#ff3366]' : 'text-[#39ff14]'}`}>
            {result}
          </div>
          <div className="text-sm text-[#94a3b8]">{confidence}%</div>
        </div>
      </div>
    </div>
  );
}
