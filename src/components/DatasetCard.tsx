import { Badge } from './Badge';
import { Button } from './Button';
import { Activity, Download, Database } from 'lucide-react';

interface DatasetCardProps {
  name: string;
  organism: string;
  type: string;
  genes: number;
  cells: number;
  edges: number;
  source?: 'synthetic' | 'real' | 'curated';
  lastUpdated?: string;
  sparklineData?: number[];
  onClick?: () => void;
}

export function DatasetCard({ 
  name, 
  organism, 
  type, 
  genes, 
  cells, 
  edges, 
  source = 'curated',
  lastUpdated = '2024-11-15',
  sparklineData,
  onClick 
}: DatasetCardProps) {
  const getSourceColor = (src: string) => {
    switch(src) {
      case 'synthetic': return 'warning';
      case 'real': return 'success';
      case 'curated': return 'info';
      default: return 'default';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="text-gray-900">{name}</h4>
            <p className="text-gray-500 text-xs">{organism}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="info" size="sm">{type}</Badge>
        </div>
      </div>
      
      {/* Metadata Row */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
        <Badge variant={getSourceColor(source)} size="sm">
          {source}
        </Badge>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500">Updated {lastUpdated}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Genes</p>
          <p className="text-gray-900">{genes.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Cells</p>
          <p className="text-gray-900">{cells.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Edges</p>
          <p className="text-gray-900">{edges.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Mini Preview Sparkline */}
      {sparklineData && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Activity Preview</span>
          </div>
          <svg width="100%" height="32" className="block">
            <polyline
              points={sparklineData.map((val, i) => 
                `${(i / (sparklineData.length - 1)) * 100}%,${32 - (val / Math.max(...sparklineData)) * 24}`
              ).join(' ')}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
      
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          View Details
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          icon={<Download className="w-4 h-4" />}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
        </Button>
      </div>
    </div>
  );
}