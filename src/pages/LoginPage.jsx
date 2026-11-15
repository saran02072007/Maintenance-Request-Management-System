import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  User,
  HardHat,
  ArrowRight,
  AlertCircle,
  Building2,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/authService.js';
import { KRCT_COLLEGE_INFO, getCampusBlockNames } from '../utils/krctCampusData.js';

export const LoginPage = () => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [building, setBuilding] = useState('Circuit Block');
  const [roomNumber, setRoomNumber] = useState('3rd Floor — CSE Lab 3');
  const [specialization, setSpecialization] = useState('Electrical & HVAC');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const demoAccounts = authService.getDemoAccounts();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both college email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Full Name, College Email, and Password are required.');
      return;
    }

    setLoading(true);
    const result = await register({
      name,
      email,
      password,
      role,
      building,
      roomNumber,
      specialization
    });
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    login(demoEmail, demoPassword);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        {/* KRCT College Branding Header */}
        <div className="auth-brand" style={{ marginBottom: '1.25rem' }}>
          <img
            src={KRCT_COLLEGE_INFO.logoUrl}
            alt="KRCT Logo"
            style={{ height: '64px', width: 'auto', margin: '0 auto 0.75rem', display: 'block', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#11235a', lineHeight: 1.2 }}>
            {KRCT_COLLEGE_INFO.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', background: '#e8552d', color: '#ffffff', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
              AUTONOMOUS
            </span>
            <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
              TNEA Code: 3701 • Tiruchirappalli
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', color: '#1e3a8a', fontWeight: 800, marginTop: '0.4rem' }}>
            Maintenance Request Management System
          </div>
          <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.2rem', fontWeight: 600 }}>
            CSB1303 – Object Oriented Analysis & Design (OOAD) • Nov 2026
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem', background: '#f8fafc', padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <strong>Team:</strong> Sakthivel K (1137) • Saran I (1140) • Yuvaraj S (1187)<br/>
            <strong>Guide:</strong> Ms. S. Shahina Shalu M.E. | <strong>HOD:</strong> Mr. R. Rajavarman M.E., (Ph.D.,)
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '0.25rem',
            borderRadius: '10px',
            marginBottom: '1.25rem'
          }}
        >
          <button
            type="button"
            className={`role-btn ${!isRegistering ? 'active' : ''}`}
            style={{ flex: 1, padding: '0.5rem', textAlign: 'center' }}
            onClick={() => {
              setIsRegistering(false);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`role-btn ${isRegistering ? 'active' : ''}`}
            style={{ flex: 1, padding: '0.5rem', textAlign: 'center' }}
            onClick={() => {
              setIsRegistering(true);
              setError('');
            }}
          >
            Register Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        {!isRegistering ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">College Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.25rem' }}
                  placeholder="e.g., admin@demo.com or faculty@krct.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-pass">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-pass"
                  type="password"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.25rem' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.4rem', padding: '0.75rem', background: '#11235a' }} disabled={loading}>
              <LogIn size={16} />
              {loading ? 'Authenticating...' : 'Sign In to KRCT Portal'}
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name & Designation <span className="required">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Dr. R. Karthik (AP / CSE)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">College Email Address <span className="required">*</span></label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g., karthik.cse@krct.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <input
                type="password"
                className="form-input"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Faculty / Resident / Student</option>
                <option value="technician">Campus Maintenance Technician</option>
                <option value="admin">Estate & Maintenance Administrator</option>
              </select>
            </div>

            {role === 'user' && (
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Primary Block</label>
                  <select
                    className="form-select"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                  >
                    {getCampusBlockNames().map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Floor & Room/Lab</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 3rd Floor CSE Lab 1"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            {role === 'technician' && (
              <div className="form-group">
                <label className="form-label">Specialization Trade</label>
                <select
                  className="form-select"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="Electrical & HVAC (Circuit Block)">Electrical & HVAC (Circuit Block)</option>
                  <option value="Plumbing & Hydraulic Systems (Unwind Block)">Plumbing & Hydraulic Systems (Unwind Block)</option>
                  <option value="Carpentry, Civil & Lab Fixtures">Carpentry, Civil & Lab Fixtures</option>
                  <option value="Audio/Visual & Electronics">Audio/Visual & Electronics</option>
                  <option value="General Campus Maintenance">General Campus Maintenance</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.4rem', padding: '0.75rem', background: '#11235a' }} disabled={loading}>
              <UserPlus size={16} />
              {loading ? 'Creating Account...' : 'Register KRCT Account'}
            </button>
          </form>
        )}

        {/* 1-Click Demo Accounts for College Presentation */}
        <div className="demo-account-grid" style={{ marginTop: '1.25rem', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: '#11235a' }}>
              One-Click Demo Personas
            </span>
            <span style={{ fontSize: '0.72rem', color: '#e8552d', fontWeight: 700 }}>Click to Test</span>
          </div>

          {demoAccounts.map((account) => (
            <button
              type="button"
              key={account.email}
              className="demo-btn-tile"
              onClick={() => handleQuickLogin(account.email, account.password)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {account.roleName.includes('Admin') && <ShieldCheck size={15} color="#1e3a8a" />}
                  {account.roleName.includes('Faculty') && <User size={15} color="#059669" />}
                  {account.roleName.includes('Tech') && <HardHat size={15} color="#d97706" />}
                  <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{account.roleName}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginTop: '1px' }}>
                  {account.personName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {account.email} • {account.password}
                </div>
              </div>
              <ArrowRight size={15} color="#1e3a8a" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
