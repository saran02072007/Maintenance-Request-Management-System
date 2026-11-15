/**
 * Utility functions for date formatting, status styling, and badges
 */

export const formatDate = (isoString) => {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return isoString;
  }
};

export const formatRelativeTime = (isoString) => {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHr > 0) return `${diffHr}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return 'Just now';
  } catch (e) {
    return '';
  }
};

export const getStatusConfig = (status) => {
  switch (status) {
    case 'Submitted':
      return {
        label: 'Submitted',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        colorHex: '#3b82f6',
        description: 'Received in queue'
      };
    case 'Pending':
      return {
        label: 'Pending',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
        colorHex: '#f59e0b',
        description: 'Awaiting triage / review'
      };
    case 'Assigned':
      return {
        label: 'Assigned',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        dot: 'bg-indigo-500',
        colorHex: '#6366f1',
        description: 'Dispatched to technician'
      };
    case 'In Progress':
      return {
        label: 'In Progress',
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        dot: 'bg-sky-500',
        colorHex: '#0284c7',
        description: 'Active repair underway'
      };
    case 'On Hold':
      return {
        label: 'On Hold',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        dot: 'bg-orange-500',
        colorHex: '#ea580c',
        description: 'Awaiting parts / approval'
      };
    case 'Completed':
      return {
        label: 'Completed',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        colorHex: '#10b981',
        description: 'Resolved & verified'
      };
    case 'Rejected':
      return {
        label: 'Rejected',
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
        colorHex: '#ef4444',
        description: 'Cancelled or declined'
      };
    default:
      return {
        label: status || 'Unknown',
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        dot: 'bg-gray-500',
        colorHex: '#6b7280',
        description: ''
      };
  }
};

export const getPriorityConfig = (priority) => {
  switch (priority) {
    case 'Urgent':
      return {
        label: 'Urgent',
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#fecaca',
        badgeClass: 'priority-urgent'
      };
    case 'High':
      return {
        label: 'High',
        color: '#ea580c',
        bg: '#fff7ed',
        border: '#fed7aa',
        badgeClass: 'priority-high'
      };
    case 'Medium':
      return {
        label: 'Medium',
        color: '#2563eb',
        bg: '#eff6ff',
        border: '#bfdbfe',
        badgeClass: 'priority-medium'
      };
    case 'Low':
    default:
      return {
        label: 'Low',
        color: '#475569',
        bg: '#f8fafc',
        border: '#e2e8f0',
        badgeClass: 'priority-low'
      };
  }
};

export const CATEGORIES = [
  { id: 'Electrical', label: 'Electrical', icon: 'Zap', color: '#eab308' },
  { id: 'Plumbing', label: 'Plumbing', icon: 'Droplets', color: '#0ea5e9' },
  { id: 'Furniture', label: 'Furniture', icon: 'Armchair', color: '#d97706' },
  { id: 'AC', label: 'Air Conditioning', icon: 'Wind', color: '#06b6d4' },
  { id: 'Cleaning', label: 'Cleaning', icon: 'Sparkles', color: '#10b981' },
  { id: 'Other', label: 'General / Other', icon: 'Wrench', color: '#64748b' }
];
