import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from './Badge';
import { Button } from './Button';
import { MetricCard } from './MetricCard';
import { Download, Activity, FileText, TrendingUp, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const geneDistData = [
  { range: '0-100', count: 45 },
  { range: '100-500', count: 128 },
  { range: '500-1000', count: 89 },
  { range: '1000-2000', count: 56 },
  { range: '2000+', count: 23 }
];

const cellTypeData = [
  { name: 'Type A', value: 342, color: '#5B2C6F' },
  { name: 'Type B', value: 256, color: '#7A3A94' },
  { name: 'Type C', value: 189, color: '#9B5BB5' },
  { name: 'Type D', value: 124, color: '#BB7CD6' }
];

export function DatasetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-gray-900">hESC Dataset</h1>
                <Badge variant="success">Validated</Badge>
                <Badge variant="info">scRNA-seq</Badge>
              </div>
              <p className="text-gray-600 mb-3">Human Embryonic Stem Cells - Time-series expression data</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Organism:</span>
                  <span className="text-gray-900">Homo sapiens</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Modality:</span>
                  <span className="text-gray-900">Single-cell RNA-seq</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Time points:</span>
                  <span className="text-gray-900">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Published:</span>
                  <span className="text-gray-900">2023-03-15</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
              Download Ground Truth
            </Button>
            <Button variant="primary">
              Run Benchmark
            </Button>
          </div>
        </div>
        
        {/* Dataset Metadata Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-gray-900 mb-4">Dataset Metadata</h4>
          <div className="grid grid-cols-4 gap-6">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-xs text-purple-600 mb-1">Source</p>
              <p className="text-gray-900">Curated</p>
              <p className="text-xs text-gray-500 mt-1">Real experimental data</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600 mb-1">Size</p>
              <p className="text-gray-900">1,842 genes</p>
              <p className="text-xs text-gray-500 mt-1">911 cells/samples</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-xs text-green-600 mb-1">Last Updated</p>
              <p className="text-gray-900">2024-11-15</p>
              <p className="text-xs text-gray-500 mt-1">3 weeks ago</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-xs text-orange-600 mb-1">Version</p>
              <p className="text-gray-900">v2.1.0</p>
              <p className="text-xs text-gray-500 mt-1">Latest stable</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Genes"
          value="1,842"
          icon={<FileText className="w-6 h-6" />}
          color="var(--color-primary)"
        />
        <MetricCard
          label="Known Edges"
          value="3,267"
          icon={<TrendingUp className="w-6 h-6" />}
          color="var(--color-accent)"
        />
        <MetricCard
          label="Total Samples"
          value="911"
          icon={<Activity className="w-6 h-6" />}
          color="var(--color-blue)"
        />
        <MetricCard
          label="Sparsity"
          value="94.2%"
          icon={<Activity className="w-6 h-6" />}
          color="var(--color-yellow)"
        />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gene Expression Distribution */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">Gene Expression Distribution</h3>
          <p className="text-gray-500 text-sm mb-6">Expression count ranges across samples</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={geneDistData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
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
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Cell Type Composition */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">Cell Type Composition</h3>
          <p className="text-gray-500 text-sm mb-6">Distribution of cell populations</p>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={cellTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cellTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {cellTypeData.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-sm text-gray-700">{type.name}</span>
                <span className="text-sm text-gray-500 ml-auto">{type.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quality Control Metrics */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
        <h3 className="text-gray-900 mb-1">Quality Control Metrics</h3>
        <p className="text-gray-500 text-sm mb-6">Dataset quality and preprocessing statistics</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Mean UMI Count</p>
            <p className="text-2xl text-gray-900">4,827</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Median Genes/Cell</p>
            <p className="text-2xl text-gray-900">1,234</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Mitochondrial %</p>
            <p className="text-2xl text-gray-900">3.2%</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Doublet Rate</p>
            <p className="text-2xl text-gray-900">2.1%</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => navigate('/compare')}>
          Compare Algorithms on this Dataset
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/dataset/${id}/runs`)}>
          View All Runs
        </Button>
        <Button variant="secondary" onClick={() => navigate('/upload')}>
          Upload New Predictions
        </Button>
      </div>
    </div>
  );
}