import React, { useState } from 'react';
import {
  X,
  Clock,
  User,
  MapPin,
  Tag,
  AlertCircle,
  Wrench,
  CheckCircle2,
  Send,
  Trash2,
  XCircle,
  UserCheck,
  Building,
  FileText,
  Camera,
  ExternalLink,
  ZoomIn
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { PriorityBadge } from './PriorityBadge.jsx';
import { formatDate, formatRelativeTime } from '../utils/formatters.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';

export const RequestDetailModal = () => {
  const { currentUser, isAdmin, isTechnician, isUser } = useAuth();
  const {
    selectedRequest,
    setSelectedRequest,
    technicians,
    assignTechnician,
    updateStatus,
    acceptJob,
    addRepairNote,
    cancelRequest,
    deleteRequest
  } = useRequests();

  // Local state for actions
  const [selectedTechId, setSelectedTechId] = useState('');
  const [assignInstructions, setAssignInstructions] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [repairNoteText, setRepairNoteText] = useState('');

  if (!selectedRequest) return null;

  const req = selectedRequest;

  // Permissions
  const canUserCancel = isUser && (req.status === 'Submitted' || req.status === 'Pending') && req.createdBy?.id === currentUser?.id;
  const isAssignedTech = isTechnician && req.assignment?.technicianId === currentUser?.id;
  const canTechAct = isAssignedTech || isAdmin;

  // Lifecycle steps for the visual progress bar
  const LIFECYCLE_STEPS = ['Submitted', 'Pending', 'Assigned', 'In Progress', 'Completed'];
  const currentStepIndex = LIFECYCLE_STEPS.indexOf(req.status);

  // Handle assign technician
  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedTechId) return;
    assignTechnician(req.id, selectedTechId, assignInstructions);
    setSelectedTechId('');
    setAssignInstructions('');
  };

  // Handle status update
  const handleStatusUpdate = (e) => {
    e.preventDefault();
    if (!newStatus) return;
    updateStatus(req.id, newStatus, statusNote);
    setNewStatus('');
    setStatusNote('');
  };

  // Handle add repair note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!repairNoteText.trim()) return;
    addRepairNote(req.id, repairNoteText.trim());
    setRepairNoteText('');
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
      <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="request-id-badge" style={{ fontSize: '0.95rem', padding: '0.25rem 0.65rem' }}>
              {req.id}
            </span>
            <StatusBadge status={req.status} />
            <PriorityBadge priority={req.priority} />
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Reported {formatRelativeTime(req.createdAt)}
            </span>
          </div>

          <button className="btn-icon-action" onClick={() => setSelectedRequest(null)}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: '78vh' }}>
          {/* Title & Core Details */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              {req.title}
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                fontSize: '0.84rem',
                color: '#475569',
                background: '#f8fafc',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building size={15} color="#2563eb" />
                <span>
                  <strong>Building:</strong> {req.building}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} color="#2563eb" />
                <span>
                  <strong>Room / Spot:</strong> {req.roomNumber}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tag size={15} color="#2563eb" />
                <span>
                  <strong>Category:</strong> {req.category}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} color="#2563eb" />
                <span>
                  <strong>Reporter:</strong> {req.createdBy?.name || 'User'} ({req.createdBy?.email})
                </span>
              </div>
            </div>
          </div>

          {/* Lifecycle Stepper */}
          <div style={{ padding: '0.5rem 0 0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              OOAD Lifecycle Progression
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.6rem',
                position: 'relative'
              }}
            >
              {LIFECYCLE_STEPS.map((stepName, idx) => {
                const isPassed = currentStepIndex !== -1 && idx <= currentStepIndex;
                const isCurrent = req.status === stepName;

                return (
                  <div
                    key={stepName}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 2,
                      flex: 1
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '9999px',
                        backgroundColor: isPassed ? '#2563eb' : '#e2e8f0',
                        color: isPassed ? '#ffffff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: isCurrent ? '3px solid #bfdbfe' : 'none'
                      }}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        marginTop: '0.3rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? '#1d4ed8' : isPassed ? '#334155' : '#94a3b8'
                      }}
                    >
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '1rem 1.25rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Problem Description
            </h4>
            <p style={{ fontSize: '0.92rem', color: '#1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {req.description}
            </p>
          </div>

          {/* Attached Defect Photo / Evidence if present */}
          {req.image && (
            <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                  <Camera size={16} color="#1e3a8a" /> Attached Defect Photo / Physical Evidence
                </h4>
                <a
                  href={req.image}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    color: '#2563eb',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <ZoomIn size={14} /> Open Full Size
                </a>
              </div>
              <div style={{ textAlign: 'center', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <img
                  src={req.image}
                  alt="Defect visual evidence"
                  style={{
                    maxHeight: '320px',
                    maxWidth: '100%',
                    borderRadius: '6px',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                  onClick={() => {
                    const win = window.open();
                    win?.document.write(`<img src="${req.image}" style="max-width:100%; height:auto;" alt="Full Resolution Evidence" />`);
                  }}
                  title="Click to view full photo"
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.4rem' }}>
                  Captured by reporter at issue submission time
                </div>
              </div>
            </div>
          )}

          {/* Assignment Information */}
          <div style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>
                Technician Assignment
              </h4>
              {req.assignment && (
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Assigned by {req.assignment.assignedBy} on {formatDate(req.assignment.assignedAt)}
                </span>
              )}
            </div>

            {req.assignment ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <UserCheck size={18} color="#2563eb" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                    {req.assignment.technicianName}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#e2e8f0', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>
                    {req.assignment.technicianSpecialization || 'Technician'}
                  </span>
                </div>
                {req.assignment.instructions && (
                  <p style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.35rem', fontStyle: 'italic' }}>
                    Instructions: "{req.assignment.instructions}"
                  </p>
                )}
              </div>
            ) : (
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic' }}>
                No technician has been assigned to this ticket yet.
              </p>
            )}
          </div>

          {/* ROLE ACTION CONTROLS */}
          {/* Admin Assignment & Status Form */}
          {isAdmin && (
            <div style={{ background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe', padding: '1.2rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wrench size={16} /> Administrator Controls
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {/* Assign Form */}
                <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e3a8a' }}>
                    {req.assignment ? 'Reassign Technician' : 'Assign Technician'}
                  </label>
                  <select
                    className="form-select"
                    value={selectedTechId}
                    onChange={(e) => setSelectedTechId(e.target.value)}
                  >
                    <option value="">Select a technician...</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.specialization}) - {t.activeJobsCount} active jobs
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Optional instructions for technician..."
                    value={assignInstructions}
                    onChange={(e) => setAssignInstructions(e.target.value)}
                  />
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.45rem 0.9rem', fontSize: '0.82rem' }} disabled={!selectedTechId}>
                    Confirm Assignment
                  </button>
                </form>

                {/* Change Status Form */}
                <form onSubmit={handleStatusUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e3a8a' }}>
                    Override Request Status
                  </label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select status transition...</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Reason or update comment..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                  />
                  <button type="submit" className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.45rem 0.9rem', fontSize: '0.82rem' }} disabled={!newStatus}>
                    Update Status
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Technician Action Panel */}
          {canTechAct && (
            <div style={{ background: '#fffbeb', borderRadius: '10px', border: '1px solid #fde68a', padding: '1.2rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#92400e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wrench size={16} /> Technician Workflow Actions
              </h4>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {req.status === 'Assigned' && (
                  <button
                    className="btn-primary"
                    style={{ background: '#0284c7' }}
                    onClick={() => acceptJob(req.id)}
                  >
                    <CheckCircle2 size={16} /> Accept Job & Start Work
                  </button>
                )}

                {req.status === 'In Progress' && (
                  <>
                    <button
                      className="btn-primary"
                      style={{ background: '#10b981' }}
                      onClick={() => updateStatus(req.id, 'Completed', 'Repair completed successfully')}
                    >
                      <CheckCircle2 size={16} /> Mark as Completed
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() => {
                        const note = prompt('Reason for putting on hold (e.g., waiting for spare parts):');
                        if (note) updateStatus(req.id, 'On Hold', note);
                      }}
                    >
                      Put On Hold
                    </button>
                  </>
                )}

                {req.status === 'On Hold' && (
                  <button
                    className="btn-primary"
                    onClick={() => updateStatus(req.id, 'In Progress', 'Resumed repair work')}
                  >
                    Resume In Progress
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Repair Notes & User Comments */}
          <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '1rem 1.25rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Repair Notes & Communications ({req.repairNotes?.length || 0})
            </h4>

            {req.repairNotes && req.repairNotes.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                {req.repairNotes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      background: note.isTechnician ? '#f0f9ff' : '#f8fafc',
                      borderLeft: `3px solid ${note.isTechnician ? '#0284c7' : '#94a3b8'}`,
                      borderRadius: '6px',
                      padding: '0.6rem 0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: note.isTechnician ? '#0369a1' : '#334155' }}>
                        {note.authorName} {note.isTechnician && '🛠️ (Technician)'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {formatDate(note.timestamp)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#334155' }}>{note.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '1rem' }}>
                No repair notes recorded yet.
              </p>
            )}

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder={isTechnician ? 'Add technician repair details / parts used...' : 'Add a note or inquiry...'}
                value={repairNoteText}
                onChange={(e) => setRepairNoteText(e.target.value)}
              />
              <button type="submit" className="btn-primary" disabled={!repairNoteText.trim()}>
                <Send size={15} /> Post
              </button>
            </form>
          </div>

          {/* Full Audit Trail / Timeline */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Audit Trail & Lifecycle History
            </h4>
            <div className="timeline-container">
              {req.timeline?.map((evt) => (
                <div key={evt.id} className="timeline-item">
                  <div className="timeline-bullet"></div>
                  <div className="timeline-header">
                    <span className="timeline-action">{evt.action}</span>
                    <span className="timeline-time">{formatDate(evt.timestamp)}</span>
                  </div>
                  <span className="timeline-actor">
                    by <strong>{evt.actorName}</strong> ({evt.actorRole})
                  </span>
                  {evt.note && <div className="timeline-note">{evt.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {canUserCancel && (
              <button
                className="btn-danger-outline"
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this maintenance request?')) {
                    cancelRequest(req.id);
                  }
                }}
              >
                <XCircle size={16} /> Cancel My Request
              </button>
            )}

            {isAdmin && (
              <button
                className="btn-danger-outline"
                onClick={() => {
                  if (window.confirm(`Delete request ${req.id} permanently?`)) {
                    deleteRequest(req.id);
                  }
                }}
              >
                <Trash2 size={16} /> Delete Ticket
              </button>
            )}
          </div>

          <button className="btn-secondary" onClick={() => setSelectedRequest(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
