import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { WorkflowProgress } from './WorkflowProgress';
import { JobExecutionCard } from './JobExecutionCard';
import { BEELINE_DATASETS, BEELINE_ALGORITHMS, type JobExecution } from '../data/beelineData';
import { 
  Upload, FileText, Check, AlertCircle, 
  Play, X, Download, Info, Users, Shield, ArrowRight, Link2
} from 'lucide-react';

interface JobLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const exampleLogs: JobLog[] = [
  { timestamp: '14:32:01', message: 'Job submitted to queue', type: 'info' },
  { timestamp: '14:32:02', message: 'Loading dataset: hESC', type: 'info' },
  { timestamp: '14:32:05', message: 'Dataset loaded successfully (1842 genes, 911 samples)', type: 'success' },
  { timestamp: '14:32:06', message: 'Initializing GENIE3 algorithm', type: 'info' },
  { timestamp: '14:32:08', message: 'Building random forest models...', type: 'info' },
  { timestamp: '14:35:42', message: 'Model training complete', type: 'success' },
  { timestamp: '14:35:43', message: 'Computing feature importance scores', type: 'info' },
  { timestamp: '14:36:14', message: 'Predictions generated (3267 edges)', type: 'success' },
  { timestamp: '14:36:15', message: 'Evaluating performance metrics', type: 'info' },
  { timestamp: '14:36:18', message: 'AUPRC: 0.847, AUROC: 0.923', type: 'success' },
  { timestamp: '14:36:19', message: 'Job completed successfully', type: 'success' }
];

export function UploadMonitor() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(1);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Validate file
      if (file.size > 50 * 1024 * 1024) {
        setFileError('File size exceeds 50MB limit');
        return;
      }
      const validExtensions = ['.csv', '.tsv', '.txt'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!validExtensions.includes(fileExt)) {
        setFileError('Invalid file format. Please upload CSV, TSV, or TXT files only.');
        return;
      }
      setFileError(null);
      setUploadedFile(file.name);
      setCurrentWorkflowStep(2);
    }
  };
  
  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentWorkflowStep(3);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentWorkflowStep(4);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };
  
  const workflowSteps = [
    { id: 1, label: 'Upload', icon: Upload },
    { id: 2, label: 'Validation', icon: Check },
    { id: 3, label: 'Analysis', icon: Play },
    { id: 4, label: 'Comparison', icon: FileText }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Upload & Job Monitor</h1>
        <p className="text-gray-600">Upload predictions and monitor benchmarking jobs</p>
      </div>
      
      {/* Workflow Indicator */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <h3 className="text-gray-900 mb-4">Pipeline Workflow</h3>
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = currentWorkflowStep === step.id;
            const isComplete = currentWorkflowStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isComplete 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : isActive
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-100 border-2 border-gray-300'
                    }`}
                  >
                    <StepIcon 
                      className={`w-6 h-6 ${
                        isComplete 
                          ? 'text-green-600' 
                          : isActive
                            ? 'text-purple-600'
                            : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <span 
                    className={`text-sm mt-2 ${
                      isComplete || isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative" style={{ top: '-20px' }}>
                    <div 
                      className={`h-full transition-all ${
                        currentWorkflowStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Role-Based Access Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Upload className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="text-gray-900">Upload Access</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">Users with upload permissions</p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">Researchers, Lab Managers</span>
          </div>
        </div>
        
        {/* <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="text-gray-900">Approval Access</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">Users who can approve datasets</p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">Admin, PI, Curators</span>
          </div>
        </div> */}
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Play className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-gray-900">Run Comparisons</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">Users who can run benchmarks</p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">All authenticated users</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          {/* Drag and Drop Zone */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
            <h3 className="text-gray-900 mb-4">Upload Prediction File</h3>
            
            {/* File Validation Error */}
            {fileError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-900">{fileError}</p>
                </div>
                <button onClick={() => setFileError(null)} className="text-red-600 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging 
                  ? 'border-purple-500 bg-purple-50' 
                  : uploadedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1">{uploadedFile}</p>
                    <p className="text-sm text-gray-500">File ready to process</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      icon={<Play className="w-4 h-4" />}
                      onClick={startProcessing}
                    >
                      Start Processing
                    </Button>
                    <Button 
                      variant="ghost" 
                      icon={<X className="w-4 h-4" />}
                      onClick={() => setUploadedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-gray-900 mb-2">Drag and drop your file here</p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                  <Button variant="secondary">Choose File</Button>
                  <p className="text-xs text-gray-400 mt-4">Supported formats: CSV, TSV, TXT (max 50MB)</p>
                </>
              )}
            </div>
          </div>
          
          {/* Example File Preview */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Expected File Format</h3>
              <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                Download Template
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono">
{`# Gene Regulatory Network Predictions
# Format: source_gene  target_gene  confidence_score
SOX2    NANOG   0.947
OCT4    SOX2    0.923
NANOG   KLF4    0.891
MYC     SOX2    0.867
KLF4    MYC     0.834
SOX2    UTF1    0.812
NANOG   DPPA3   0.789`}
              </pre>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="mb-1"><strong>File Requirements:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Tab-separated or comma-separated values</li>
                  <li>Three columns: source gene, target gene, confidence score</li>
                  <li>Score range: 0.0 to 1.0</li>
                  <li>Gene names must match dataset identifiers</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Processing Progress */}
          {isProcessing && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Processing Job</h3>
                <Badge variant={progress === 100 ? 'success' : 'warning'}>
                  {progress === 100 ? 'Completed' : 'Running'}
                </Badge>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {/* Job Logs */}
              <div>
                <h4 className="text-gray-900 mb-3">Processing Logs</h4>
                <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="space-y-1 font-mono text-sm">
                    {exampleLogs.slice(0, Math.floor((progress / 100) * exampleLogs.length)).map((log, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-gray-500">[{log.timestamp}]</span>
                        <span className={
                          log.type === 'success' ? 'text-green-400' :
                          log.type === 'error' ? 'text-red-400' :
                          log.type === 'warning' ? 'text-yellow-400' :
                          'text-gray-400'
                        }>
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {progress === 100 && (
                <div className="mt-4 flex gap-3">
                  <Button variant="primary">View Results</Button>
                  <Button variant="secondary">Download Report</Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Sidebar - Job Configuration */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
            <h3 className="text-gray-900 mb-4">Job Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Dataset</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {BEELINE_DATASETS.map(dataset => (
                    <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Algorithm</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {BEELINE_ALGORITHMS.map(algorithm => (
                    <option key={algorithm.id} value={algorithm.id}>{algorithm.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Algorithm Version</label>
                <input 
                  type="text"
                  placeholder="e.g., 1.2.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Run Name</label>
                <input 
                  type="text"
                  placeholder="Optional custom name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm text-gray-700 mb-3">Evaluation Options</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Compute PR/ROC curves</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Calculate early precision</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Motif enrichment analysis</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Jobs */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mt-6">
            <h3 className="text-gray-900 mb-4">Recent Jobs</h3>
            <div className="space-y-3">
              {[
                { id: 'JOB-001', status: 'completed', time: '2h ago' },
                { id: 'JOB-002', status: 'completed', time: '5h ago' },
                { id: 'JOB-003', status: 'failed', time: '1d ago' }
              ].map(job => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {job.status === 'completed' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <div>
                      <p className="text-sm text-gray-900">{job.id}</p>
                      <p className="text-xs text-gray-500">{job.time}</p>
                    </div>
                  </div>
                  <Badge variant={job.status === 'completed' ? 'success' : 'error'} size="sm">
                    {job.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          {/* Traceability Information */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-purple-600" />
              <h3 className="text-gray-900">Result Traceability</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Every result includes full provenance tracking</p>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-600 mb-1">Dataset Version</p>
                <p className="text-sm text-gray-900">hESC v2.1.0</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 mb-1">Algorithm Version</p>
                <p className="text-sm text-gray-900">GENIE3 v1.12.0</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 mb-1">Parameters Used</p>
                <p className="text-sm text-gray-900">ntrees=1000, mtry=sqrt</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-600 mb-1">Run Details</p>
                <button className="text-sm text-orange-900 underline hover:no-underline">
                  View full run detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}