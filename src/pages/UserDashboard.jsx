import React, { useMemo } from 'react';
import {
  Plus,
  Clock,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  FileQuestion,
  Building,
  MapPin
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard.jsx';
import { RequestTable } from '../components/RequestTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { requests, setIsCreateModalOpen } = useRequests();

  // Filter requests belonging to this user
  const myRequests = useMemo(() => {
    return requests.filter(r => r.createdBy?.id === currentUser?.id || r.createdBy?.email === currentUser?.email);
  }, [requests, currentUser]);

  const totalCount = myRequests.length;
  const pendingCount = myRequests.filter(r => r.status === 'Submitted' || r.status === 'Pending').length;
  const inProgressCount = myRequests.filter(r => r.status === 'Assigned' || r.status === 'In Progress').length;
  const completedCount = myRequests.filter(r => r.status === 'Completed').length;

  return (
    <div>
      {/* Welcome Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
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
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#bfdbfe' }}>
              Faculty & Student Facilities Portal
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.2rem' }}>
            Welcome back, {currentUser?.name || 'Faculty Member'}!
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#dbeafe', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={16} /> <strong>Assigned Wing:</strong> {currentUser?.building || 'Circuit Block'} • {currentUser?.roomNumber || '3rd Floor — CSE Lab 3'}
          </p>
        </div>

        <button
          className="btn-primary"
          style={{
            background: '#ffffff',
            color: '#1d4ed8',
            padding: '0.75rem 1.4rem',
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} />
          Report New Maintenance Issue
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="My Total Requests"
          value={totalCount}
          icon={FileQuestion}
          iconBg="#eff6ff"
          iconColor="#2563eb"
          trend="Lifetime submitted"
        />
        <MetricCard
          title="Awaiting Review"
          value={pendingCount}
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
          trend="Submitted / Pending"
          trendColor="#d97706"
        />
        <MetricCard
          title="In Progress Repairs"
          value={inProgressCount}
          icon={Wrench}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          trend="Assigned or working"
          trendColor="#0284c7"
        />
        <MetricCard
          title="Resolved"
          value={completedCount}
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#10b981"
          trend="Repairs completed"
          trendColor="#10b981"
        />
      </div>

      {/* Requests Table */}
      <RequestTable
        requests={myRequests}
        title="My Maintenance Requests"
        subtitle="Manage and track resolution progress for all complaints reported by you"
      />
    </div>
  );
};
