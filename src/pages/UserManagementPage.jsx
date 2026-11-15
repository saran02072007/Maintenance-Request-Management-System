import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldAlert,
  Wrench,
  UserCheck,
  Search,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { useRequests } from '../context/RequestContext.jsx';
import { formatDate } from '../utils/formatters.js';

export const UserManagementPage = () => {
  const { reload, showToast } = useRequests();
  const [users, setUsers] = useState(() => storageService.getUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Technician Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Tech123');
  const [specialization, setSpecialization] = useState('Electrical & AC');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const refreshUsers = () => {
    const fresh = storageService.getUsers();
    setUsers(fresh);
    reload();
  };

  const handleAddTechnician = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Technician name and email are required.');
      return;
    }

    try {
      storageService.addUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: 'technician',
        specialization,
        phone: phone.trim() || '+1 (555) 000-1122',
        status: 'Available',
        activeJobsCount: 0
      });

      refreshUsers();
      showToast(`Technician ${name} added successfully!`, 'success');
      setIsAddModalOpen(false);

      // Reset
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.specialization && u.specialization.toLowerCase().includes(q)) ||
        (u.building && u.building.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
            User & Technician Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Inspect campus personnel directories, manage role assignments, and register certified maintenance technicians.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={16} /> Add New Technician
        </button>
      </div>

      {/* Directory Table */}
      <div className="card-container">
        <div className="card-header-bar">
          <div className="card-title-group">
            <h2>System Accounts & Field Staff</h2>
            <p>Active user accounts registered in LocalStorage ({filteredUsers.length} total)</p>
          </div>

          <div className="table-filter-bar">
            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="technician">Technicians</option>
              <option value="user">Residents / Users</option>
            </select>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Role</th>
                <th>Details / Department</th>
                <th>Contact</th>
                <th>Status / Load</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="user-avatar-circle" style={{ width: '38px', height: '38px' }}>
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} />
                          ) : (
                            u.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background:
                            u.role === 'admin'
                              ? '#eff6ff'
                              : u.role === 'technician'
                              ? '#fffbeb'
                              : '#ecfdf5',
                          color:
                            u.role === 'admin'
                              ? '#1d4ed8'
                              : u.role === 'technician'
                              ? '#b45309'
                              : '#047857'
                        }}
                      >
                        {u.role === 'admin' && <ShieldAlert size={12} />}
                        {u.role === 'technician' && <Wrench size={12} />}
                        {u.role === 'user' && <UserCheck size={12} />}
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#334155' }}>
                        {u.specialization
                          ? `Skill: ${u.specialization}`
                          : u.department
                          ? u.department
                          : `${u.building || 'Campus'} (${u.roomNumber || 'Room'})`}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {u.phone || '—'}
                      </span>
                    </td>
                    <td>
                      {u.role === 'technician' ? (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: u.activeJobsCount > 0 ? '#eff6ff' : '#f1f5f9',
                            color: u.activeJobsCount > 0 ? '#1d4ed8' : '#64748b',
                            fontWeight: 600
                          }}
                        >
                          {u.activeJobsCount || 0} active jobs
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                          Active
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {formatDate(u.createdAt)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Technician Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <h3>Add New Field Technician</h3>
                <p>Register a qualified repair technician to receive automated job assignments.</p>
              </div>
              <button className="btn-icon-action" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTechnician}>
              <div className="modal-body">
                {error && (
                  <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '0.6rem', borderRadius: '6px', fontSize: '0.82rem', display: 'flex', gap: '0.4rem' }}>
                    <AlertCircle size={15} /> {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Robert Taylor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g., robert.tech@demo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="text"
                      className="form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Contact</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="+1 (555) 234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Trade / Specialization</label>
                  <select
                    className="form-select"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option value="Electrical & AC">Electrical & AC</option>
                    <option value="Plumbing & Drainage">Plumbing & Drainage</option>
                    <option value="Furniture & Carpentry">Furniture & Carpentry</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="General Facility Maintenance">General Facility Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle size={15} /> Register Technician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
