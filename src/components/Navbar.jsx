import React, { useState } from 'react';
import {
  Menu,
  Plus,
  ShieldAlert,
  Wrench,
  UserCheck,
  LogOut,
  ChevronDown,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';
import { KRCT_COLLEGE_INFO } from '../utils/krctCampusData.js';

export const Navbar = ({ onToggleMobile, onOpenCampusDirectory, title = 'Dashboard' }) => {
  const { currentUser, isAdmin, isTechnician, isUser, quickSwitchDemo, logout } = useAuth();
  const { setIsCreateModalOpen } = useRequests();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="top-navbar" style={{ height: '76px', padding: '0 1.5rem' }}>
      <div className="navbar-left">
        <button
          className="btn-icon-action"
          onClick={onToggleMobile}
          style={{ display: 'none' }}
          id="mobile-nav-toggle"
        >
          <Menu size={18} />
        </button>

        {/* KRCT College Identity & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={KRCT_COLLEGE_INFO.logoUrl}
            alt="KRCT Logo"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              // Graceful fallback if network blocks external image
              e.target.style.display = 'none';
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#11235a', letterSpacing: '-0.01em' }}>
                {KRCT_COLLEGE_INFO.shortName}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#e8552d', color: '#ffffff', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                AUTONOMOUS
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                Code: 3701
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
              Campus Facilities & Maintenance System
            </div>
          </div>
        </div>

        {/* Quick Role Switcher Pill */}
        <div className="role-switcher-banner" title="Click to instantly switch demo roles for academic presentation">
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', padding: '0 0.35rem' }}>
            Switch Role:
          </span>
          <button
            className={`role-btn ${isAdmin ? 'active' : ''}`}
            onClick={() => quickSwitchDemo('admin')}
          >
            Admin
          </button>
          <button
            className={`role-btn ${isUser ? 'active' : ''}`}
            onClick={() => quickSwitchDemo('user')}
          >
            User
          </button>
          <button
            className={`role-btn ${isTechnician ? 'active' : ''}`}
            onClick={() => quickSwitchDemo('technician')}
          >
            Technician
          </button>
        </div>
      </div>

      <div className="navbar-right">
        {/* Campus Blocks & Floors Map Button */}
        {onOpenCampusDirectory && (
          <button
            className="btn-secondary"
            onClick={onOpenCampusDirectory}
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
            title="Explore Circuit Block (4 floors) and Unwind Block (5 floors)"
          >
            <Building2 size={15} color="#1e3a8a" />
            <span>Campus Blocks & Floors</span>
          </button>
        )}

        {/* Prominent "Create Request" button */}
        <button
          className="btn-create-header"
          onClick={() => setIsCreateModalOpen(true)}
          id="btn-create-request-header"
        >
          <Plus size={16} />
          <span>Report Issue</span>
        </button>

        {/* User Profile Badge */}
        <div style={{ position: 'relative' }}>
          <button
            className="user-profile-button"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="user-avatar-circle">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                <span>{currentUser?.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className="user-meta-text">
              <div className="user-meta-name">{currentUser?.name || 'KRCT User'}</div>
              <div className="user-meta-role">
                {currentUser?.role === 'admin'
                  ? 'Estate Officer (Admin)'
                  : currentUser?.role === 'technician'
                  ? 'Maintenance Tech'
                  : 'KRCT Faculty/Student'}
              </div>
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '270px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
                padding: '0.85rem',
                zIndex: 50
              }}
              onClick={() => setProfileOpen(false)}
            >
              <div style={{ padding: '0.4rem 0.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser?.email}</div>
                <div style={{ fontSize: '0.72rem', color: '#1e3a8a', marginTop: '0.25rem', fontWeight: 600 }}>
                  📍 {currentUser?.building || 'KRCT Campus'} • {currentUser?.roomNumber || 'Faculty Wing'}
                </div>
                {currentUser?.specialization && (
                  <div style={{ fontSize: '0.72rem', color: '#d97706', marginTop: '0.2rem' }}>
                    Trade: {currentUser.specialization}
                  </div>
                )}
              </div>

              <a
                href={KRCT_COLLEGE_INFO.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: '#2563eb',
                  padding: '0.4rem 0.5rem',
                  marginBottom: '0.4rem'
                }}
              >
                <ExternalLink size={13} /> Visit KRCT Official Website
              </a>

              <button
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  color: '#ef4444',
                  borderColor: 'transparent',
                  padding: '0.45rem 0.6rem',
                  fontSize: '0.82rem'
                }}
                onClick={logout}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
