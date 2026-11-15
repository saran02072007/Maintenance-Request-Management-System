import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  BarChart3,
  Users,
  FileCode2,
  LogOut,
  ShieldAlert,
  UserCheck,
  Building2,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';
import { KRCT_COLLEGE_INFO } from '../utils/krctCampusData.js';

export const Sidebar = ({ activeTab, setActiveTab, onOpenCampusDirectory, isMobileOpen, closeMobile }) => {
  const { currentUser, isAdmin, isTechnician, isUser, logout } = useAuth();
  const { requests, resetDemoData } = useRequests();

  // Badge counts
  const userRequestCount = requests.filter(r => r.createdBy?.id === currentUser?.id).length;
  const techJobsCount = requests.filter(r => r.assignment?.technicianId === currentUser?.id && r.status !== 'Completed').length;
  const pendingCount = requests.filter(r => r.status === 'Submitted' || r.status === 'Pending').length;

  const handleNavClick = (tabKey) => {
    setActiveTab(tabKey);
    if (closeMobile) closeMobile();
  };

  return (
    <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* KRCT Brand Header */}
      <div className="sidebar-header" style={{ padding: '1rem 1.25rem' }}>
        <div className="brand-badge" style={{ gap: '0.65rem' }}>
          <img
            src={KRCT_COLLEGE_INFO.logoUrl}
            alt="KRCT Logo"
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="brand-text">
            <h1 style={{ fontSize: '1.05rem', color: '#11235a' }}>KRCT FixFlow</h1>
            <span style={{ fontSize: '0.68rem', color: '#e8552d', fontWeight: 700 }}>
              Autonomous • Tiruchi
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <span className="nav-section-title">Operations Portal</span>

        {/* Dashboard */}
        <button
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNavClick('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        {/* Resident / Faculty User Specific */}
        {isUser && (
          <button
            className={`nav-item ${activeTab === 'my-requests' ? 'active' : ''}`}
            onClick={() => handleNavClick('my-requests')}
          >
            <ClipboardList size={18} />
            <span>My Lab & Class Requests</span>
            {userRequestCount > 0 && (
              <span className="nav-badge-count">{userRequestCount}</span>
            )}
          </button>
        )}

        {/* Technician Specific */}
        {isTechnician && (
          <button
            className={`nav-item ${activeTab === 'assigned-jobs' ? 'active' : ''}`}
            onClick={() => handleNavClick('assigned-jobs')}
          >
            <Wrench size={18} />
            <span>Assigned Work Orders</span>
            {techJobsCount > 0 && (
              <span className="nav-badge-count" style={{ background: '#fef3c7', color: '#92400e' }}>
                {techJobsCount}
              </span>
            )}
          </button>
        )}

        {/* Admin Specific */}
        {isAdmin && (
          <>
            <button
              className={`nav-item ${activeTab === 'all-requests' ? 'active' : ''}`}
              onClick={() => handleNavClick('all-requests')}
            >
              <ClipboardList size={18} />
              <span>Campus Queue</span>
              {pendingCount > 0 && (
                <span className="nav-badge-count" style={{ background: '#fef2f2', color: '#b91c1c' }}>
                  {pendingCount} new
                </span>
              )}
            </button>

            <button
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => handleNavClick('analytics')}
            >
              <BarChart3 size={18} />
              <span>Reports & Analytics</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => handleNavClick('users')}
            >
              <Users size={18} />
              <span>Faculty & Technicians</span>
            </button>
          </>
        )}

        <span className="nav-section-title" style={{ marginTop: '0.75rem' }}>
          Campus Infrastructure
        </span>

        {/* Campus Blocks & Floors Map Modal Trigger */}
        <button
          className="nav-item"
          onClick={() => {
            if (onOpenCampusDirectory) onOpenCampusDirectory();
            if (closeMobile) closeMobile();
          }}
          title="Circuit Block (4 Fl) & Unwind Block (5 Fl)"
        >
          <Building2 size={18} color="#1e3a8a" />
          <span>Campus Blocks & Floors</span>
        </button>

        <span className="nav-section-title" style={{ marginTop: '0.75rem' }}>
          Academic Project
        </span>

        {/* College OOAD Documentation */}
        <button
          className={`nav-item ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => handleNavClick('docs')}
        >
          <FileCode2 size={18} />
          <span>OOAD Diagrams & Report</span>
        </button>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Academic Submission Badge */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '0.45rem 0.6rem',
          marginBottom: '0.5rem',
          fontSize: '0.7rem',
          color: '#475569',
          lineHeight: 1.3
        }}>
          <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.72rem' }}>
            KRCT CSE • OOAD SEM 5
          </div>
          <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
            Sakthivel K • Saran I • Yuvaraj S
          </div>
        </div>

        {/* Active Role Indicator */}
        <div className="role-pill-indicator">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {isAdmin && <ShieldAlert size={14} color="#1e3a8a" />}
            {isTechnician && <Wrench size={14} color="#d97706" />}
            {isUser && <UserCheck size={14} color="#047857" />}
            <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.78rem' }}>
              {isAdmin ? 'Estate Admin' : isTechnician ? 'Field Technician' : 'Faculty / Resident'}
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#e8552d', fontWeight: 800 }}>KRCT</span>
        </div>

        {/* Reset Demo Data Button */}
        <button
          className="btn-secondary"
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}
          onClick={() => {
            if (window.confirm('Reset all campus requests back to initial KRCT demo records?')) {
              resetDemoData();
            }
          }}
          title="Reset LocalStorage data"
        >
          <RotateCcw size={13} />
          Reset Demo Data
        </button>

        {/* Logout */}
        <button
          className="btn-secondary"
          style={{ width: '100%', color: '#ef4444', borderColor: '#fecdd3', padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}
          onClick={logout}
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
