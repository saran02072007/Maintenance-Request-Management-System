import React, { useMemo } from 'react';
import {
  Wrench,
  CheckCircle2,
  Clock,
  PauseCircle,
  HardHat,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard.jsx';
import { RequestTable } from '../components/RequestTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';

export const TechnicianDashboard = () => {
  const { currentUser } = useAuth();
  const { requests } = useRequests();

  // Filter requests assigned to this technician
  const assignedRequests = useMemo(() => {
    return requests.filter(r => r.assignment?.technicianId === currentUser?.id);
  }, [requests, currentUser]);

  const totalAssigned = assignedRequests.length;
  const pendingAcceptance = assignedRequests.filter(r => r.status === 'Assigned').length;
  const inProgress = assignedRequests.filter(r => r.status === 'In Progress').length;
  const onHold = assignedRequests.filter(r => r.status === 'On Hold').length;
  const completed = assignedRequests.filter(r => r.status === 'Completed').length;

  return (
    <div>
      {/* Technician Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, background: '#e8552d', color: '#ffffff', padding: '0.12rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
              KRCT AUTONOMOUS
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f59e0b' }}>
              Field Maintenance Operations
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.2rem' }}>
            {currentUser?.name || 'Technician'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={16} color="#f59e0b" /> Trade: {currentUser?.specialization || 'General Maintenance'} • Status: {currentUser?.status || 'Available'}
          </p>
        </div>

        {pendingAcceptance > 0 && (
          <div
            style={{
              background: '#fef3c7',
              color: '#92400e',
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={18} />
            {pendingAcceptance} new {pendingAcceptance === 1 ? 'job awaits' : 'jobs await'} your acceptance
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Assigned Jobs"
          value={totalAssigned}
          icon={HardHat}
          iconBg="#eff6ff"
          iconColor="#2563eb"
          trend="Lifetime dispatched"
        />
        <MetricCard
          title="Awaiting Acceptance"
          value={pendingAcceptance}
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
          trend="Needs prompt check-in"
          trendColor="#d97706"
        />
        <MetricCard
          title="Active In-Progress"
          value={inProgress}
          icon={Wrench}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          trend="Under active repair"
          trendColor="#0284c7"
        />
        <MetricCard
          title="On Hold (Parts/Delay)"
          value={onHold}
          icon={PauseCircle}
          iconBg="#fff7ed"
          iconColor="#ea580c"
          trend="Awaiting materials"
          trendColor="#ea580c"
        />
        <MetricCard
          title="Successfully Completed"
          value={completed}
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#10b981"
          trend="Repairs finalized"
          trendColor="#10b981"
        />
      </div>

      {/* Assigned Requests Table */}
      <RequestTable
        requests={assignedRequests}
        title="My Assigned Maintenance Jobs"
        subtitle="Accept assignments, log parts and diagnostic notes, and mark work completed"
      />
    </div>
  );
};
