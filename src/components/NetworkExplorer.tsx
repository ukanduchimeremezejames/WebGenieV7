import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  Layers, Grid3x3, Circle, Filter, Eye, EyeOff, 
  Download, Share2, Maximize2 
} from 'lucide-react';

export function NetworkExplorer() {
  const [layoutType, setLayoutType] = useState<'force' | 'concentric' | 'grid'>('force');
  const [showOverlay, setShowOverlay] = useState(false);
  const [tfOnlyView, setTfOnlyView] = useState(false);
  const [showModules, setShowModules] = useState(true);
  
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Network Explorer</h1>
        <p className="text-gray-600">Interactive exploration and comparison of GRN predictions</p>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Filters & Settings</h3>
            </div>
            
            <div className="space-y-6">
              {/* Layout Switcher */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">Layout Type</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setLayoutType('force')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                      layoutType === 'force' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    <div className="text-left">
                      <p className="text-sm">Force-Directed</p>
                      <p className="text-xs text-gray-500">Physics-based</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setLayoutType('concentric')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                      layoutType === 'concentric' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Circle className="w-5 h-5" />
                    <div className="text-left">
                      <p className="text-sm">Concentric</p>
                      <p className="text-xs text-gray-500">Radial circles</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setLayoutType('grid')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                      layoutType === 'grid' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                    <div className="text-left">
                      <p className="text-sm">Grid</p>
                      <p className="text-xs text-gray-500">Structured</p>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* View Options */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">View Options</label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">TF-only View</span>
                    <input 
                      type="checkbox"
                      checked={tfOnlyView}
                      onChange={(e) => setTfOnlyView(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Show Modules</span>
                    <input 
                      type="checkbox"
                      checked={showModules}
                      onChange={(e) => setShowModules(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Overlay Runs</span>
                    <input 
                      type="checkbox"
                      checked={showOverlay}
                      onChange={(e) => setShowOverlay(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </label>
                </div>
              </div>
              
              {/* Run Selection for Overlay */}
              {showOverlay && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-900 mb-3">Select runs to overlay:</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        defaultChecked
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-purple-900">GENIE3 (primary)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-purple-900">GRNBoost2</span>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Node Filtering */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Min Node Degree</label>
                <input 
                  type="range"
                  min="1"
                  max="20"
                  defaultValue="3"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
              
              {/* Edge Filtering */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Min Edge Score</label>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="0.5"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.0</span>
                  <span>1.0</span>
                </div>
              </div>
              
              <Button variant="primary" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Network Canvas */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-gray-900">Network Graph</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="primary">847 nodes</Badge>
                  <Badge variant="info">2,134 edges</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                  Visibility
                </Button>
                <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                  Export
                </Button>
                <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
                  Share
                </Button>
                <Button variant="ghost" size="sm" icon={<Maximize2 className="w-4 h-4" />}>
                  Fullscreen
                </Button>
              </div>
            </div>
            
            {/* Network Visualization Canvas */}
            <div className="relative h-[700px] bg-gradient-to-br from-slate-50 to-purple-50 rounded-lg border-2 border-gray-200">
              {/* Advanced network placeholder with visual elements */}
              <svg className="w-full h-full" viewBox="0 0 1000 700">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="1000" height="700" fill="url(#grid)" opacity="0.3"/>
                
                {/* Central module */}
                <g opacity="0.2">
                  <ellipse cx="500" cy="350" rx="200" ry="150" fill="#5B2C6F" />
                </g>
                
                {/* Sample edges */}
                <line x1="300" y1="250" x2="500" y2="200" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />
                <line x1="500" y1="200" x2="700" y2="250" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />
                <line x1="400" y1="400" x2="600" y2="400" stroke="#28A745" strokeWidth="3" opacity="0.7" />
                <line x1="300" y1="500" x2="500" y2="450" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />
                <line x1="500" y1="450" x2="700" y2="500" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />
                
                {/* Sample nodes */}
                <g>
                  <circle cx="500" cy="200" r="25" fill="#5B2C6F" stroke="white" strokeWidth="3" />
                  <text x="500" y="205" textAnchor="middle" fill="white" fontSize="12">SOX2</text>
                </g>
                
                <g>
                  <circle cx="300" cy="250" r="20" fill="#28A745" stroke="white" strokeWidth="3" />
                  <text x="300" y="255" textAnchor="middle" fill="white" fontSize="11">OCT4</text>
                </g>
                
                <g>
                  <circle cx="700" cy="250" r="20" fill="#3B82F6" stroke="white" strokeWidth="3" />
                  <text x="700" y="255" textAnchor="middle" fill="white" fontSize="11">KLF4</text>
                </g>
                
                <g>
                  <circle cx="400" cy="400" r="22" fill="#F59E0B" stroke="white" strokeWidth="3" />
                  <text x="400" y="405" textAnchor="middle" fill="white" fontSize="11">NANOG</text>
                </g>
                
                <g>
                  <circle cx="600" cy="400" r="22" fill="#EF4444" stroke="white" strokeWidth="3" />
                  <text x="600" y="405" textAnchor="middle" fill="white" fontSize="11">MYC</text>
                </g>
                
                <g>
                  <circle cx="500" cy="450" r="18" fill="#8B5CF6" stroke="white" strokeWidth="3" />
                  <text x="500" y="455" textAnchor="middle" fill="white" fontSize="10">UTF1</text>
                </g>
                
                <g>
                  <circle cx="300" cy="500" r="16" fill="#6B7280" stroke="white" strokeWidth="3" />
                </g>
                
                <g>
                  <circle cx="700" cy="500" r="16" fill="#6B7280" stroke="white" strokeWidth="3" />
                </g>
              </svg>
              
              {/* Controls overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
                  <span className="text-xl">+</span>
                </button>
                <button className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
                  <span className="text-xl">−</span>
                </button>
                <button className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
                  <span className="text-sm">⟲</span>
                </button>
              </div>
              
              {/* Module detection indicator */}
              {showModules && (
                <div className="absolute top-4 right-4 px-4 py-3 bg-white rounded-lg shadow-lg border border-purple-200">
                  <p className="text-sm text-gray-700 mb-2">Detected Modules</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-xs text-gray-600">Module 1 (45)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs text-gray-600">Module 2 (32)</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 px-4 py-3 bg-white rounded-lg shadow-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-2">Node Types</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                    <span className="text-xs text-gray-600">Transcription Factor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400" />
                    <span className="text-xs text-gray-600">Target Gene</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <p className="text-sm text-gray-700 mb-2">Edge Types</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-green-500" />
                      <span className="text-xs text-gray-600">Activation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-red-500" />
                      <span className="text-xs text-gray-600">Inhibition</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 right-4 px-4 py-3 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Avg Degree</p>
                    <p className="text-lg text-gray-900">5.2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Density</p>
                    <p className="text-lg text-gray-900">0.31</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Network Statistics */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Network Diameter</p>
              <p className="text-2xl text-gray-900">8</p>
              <p className="text-xs text-gray-500 mt-1">Max shortest path</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Clustering Coefficient</p>
              <p className="text-2xl text-gray-900">0.42</p>
              <p className="text-xs text-gray-500 mt-1">Network density</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Hub Genes</p>
              <p className="text-2xl text-gray-900">23</p>
              <p className="text-xs text-gray-500 mt-1">Degree &gt; 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}