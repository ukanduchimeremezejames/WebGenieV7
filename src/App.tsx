import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { MainDashboard } from './components/MainDashboard';
import { DatasetPage } from './components/DatasetPage';
import { DatasetsListing } from './components/DatasetsListing';
import { AlgorithmComparison } from './components/AlgorithmComparison';
import { RunDetail } from './components/RunDetail';
import { NetworkExplorer } from './components/NetworkExplorer';
import { UploadMonitor } from './components/UploadMonitor';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<><Navigation /><MainDashboard /></>} />
          <Route path="/datasets" element={<><Navigation /><DatasetsListing /></>} />
          <Route path="/dataset/:id" element={<><Navigation /><DatasetPage /></>} />
          <Route path="/compare" element={<><Navigation /><AlgorithmComparison /></>} />
          <Route path="/run/:id" element={<><Navigation /><RunDetail /></>} />
          <Route path="/explorer" element={<><Navigation /><NetworkExplorer /></>} />
          <Route path="/upload" element={<><Navigation /><UploadMonitor /></>} />
        </Routes>
      </div>
    </Router>
  );
}