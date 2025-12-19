import { CheckCircle2, XCircle, Clock, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './Badge';
import type { JobExecution, JobStatus } from '../data/beelineData';

interface JobExecutionCardProps {
  job: JobExecution;
}

export function JobExecutionCard({ job }: JobExecutionCardProps) {
  const [showLog, setShowLog] = useState(false);

  const statusConfig: Record<JobStatus, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
    queued: {
      icon: <Clock className="w-5 h-5" />,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    },
    validating: {
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    processing: {
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    completed: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    failed: {
      icon: <XCircle className="w-5 h-5" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  const config = statusConfig[job.status];

  return (
    <div className={`border ${config.border} rounded-lg overflow-hidden`}>
      {/* Header */}
      <div className={`${config.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={config.color}>
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-gray-900">{job.id}</span>
                <Badge 
                  variant={
                    job.status === 'completed' ? 'success' :
                    job.status === 'failed' ? 'error' :
                    job.status === 'processing' ? 'info' :
                    job.status === 'validating' ? 'warning' :
                    'default'
                  }
                  size="sm"
                >
                  {job.status.toUpperCase()}
                </Badge>
              </div>
              {job.message && (
                <p className="text-sm text-gray-600 mt-1">{job.message}</p>
              )}
            </div>
          </div>
          
          {job.startTime && (
            <div className="text-xs text-gray-500">
              Started: {job.startTime}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {job.status === 'processing' && job.progress !== undefined && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Progress</span>
              <span>{job.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {job.status === 'failed' && job.error && (
          <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded text-sm text-red-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>{job.error}</div>
            </div>
          </div>
        )}
      </div>

      {/* Log Viewer */}
      {job.log && job.log.length > 0 && (
        <div className="border-t border-gray-200">
          <button
            onClick={() => setShowLog(!showLog)}
            className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700"
          >
            <span>View Execution Log</span>
            {showLog ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {showLog && (
            <div className="p-4 bg-gray-900 max-h-[300px] overflow-y-auto">
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                {job.log.join('\n')}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
