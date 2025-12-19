import { FileCode2, Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

interface ProvenancePanelProps {
  runId: string;
  jobId: string;
  datasetName: string;
  datasetVersion: string;
  algorithmName: string;
  algorithmVersion: string;
  parameterHash: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export function ProvenancePanel({
  runId,
  jobId,
  datasetName,
  datasetVersion,
  algorithmName,
  algorithmVersion,
  parameterHash,
  timestamp,
  metadata
}: ProvenancePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const fullMetadata = {
    run_id: runId,
    backend_job_id: jobId,
    dataset: {
      name: datasetName,
      version: datasetVersion
    },
    algorithm: {
      name: algorithmName,
      version: algorithmVersion
    },
    parameter_hash: parameterHash,
    timestamp: timestamp,
    ...metadata
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <FileCode2 className="w-5 h-5 text-gray-600" />
          <h4 className="text-gray-900">Run Metadata & Provenance</h4>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" size="sm">Traceable</Badge>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Summary (always visible) */}
      <div className="p-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Run ID:</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-purple-600">{runId}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(runId);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div>
          <span className="text-gray-500">Backend Job ID:</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-gray-700">{jobId}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(jobId);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div>
          <span className="text-gray-500">Dataset:</span>
          <div className="mt-1">
            <span className="text-gray-900">{datasetName}</span>
            <Badge variant="default" size="sm" className="ml-2">{datasetVersion}</Badge>
          </div>
        </div>
        
        <div>
          <span className="text-gray-500">Algorithm:</span>
          <div className="mt-1">
            <span className="text-gray-900">{algorithmName}</span>
            <Badge variant="default" size="sm" className="ml-2">{algorithmVersion}</Badge>
          </div>
        </div>
        
        <div>
          <span className="text-gray-500">Parameter Hash:</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-xs text-gray-600">{parameterHash}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(parameterHash);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div>
          <span className="text-gray-500">Timestamp:</span>
          <div className="mt-1 text-gray-700">{timestamp}</div>
        </div>
      </div>

      {/* Expanded metadata */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm text-gray-700">Full Metadata (YAML/JSON)</h5>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Copy className="w-4 h-4" />}
                onClick={() => copyToClipboard(JSON.stringify(fullMetadata, null, 2))}
              >
                Copy
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </div>
          
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
{JSON.stringify(fullMetadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
