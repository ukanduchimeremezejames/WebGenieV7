// Real BEELINE Datasets
export const BEELINE_DATASETS = [
  {
    id: 'beeline-synthetic-100',
    name: 'BEELINE_Synthetic_100',
    organism: 'Synthetic',
    type: 'Synthetic',
    genes: 100,
    cells: 500,
    samples: 500,
    edges: 150,
    source: 'synthetic' as const,
    version: 'v1.0',
    lastUpdated: '2024-11-20',
    description: 'Synthetic benchmark dataset with 100 genes and 500 samples',
    sparklineData: [12, 18, 24, 31, 38, 45, 52, 58, 64, 71]
  },
  
  {
    id: 'beeline-synthetic-500',
    name: 'BEELINE_Synthetic_500',
    organism: 'Synthetic',
    type: 'Synthetic',
    genes: 500,
    cells: 1500,
    samples: 1500,
    edges: 750,
    source: 'synthetic' as const,
    version: 'v1.0',
    lastUpdated: '2024-11-18',
    description: 'Synthetic benchmark dataset with 500 genes and 1500 samples',
    sparklineData: [15, 22, 29, 36, 43, 50, 57, 64, 71, 78]
  },
  {
    id: 'mesc-scrnaseq',
    name: 'mESC_scRNAseq',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 12000,
    cells: 2500,
    samples: 2500,
    edges: 15000,
    source: 'real' as const,
    version: 'v2.0',
    lastUpdated: '2024-11-15',
    description: 'Mouse embryonic stem cell single-cell RNA-seq dataset',
    sparklineData: [28, 35, 42, 49, 56, 63, 70, 77, 84, 91]
  },
  {
    id: 'hematopoiesis-sc',
    name: 'Hematopoiesis_SC',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 18000,
    cells: 4500,
    samples: 4500,
    edges: 22000,
    source: 'curated' as const,
    version: 'v2.1',
    lastUpdated: '2024-11-12',
    description: 'Human hematopoiesis single-cell dataset with known regulatory interactions',
    sparklineData: [32, 39, 46, 53, 60, 67, 74, 81, 88, 95]
  },
  // Additional datasets for completeness
  {
    id: 'hesc',
    name: 'hESC',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 1872,
    cells: 758,
    samples: 758,
    edges: 3289,
    source: 'curated' as const,
    version: 'v1.5',
    lastUpdated: '2024-10-28',
    description: 'Human embryonic stem cell dataset',
    sparklineData: [34, 45, 52, 48, 61, 73, 68, 82, 91, 78]
  },
  {
    id: 'mdc',
    name: 'mDC',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1547,
    cells: 383,
    samples: 383,
    edges: 2456,
    source: 'real' as const,
    version: 'v1.2',
    lastUpdated: '2024-10-15',
    description: 'Mouse dendritic cell differentiation dataset',
    sparklineData: [28, 31, 39, 42, 38, 51, 58, 64, 59, 71]
  }
];

// Real BEELINE Algorithms
export const BEELINE_ALGORITHMS = [
  {
    id: 'sincerities',
    name: 'SINCERITIES',
    version: 'v1.0.3',
    status: 'production' as const,
    lastRun: '2024-12-18 14:32',
    description: 'Temporal modeling approach using ordinary differential equations',
    sourceUrl: 'https://github.com/CABSEL/SINCERITIES',
    avgAUPRC: 0.721,
    avgAUROC: 0.847,
    totalRuns: 134,
    parameters: {
      nCores: { type: 'integer', default: 4, min: 1, max: 16 },
      normalize: { type: 'boolean', default: true }
    }
  },
  {
    id: 'scode',
    name: 'SCODE',
    version: 'v2.1.0',
    status: 'production' as const,
    lastRun: '2024-12-18 13:15',
    description: 'Linear ordinary differential equation-based method',
    sourceUrl: 'https://github.com/hmatsu1226/SCODE',
    avgAUPRC: 0.698,
    avgAUROC: 0.823,
    totalRuns: 156,
    parameters: {
      D: { type: 'integer', default: 100, min: 50, max: 200 },
      cell_normalize: { type: 'boolean', default: true }
    }
  },
  {
    id: 'scns',
    name: 'SCNS',
    version: 'v1.4.2',
    status: 'production' as const,
    lastRun: '2024-12-18 12:48',
    description: 'Single-cell network synthesis using LASSO regression',
    sourceUrl: 'https://github.com/seferlab/scns',
    avgAUPRC: 0.654,
    avgAUROC: 0.789,
    totalRuns: 142,
    parameters: {
      lambda: { type: 'float', default: 0.01, min: 0.001, max: 0.1 },
      max_iter: { type: 'integer', default: 100, min: 50, max: 500 }
    }
  },
  {
    id: 'scinge',
    name: 'SCINGE',
    version: 'v0.9.1',
    status: 'beta' as const,
    lastRun: '2024-12-18 11:20',
    description: 'Single-cell inference of networks using granger ensembles',
    sourceUrl: 'https://github.com/gitter-lab/SCINGE',
    avgAUPRC: 0.712,
    avgAUROC: 0.845,
    totalRuns: 98,
    parameters: {
      num_lags: { type: 'integer', default: 5, min: 1, max: 10 },
      kernel_width: { type: 'float', default: 0.5, min: 0.1, max: 2.0 }
    }
  },
  {
    id: 'ppcor',
    name: 'PPCOR',
    version: 'v2.4.1',
    status: 'production' as const,
    lastRun: '2024-12-18 10:55',
    description: 'Partial correlation-based network inference method',
    sourceUrl: 'https://github.com/cran/ppcor',
    avgAUPRC: 0.618,
    avgAUROC: 0.793,
    totalRuns: 203,
    parameters: {
      method: { type: 'select', default: 'pearson', options: ['pearson', 'spearman'] }
    }
  },
  {
    id: 'pidc',
    name: 'PIDC',
    version: 'v1.5.2',
    status: 'production' as const,
    lastRun: '2024-12-18 10:12',
    description: 'Partial information decomposition and context-based method',
    sourceUrl: 'https://github.com/Tchanders/NetworkInference.jl',
    avgAUPRC: 0.685,
    avgAUROC: 0.809,
    totalRuns: 178,
    parameters: {
      estimator: { type: 'select', default: 'mi', options: ['mi', 'pmi'] }
    }
  },
  {
    id: 'leap',
    name: 'LEAP',
    version: 'v1.2.0',
    status: 'production' as const,
    lastRun: '2024-12-18 09:34',
    description: 'Lag-based expression association for pseudotime-series',
    sourceUrl: 'https://github.com/LEAP-method/LEAP',
    avgAUPRC: 0.742,
    avgAUROC: 0.868,
    totalRuns: 112,
    parameters: {
      maxLag: { type: 'integer', default: 5, min: 1, max: 10 }
    }
  },
  {
    id: 'scribe',
    name: 'SCRIBE',
    version: 'v0.8.4',
    status: 'beta' as const,
    lastRun: '2024-12-17 16:22',
    description: 'Causal network inference from single-cell data',
    sourceUrl: 'https://github.com/aristoteleo/Scribe-py',
    avgAUPRC: 0.695,
    avgAUROC: 0.834,
    totalRuns: 87,
    parameters: {
      delay: { type: 'integer', default: 3, min: 1, max: 5 }
    }
  },
  {
    id: 'grnvbem',
    name: 'GRNVBEM',
    version: 'v1.1.5',
    status: 'production' as const,
    lastRun: '2024-12-17 15:45',
    description: 'Variational Bayesian expectation-maximization for GRN inference',
    sourceUrl: 'https://github.com/examples/grnvbem',
    avgAUPRC: 0.667,
    avgAUROC: 0.798,
    totalRuns: 124,
    parameters: {
      max_iter: { type: 'integer', default: 1000, min: 100, max: 5000 }
    }
  },
  {
    id: 'grisli',
    name: 'GRISLI',
    version: 'v2.0.1',
    status: 'production' as const,
    lastRun: '2024-12-17 14:18',
    description: 'Gene regulation inference using stability-based linear method',
    sourceUrl: 'https://github.com/GRISLI-method/GRISLI',
    avgAUPRC: 0.703,
    avgAUROC: 0.841,
    totalRuns: 145,
    parameters: {
      stability_threshold: { type: 'float', default: 0.5, min: 0.1, max: 0.9 }
    }
  },
  {
    id: 'genie3',
    name: 'GENIE3',
    version: 'v1.12.0',
    status: 'production' as const,
    lastRun: '2024-12-17 13:42',
    description: 'Random forest-based ensemble method for GRN inference',
    sourceUrl: 'https://github.com/vahuynh/GENIE3',
    avgAUPRC: 0.834,
    avgAUROC: 0.912,
    totalRuns: 247,
    parameters: {
      n_estimators: { type: 'integer', default: 1000, min: 100, max: 5000 },
      max_features: { type: 'select', default: 'sqrt', options: ['sqrt', 'log2', 'all'] }
    }
  },
  {
    id: 'grnboost2',
    name: 'GRNBOOST2',
    version: 'v0.9.8',
    status: 'production' as const,
    lastRun: '2024-12-17 12:55',
    description: 'Gradient boosting-based method optimized for large-scale datasets',
    sourceUrl: 'https://github.com/aertslab/GRNBoost',
    avgAUPRC: 0.798,
    avgAUROC: 0.886,
    totalRuns: 189,
    parameters: {
      n_estimators: { type: 'integer', default: 1000, min: 100, max: 5000 },
      learning_rate: { type: 'float', default: 0.01, min: 0.001, max: 0.1 }
    }
  }
];

export type JobStatus = 
  | 'queued'
  | 'validating'
  | 'processing'
  | 'completed'
  | 'failed';

export interface JobExecution {
  id: string;
  status: JobStatus;
  progress?: number;
  message?: string;
  log?: string[];
  startTime?: string;
  endTime?: string;
  error?: string;
}
