import { useState } from 'react';
import { AlgorithmChip } from './AlgorithmChip';
import { DataTable } from './DataTable';
import { Badge } from './Badge';
import { Button } from './Button';
import { Download, Settings, FileText } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const algorithms = [
  { name: 'GENIE3', color: '#5B2C6F' },
  { name: 'PPCOR', color: '#28A745' },
  { name: 'SINCERITIES', color: '#3B82F6' },
  { name: 'PIDC', color: '#F59E0B' },
  { name: 'GRNBoost2', color: '#EF4444' },
  { name: 'SCENIC', color: '#8B5CF6' }
];

const performanceData = [
  { 
    algorithm: 'GENIE3',
    auprc: 0.847,
    auroc: 0.923,
    f1: 0.782,
    precision: 0.821,
    recall: 0.746,
    earlyPrec: 0.891,
    runtime: 252,
    memory: 1.8
  },
  { 
    algorithm: 'GRNBoost2',
    auprc: 0.803,
    auroc: 0.891,
    f1: 0.756,
    precision: 0.798,
    recall: 0.718,
    earlyPrec: 0.867,
    runtime: 324,
    memory: 2.1
  },
  { 
    algorithm: 'SCENIC',
    auprc: 0.789,
    auroc: 0.878,
    f1: 0.741,
    precision: 0.776,
    recall: 0.709,
    earlyPrec: 0.852,
    runtime: 486,
    memory: 3.4
  },
  { 
    algorithm: 'SINCERITIES',
    auprc: 0.734,
    auroc: 0.856,
    f1: 0.698,
    precision: 0.741,
    recall: 0.659,
    earlyPrec: 0.801,
    runtime: 522,
    memory: 2.7
  },
  { 
    algorithm: 'PIDC',
    auprc: 0.691,
    auroc: 0.812,
    f1: 0.654,
    precision: 0.701,
    recall: 0.612,
    earlyPrec: 0.778,
    runtime: 186,
    memory: 1.2
  },
  { 
    algorithm: 'PPCOR',
    auprc: 0.612,
    auroc: 0.789,
    f1: 0.601,
    precision: 0.648,
    recall: 0.559,
    earlyPrec: 0.723,
    runtime: 108,
    memory: 0.9
  }
];

const prCurveData = Array.from({ length: 20 }, (_, i) => {
  const recall = i / 19;
  return {
    recall,
    GENIE3: 0.95 - (recall * 0.3) - (Math.random() * 0.05),
    PPCOR: 0.75 - (recall * 0.4) - (Math.random() * 0.05),
    SINCERITIES: 0.85 - (recall * 0.35) - (Math.random() * 0.05),
    PIDC: 0.80 - (recall * 0.38) - (Math.random() * 0.05),
    GRNBoost2: 0.90 - (recall * 0.32) - (Math.random() * 0.05),
    SCENIC: 0.88 - (recall * 0.34) - (Math.random() * 0.05)
  };
});

const motifEnrichmentData = [
  { motif: 'SOX2', enrichment: 8.4 },
  { motif: 'OCT4', enrichment: 7.2 },
  { motif: 'NANOG', enrichment: 6.8 },
  { motif: 'KLF4', enrichment: 5.9 },
  { motif: 'MYC', enrichment: 4.7 }
];

const similarityData = [
  { algo1: 'GENIE3', algo2: 'GRNBoost2', similarity: 0.82 },
  { algo1: 'GENIE3', algo2: 'SCENIC', similarity: 0.76 },
  { algo1: 'PPCOR', algo2: 'PIDC', similarity: 0.71 },
  { algo1: 'SINCERITIES', algo2: 'SCENIC', similarity: 0.68 }
];

export function AlgorithmComparison() {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(['GENIE3', 'PPCOR', 'SINCERITIES']);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['auprc', 'auroc', 'f1', 'precision', 'recall']);
  const [normalizeMetrics, setNormalizeMetrics] = useState(false);
  
  const toggleAlgorithm = (name: string) => {
    if (selectedAlgorithms.includes(name)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== name));
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, name]);
    }
  };
  
  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };
  
  const exportCSV = () => {
    // Mock CSV export functionality
    console.log('Exporting to CSV...');
  };
  
  const exportPDF = () => {
    // Mock PDF export functionality
    console.log('Exporting to PDF...');
  };
  
  const metricOptions = [
    { key: 'precision', label: 'Precision' },
    { key: 'recall', label: 'Recall' },
    { key: 'f1', label: 'F1 Score' },
    { key: 'auprc', label: 'AUPRC' },
    { key: 'auroc', label: 'AUROC' },
    { key: 'runtime', label: 'Runtime' },
    { key: 'memory', label: 'Memory' }
  ];
  
  const columns = [
    { 
      key: 'algorithm', 
      label: 'Algorithm',
      sortable: true,
      render: (val: string) => {
        const algo = algorithms.find(a => a.name === val);
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: algo?.color }}
            />
            <span>{val}</span>
          </div>
        );
      }
    },
    ...(selectedMetrics.includes('auprc') ? [{ 
      key: 'auprc', 
      label: 'AUPRC',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    }] : []),
    ...(selectedMetrics.includes('auroc') ? [{ 
      key: 'auroc', 
      label: 'AUROC',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    }] : []),
    ...(selectedMetrics.includes('f1') ? [{ 
      key: 'f1', 
      label: 'F1 Score',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    }] : []),
    ...(selectedMetrics.includes('precision') ? [{ 
      key: 'precision', 
      label: 'Precision',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    }] : []),
    ...(selectedMetrics.includes('recall') ? [{ 
      key: 'recall', 
      label: 'Recall',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    }] : []),
    { 
      key: 'earlyPrec', 
      label: 'Early Precision',
      sortable: true,
      render: (val: number) => <span>{val.toFixed(3)}</span>
    },
    ...(selectedMetrics.includes('runtime') ? [{ 
      key: 'runtime', 
      label: 'Runtime (s)',
      sortable: true,
      render: (val: number) => (
        <Badge variant={val < 200 ? 'success' : val < 400 ? 'warning' : 'default'}>
          {val}s
        </Badge>
      )
    }] : []),
    ...(selectedMetrics.includes('memory') ? [{ 
      key: 'memory', 
      label: 'Memory (GB)',
      sortable: true,
      render: (val: number) => (
        <Badge variant={val < 2 ? 'success' : val < 4 ? 'warning' : 'default'}>
          {val}GB
        </Badge>
      )
    }] : [])
  ];
  
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Algorithm Comparison</h1>
        <p className="text-gray-600">Compare GRN inference algorithm performance on hESC dataset</p>
      </div>
      
      {/* Algorithm Selector */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Select Algorithms to Compare</h3>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedAlgorithms(algorithms.map(a => a.name))}
            >
              Select All
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedAlgorithms([])}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {algorithms.map((algo) => (
            <AlgorithmChip
              key={algo.name}
              name={algo.name}
              color={algo.color}
              selected={selectedAlgorithms.includes(algo.name)}
              onClick={() => toggleAlgorithm(algo.name)}
            />
          ))}
        </div>
      </div>
      
      {/* Performance Metrics Table */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-1">Performance Metrics</h3>
            <p className="text-gray-500 text-sm">Comparative performance across all metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<FileText className="w-4 h-4" />} onClick={exportCSV}>
              CSV
            </Button>
            <Button variant="secondary" icon={<Download className="w-4 h-4" />} onClick={exportPDF}>
              PDF
            </Button>
          </div>
        </div>
        
        {/* Metric Selection and Normalize Controls */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-2">Select Metrics to Display</label>
              <div className="flex flex-wrap gap-2">
                {metricOptions.map((metric) => (
                  <button
                    key={metric.key}
                    onClick={() => toggleMetric(metric.key)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
                      selectedMetrics.includes(metric.key)
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="ml-6 pl-6 border-l border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={normalizeMetrics}
                  onChange={(e) => setNormalizeMetrics(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Normalize Metrics</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">Scale 0-1 for comparison</p>
            </div>
          </div>
        </div>
        
        <DataTable columns={columns} data={performanceData} />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* PR Curve Overlay */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 mb-1">Precision-Recall Curves</h3>
              <p className="text-gray-500 text-sm">Multi-algorithm overlay</p>
            </div>
            <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={prCurveData}>
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
              <Legend />
              {selectedAlgorithms.map((algoName) => {
                const algo = algorithms.find(a => a.name === algoName);
                return (
                  <Line
                    key={algoName}
                    type="monotone"
                    dataKey={algoName}
                    stroke={algo?.color}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* ROC Curve Overlay */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 mb-1">ROC Curves</h3>
              <p className="text-gray-500 text-sm">Receiver operating characteristic</p>
            </div>
            <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={prCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="recall" 
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
              <Legend />
              <Line type="monotone" dataKey="recall" stroke="#D1D5DB" strokeDasharray="5 5" name="Random" />
              {selectedAlgorithms.map((algoName) => {
                const algo = algorithms.find(a => a.name === algoName);
                return (
                  <Line
                    key={algoName}
                    type="monotone"
                    dataKey={algoName}
                    stroke={algo?.color}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motif Enrichment */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">Top Motif Enrichment</h3>
          <p className="text-gray-500 text-sm mb-6">Transcription factor binding site enrichment</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={motifEnrichmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis dataKey="motif" type="category" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="enrichment" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Algorithm Similarity Heatmap */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-1">Algorithm Similarity</h3>
          <p className="text-gray-500 text-sm mb-6">Network prediction overlap (Jaccard index)</p>
          
          <div className="space-y-3">
            {similarityData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-48">
                  <span className="text-sm text-gray-700">{item.algo1}</span>
                  <span className="text-gray-400">↔</span>
                  <span className="text-sm text-gray-700">{item.algo2}</span>
                </div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-end pr-3"
                    style={{ width: `${item.similarity * 100}%` }}
                  >
                    <span className="text-white text-sm">{item.similarity.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900">
              <strong>Note:</strong> High similarity indicates algorithms predict overlapping edge sets. 
              Low similarity suggests complementary approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}