import React from 'react';

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  iconBg = '#eff6ff',
  iconColor = '#2563eb',
  trend = '',
  trendColor = '#047857',
  onClick = null
}) => {
  return (
    <div
      className={`metric-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <div className="metric-icon-box" style={{ backgroundColor: iconBg, color: iconColor }}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <div className="metric-value">{value}</div>
      {trend && (
        <div className="metric-footer">
          <span style={{ color: trendColor, fontWeight: 600 }}>{trend}</span>
        </div>
      )}
    </div>
  );
};
