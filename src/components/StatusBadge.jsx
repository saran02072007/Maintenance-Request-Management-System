import React from 'react';
import { getStatusConfig } from '../utils/formatters.js';

export const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);

  // Normalize class name for status
  const normalizedClass = (status || 'submitted').toLowerCase().replace(/\s+/g, '-');

  return (
    <span className={`status-badge status-${normalizedClass}`} title={config.description}>
      <span className="status-dot"></span>
      {config.label}
    </span>
  );
};
