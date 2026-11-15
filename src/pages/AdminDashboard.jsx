import React from 'react';
import {
  Layers,
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Users,
  BarChart3,
  TrendingUp,
  Percent
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard.jsx';
import { RequestTable } from '../components/RequestTable.jsx';
import { useRequests } from '../context/RequestContext.jsx';

export const AdminDashboard = ({ onNavigate }) => {
  const { requests, report, technicians } = useRequests();

  const total = report.getTotalCount();
  const pending = report.getPendingCount();
  const inProgress = report.getInProgressCount();
  const completed = report.getCompletedCount();
  const highUrgent = report.getHighUrgentCount();
  const resolutionRate = report.getResolutionRate();

  return (
    <div>
      {/* Admin KPI Metrics Bar */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Work Orders"
          value={total}
          icon={Layers}
          iconBg="#eff6ff"
          iconColor="#2563eb"
          trend="All campus facilities"
        />
        <MetricCard
          title="Pending Triage"
          value={pending}
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
          trend="Needs technician dispatch"
          trendColor="#d97706"
        />
        <MetricCard
          title="In Progress"
          value={inProgress}
          icon={Wrench}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          trend="Active field repairs"
          trendColor="#0284c7"
        />
        <MetricCard
          title="High & Urgent"
          value={highUrgent}
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
          trend="Critical attention"
          trendColor="#dc2626"
        />
        <MetricCard
          title="Resolved"
          value={completed}
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#10b981"
          trend={`${resolutionRate}% resolution rate`}
          trendColor="#10b981"
        />
      </div>

      {/* Quick Action Navigation Strip */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TrendingUp size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#11235a' }}>
              KRCT Estate & Campus Operations Center
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Circuit Block (4 Floors) & Unwind Block (5 Floors) Monitored • {technicians.length} Technicians Active • Avg. Turnaround {report.getAverageResolutionHours()} hrs
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {onNavigate && (
            <>
              <button
                className="btn-secondary"
                onClick={() => onNavigate('analytics')}
                style={{ fontSize: '0.84rem', padding: '0.5rem 0.9rem' }}
              >
                <BarChart3 size={15} /> View Full Reports
              </button>
              <button
                className="btn-secondary"
                onClick={() => onNavigate('users')}
                style={{ fontSize: '0.84rem', padding: '0.5rem 0.9rem' }}
              >
                <Users size={15} /> Manage Staff & Techs
              </button>
            </>
          )}
        </div>
      </div>

      {/* All Requests Table */}
      <RequestTable
        requests={requests}
        title="Central Maintenance Queue"
        subtitle="Full log of all campus maintenance tickets, assign technicians and update statuses"
        showFilters={true}
      />
    </div>
  );
};
