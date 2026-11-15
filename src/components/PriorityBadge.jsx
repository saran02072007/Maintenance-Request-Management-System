import React from 'react';
import { getPriorityConfig } from '../utils/formatters.js';

export const PriorityBadge = ({ priority }) => {
  const config = getPriorityConfig(priority);

  return (
    <span className={`priority-pill ${config.badgeClass}`}>
      {config.label}
    </span>
  );
};
