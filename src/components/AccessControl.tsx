import { Lock, Shield, User } from 'lucide-react';
import { Badge } from './Badge';

export type UserRole = 'admin' | 'standard' | 'viewer';

interface AccessControlProps {
  requiredRole: UserRole;
  currentRole?: UserRole;
  children: React.ReactNode;
  showBadge?: boolean;
  showTooltip?: boolean;
}

const roleHierarchy = {
  admin: 3,
  standard: 2,
  viewer: 1,
};

export function AccessControl({ 
  requiredRole, 
  currentRole = 'standard', 
  children, 
  showBadge = false,
  showTooltip = true 
}: AccessControlProps) {
  const hasAccess = roleHierarchy[currentRole] >= roleHierarchy[requiredRole];

  if (!hasAccess) {
    return (
      <div className="relative group inline-block">
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 dark:bg-gray-100/10 rounded-lg">
          <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            Requires {requiredRole} access
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {children}
      {showBadge && (
        <div className="absolute -top-1 -right-1">
          <RoleBadge role={requiredRole} />
        </div>
      )}
    </div>
  );
}

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md';
}

export function RoleBadge({ role, size = 'sm' }: RoleBadgeProps) {
  const config = {
    admin: {
      icon: Shield,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      label: 'Admin',
    },
    standard: {
      icon: User,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      label: 'Standard',
    },
    viewer: {
      icon: User,
      color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      label: 'Viewer',
    },
  };

  const { icon: Icon, color, label } = config[role];

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${color} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{label}</span>
    </div>
  );
}

interface PermissionTooltipProps {
  action: string;
  requiredRole: UserRole;
  children: React.ReactNode;
}

export function PermissionTooltip({ action, requiredRole, children }: PermissionTooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {action} requires {requiredRole} access
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
      </div>
    </div>
  );
}
