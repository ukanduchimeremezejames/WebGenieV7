import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

type WorkflowStep = 
  | 'upload' 
  | 'validation' 
  | 'execution' 
  | 'metrics' 
  | 'comparison' 
  | 'export';

interface WorkflowProgressProps {
  currentStep: WorkflowStep;
  completedSteps?: WorkflowStep[];
}

const steps: { key: WorkflowStep; label: string }[] = [
  { key: 'upload', label: 'Upload' },
  { key: 'validation', label: 'Validation' },
  { key: 'execution', label: 'Algorithm Execution' },
  { key: 'metrics', label: 'Metrics Generation' },
  { key: 'comparison', label: 'Comparison Dashboard' },
  { key: 'export', label: 'Results Export' }
];

export function WorkflowProgress({ currentStep, completedSteps = [] }: WorkflowProgressProps) {
  const currentIndex = steps.findIndex(s => s.key === currentStep);
  
  const getStepStatus = (index: number, stepKey: WorkflowStep) => {
    if (completedSteps.includes(stepKey)) return 'completed';
    if (index === currentIndex) return 'active';
    if (index < currentIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index, step.key);
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  {/* Step indicator */}
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                    ${status === 'completed' 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : status === 'active'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : status === 'active' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className={`
                    text-sm transition-colors
                    ${status === 'completed' || status === 'active'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                    }
                  `}>
                    {step.label}
                  </div>
                </div>
                
                {/* Connector line */}
                {!isLast && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-colors
                    ${status === 'completed' ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
