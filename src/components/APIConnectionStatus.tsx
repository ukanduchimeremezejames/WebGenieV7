import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

type ConnectionState = 'connected' | 'reconnecting' | 'offline';

export function APIConnectionStatus() {
  const [status, setStatus] = useState<ConnectionState>('connected');
  
  // Mock connection check - replace with actual API health check
  useEffect(() => {
    // Simulate connection monitoring
    const interval = setInterval(() => {
      // In production, check API health endpoint
      const random = Math.random();
      if (random > 0.95) {
        setStatus('reconnecting');
        setTimeout(() => setStatus('connected'), 2000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (status === 'connected') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
        <Wifi className="w-4 h-4" />
        <span>Connected to API</span>
      </div>
    );
  }
  
  if (status === 'reconnecting') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
        <AlertCircle className="w-4 h-4 animate-pulse" />
        <span>Reconnecting...</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm">
      <WifiOff className="w-4 h-4" />
      <span>API offline</span>
    </div>
  );
}

export function APIOfflineBanner() {
  return (
    <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-center gap-2">
      <WifiOff className="w-5 h-5" />
      <span className="font-medium">API Connection Lost</span>
      <span className="text-red-100">- Some features may be unavailable</span>
    </div>
  );
}
