import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from './Badge';
import { Button } from './Button';
import { ArrowLeft, Download, Share2, Search, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataTable } from './DataTable';

const prData = Array.from({ length: 30 }, (_, i) => {
  const recall = i / 29;
  return {
    recall,
    precision: 0.95 - (recall * 0.4) - (Math.random() * 0.08)
  };
});

const rocData = Array.from({ length: 30 }, (_, i) => {
  const fpr = i / 29;
  return {
    fpr,
    tpr: fpr + (0.3 * Math.sin(fpr * Math.PI))
  };
});

const topEdges = [
  { source: 'SOX2', target: 'NANOG', score: 0.947, type: 'activation', validated: true },
  { source: 'OCT4', target: 'SOX2', score: 0.923, type: 'activation', validated: true },
  { source: 'NANOG', target: 'KLF4', score: 0.891, type: 'activation', validated: true },
  { source: 'MYC', target: 'SOX2', score: 0.867, type: 'inhibition', validated: false },
  { source: 'KLF4', target: 'MYC', score: 0.834, type: 'activation', validated: true },
  { source: 'SOX2', target: 'UTF1', score: 0.812, type: 'activation', validated: true },
  { source: 'NANOG', target: 'DPPA3', score: 0.789, type: 'activation', validated: false },
  { source: 'OCT4', target: 'NANOG', score: 0.776, type: 'activation', validated: true },
  { source: 'MYC', target: 'TERT', score: 0.754, type: 'activation', validated: true },
  { source: 'KLF4', target: 'ESRRB', score: 0.732, type: 'activation', validated: false }
];

export function RunDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topK, setTopK] = useState('500');
  const [threshold, setThreshold] = useState(0.7);
  const [edgeFilter, setEdgeFilter] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');
  
  const columns = [
    { 
      key: 'source', 
      label: 'Source Gene',
      sortable: true,
      render: (val: string) => <span className="font-mono text-purple-600">{val}</span>
    },
    { 
      key: 'target', 
      label: 'Target Gene',
      sortable: true,
      render: (val: string) => <span className="font-mono text-gray-700">{val}</span>
    },
    { 
      key: 'score', 
      label: 'Confidence Score',
      sortable: true,
      render: (val: number) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
              style={{ width: `${val * 100}%` }}
            />
          </div>
          <span className="text-sm">{val.toFixed(3)}</span>
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Edge Type',
      render: (val: string) => (
        <Badge variant={val === 'activation' ? 'success' : 'warning'}>
          {val}
        </Badge>
      )
    },
    { 
      key: 'validated', 
      label: 'Validated',
      render: (val: boolean) => (
        val ? 
          <Badge variant="success">✓ Yes</Badge> : 
          <Badge variant="default">Predicted</Badge>
      )
    }
  ];
  
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/')}
        className="mb-6"
      >
        Back to Dashboard
      </Button>
      
      {/* Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-gray-900">Run {id}</h1>
              <Badge variant="success">Completed</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mt-4">
              <div>
                <p className="text-gray-500 mb-1">Algorithm</p>
                <p className="text-gray-900">GENIE3 v1.2.0</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Dataset</p>
                <p className="text-gray-900">hESC Time-series</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Started</p>
                <p className="text-gray-900">Nov 24, 2024 14:32</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Duration</p>
                <p className="text-gray-900">4 min 12 sec</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="ghost" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
              Export Results
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Controls</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Top-K Edges</label>
                <select 
                  value={topK}
                  onChange={(e) => setTopK(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="100">Top 100</option>
                  <option value="500">Top 500</option>
                  <option value="1000">Top 1000</option>
                  <option value="all">All edges</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Score Threshold: {threshold.toFixed(2)}
                </label>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.0</span>
                  <span>1.0</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-3">Edge Type Filter</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="edgeType" 
                      value="both"
                      checked={edgeFilter === 'both'}
                      onChange={(e) => setEdgeFilter(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Both</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="edgeType" 
                      value="activation"
                      checked={edgeFilter === 'activation'}
                      onChange={(e) => setEdgeFilter(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Activation only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="edgeType" 
                      value="inhibition"
                      checked={edgeFilter === 'inhibition'}
                      onChange={(e) => setEdgeFilter(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Inhibition only</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Search Node</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Gene name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <Button variant="primary" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Network Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200 h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Network Visualization</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Force Layout</Button>
                <Button variant="secondary" size="sm">Circular</Button>
                <Button variant="secondary" size="sm">Hierarchical</Button>
              </div>
            </div>
            
            {/* Network Canvas Placeholder */}
            <div className="relative h-[520px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-dashed border-purple-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    {/* Simple network icon */}
                    <circle cx="30" cy="15" r="5" fill="var(--color-primary)" />
                    <circle cx="15" cy="45" r="5" fill="var(--color-accent)" />
                    <circle cx="45" cy="45" r="5" fill="var(--color-blue)" />
                    <line x1="30" y1="20" x2="15" y2="40" stroke="var(--color-gray-300)" strokeWidth="2" />
                    <line x1="30" y1="20" x2="45" y2="40" stroke="var(--color-gray-300)" strokeWidth="2" />
                    <line x1="20" y1="45" x2="40" y2="45" stroke="var(--color-gray-300)" strokeWidth="2" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-1">Interactive Network Graph</p>
                <p className="text-sm text-gray-500">
                  {topEdges.length} edges · {new Set([...topEdges.map(e => e.source), ...topEdges.map(e => e.target)]).size} nodes
                </p>
              </div>
              
              {/* Sample nodes overlay */}
              <div className="absolute top-20 left-20 px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200">
                <p className="text-xs text-gray-500">SOX2</p>
                <p className="text-sm">Degree: 12</p>
              </div>
              
              <div className="absolute bottom-24 right-24 px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200">
                <p className="text-xs text-gray-500">NANOG</p>
                <p className="text-sm">Degree: 8</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Node Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
            <h3 className="text-gray-900 mb-4">Node Details</h3>
            
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">S</span>
              </div>
              <p className="text-center font-mono text-purple-600 mb-1">SOX2</p>
              <p className="text-center text-sm text-gray-500">Transcription Factor</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Gene ID</p>
                <p className="text-sm text-gray-900 font-mono">ENSG00000181449</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">In-degree</p>
                <p className="text-sm text-gray-900">7</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Out-degree</p>
                <p className="text-sm text-gray-900">12</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Centrality</p>
                <p className="text-sm text-gray-900">0.847</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-2">Direct Neighbors (5)</p>
              <div className="space-y-2">
                {['NANOG', 'OCT4', 'KLF4', 'UTF1', 'MYC'].map(gene => (
                  <div key={gene} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <span className="font-mono text-gray-700">{gene}</span>
                    <Badge variant="primary" size="sm">TF</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <Button variant="secondary" className="w-full" size="sm">
              View in Explorer
            </Button>
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* PR Curve */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">Precision-Recall Curve</h3>
          <p className="text-gray-500 text-sm mb-6">AUPRC: 0.847</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={prData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="recall" 
                label={{ value: 'Recall', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
                label={{ value: 'Precision', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="precision" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* ROC Curve */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">ROC Curve</h3>
          <p className="text-gray-500 text-sm mb-6">AUROC: 0.923</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="fpr" 
                label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
                label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="fpr" 
                stroke="#D1D5DB" 
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="tpr" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Metrics Badges */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-600 mb-1">AUPRC</p>
          <p className="text-2xl text-purple-900">0.847</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 mb-1">AUROC</p>
          <p className="text-2xl text-green-900">0.923</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">F1 Score</p>
          <p className="text-2xl text-blue-900">0.782</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-600 mb-1">Early Prec</p>
          <p className="text-2xl text-yellow-900">0.891</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Runtime</p>
          <p className="text-2xl text-gray-900">252s</p>
        </div>
      </div>
      
      {/* Top Edges Table */}
      <div>
        <div className="mb-4">
          <h3 className="text-gray-900 mb-1">Top Predicted Edges</h3>
          <p className="text-gray-500 text-sm">Highest confidence regulatory interactions</p>
        </div>
        <DataTable columns={columns} data={topEdges} />
      </div>
    </div>
  );
}
