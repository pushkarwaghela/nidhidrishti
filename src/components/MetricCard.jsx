import React from 'react';

export default function MetricCard({
  title,
  value,
  caption,
  icon: Icon,
  variant = 'default',
  badgeText
}) {
  // variants: 'default', 'critical', 'warning', 'success'
  return (
    <div className={`gov-kpi-card variant-${variant}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        {Icon && (
          <div className="kpi-card-icon">
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="kpi-card-value">
        {value}
      </div>

      <div className="kpi-card-caption">
        {caption}
      </div>
    </div>
  );
}
