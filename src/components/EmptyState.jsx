import React from 'react';
import { Inbox, Plus } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No requests found',
  description = 'There are no maintenance requests matching your current filters or criteria.',
  actionLabel = '',
  onAction = null
}) => {
  return (
    <div className="empty-state-box">
      <div className="empty-icon-circle">
        <Icon size={32} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button className="btn-primary" onClick={onAction}>
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
