import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = ({ toast, onClose }) => {
  if (!toast) return null;

  const { message, type = 'info' } = toast;

  let Icon = Info;
  let toastClass = 'toast-info';

  if (type === 'success') {
    Icon = CheckCircle2;
    toastClass = 'toast-success';
  } else if (type === 'error') {
    Icon = AlertCircle;
    toastClass = 'toast-error';
  }

  return (
    <div className={`toast-floating ${toastClass}`}>
      <Icon size={18} />
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{ marginLeft: '0.5rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
