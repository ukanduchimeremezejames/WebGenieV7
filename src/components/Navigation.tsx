import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Activity } from 'lucide-react';
import { APIConnectionStatus } from './APIConnectionStatus';

export function Navigation() {
  const location = useLocation();
  
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/datasets', label: 'Datasets' },
    { path: '/compare', label: 'Compare' },
    { path: '/explorer', label: 'Explorer' },
    { path: '/upload', label: 'Upload' },
  ];
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">GENEVAL</div>
                <div className="text-xs text-gray-500">Benchmarking Platform</div>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search and User Menu */}
          <div className="flex items-center gap-4">
            <APIConnectionStatus />
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search datasets, algorithms..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}