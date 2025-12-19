import { AlertCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorPanelProps {
  title: string;
  message: string;
  details?: string;
  type?: 'error' | 'warning' | 'validation';
  onRetry?: () => void;
}

export function ErrorPanel({ title, message, details, type = 'error', onRetry }: ErrorPanelProps) {
  const config = {
    error: {
      icon: <XCircle className="w-6 h-6" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-700'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      textColor: 'text-yellow-700'
    },
    validation: {
      icon: <AlertCircle className="w-6 h-6" />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-900',
      textColor: 'text-orange-700'
    }
  };

  const style = config[type];

  return (
    <div className={`${style.bgColor} border ${style.borderColor} rounded-lg p-6`}>
      <div className="flex gap-4">
        <div className={style.iconColor}>
          {style.icon}
        </div>
        <div className="flex-1">
          <h4 className={`${style.titleColor} mb-2`}>{title}</h4>
          <p className={`${style.textColor} text-sm mb-3`}>{message}</p>
          {details && (
            <details className="mt-3">
              <summary className={`${style.textColor} text-sm cursor-pointer hover:underline`}>
                View technical details
              </summary>
              <pre className={`mt-2 p-3 bg-white border ${style.borderColor} rounded text-xs overflow-x-auto`}>
                {details}
              </pre>
            </details>
          )}
          {onRetry && (
            <Button 
              variant="secondary" 
              size="sm" 
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRetry}
              className="mt-4"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function APIError400() {
  return (
    <ErrorPanel
      type="validation"
      title="Bad Request (400)"
      message="The request could not be processed due to invalid input."
      details="validation_error: Field 'dataset_id' is required but was not provided."
    />
  );
}

export function APIError422() {
  return (
    <ErrorPanel
      type="validation"
      title="Validation Error (422)"
      message="The server could not validate your request."
      details={`{
  "detail": [
    {
      "loc": ["body", "algorithm_params", "n_estimators"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}`}
    />
  );
}

export function APIError500() {
  return (
    <ErrorPanel
      type="error"
      title="Internal Server Error (500)"
      message="The backend encountered an unexpected error."
      details="Internal server error: Database connection timeout after 30s"
      onRetry={() => window.location.reload()}
    />
  );
}
