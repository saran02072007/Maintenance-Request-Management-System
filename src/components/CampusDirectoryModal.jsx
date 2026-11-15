import React, { useState } from 'react';
import {
  Building2,
  X,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Cpu,
  Wrench,
  BookOpen
} from 'lucide-react';
import { KRCT_CAMPUS_BLOCKS, KRCT_COLLEGE_INFO } from '../utils/krctCampusData.js';
import { useRequests } from '../context/RequestContext.jsx';

export const CampusDirectoryModal = ({ isOpen, onClose }) => {
  const { requests, setSelectedRequest } = useRequests();
  const [activeBlockKey, setActiveBlockKey] = useState('Circuit Block');

  if (!isOpen) return null;

  const currentBlock = KRCT_CAMPUS_BLOCKS[activeBlockKey];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon-box" style={{ width: '40px', height: '40px' }}>
              <Building2 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                KRCT Campus Infrastructure Directory
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                {KRCT_COLLEGE_INFO.name} (Autonomous) • Floor-by-Floor Department & Laboratory Layout
              </p>
            </div>
          </div>
          <button className="btn-icon-action" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: '78vh' }}>
          {/* Block Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
            {Object.keys(KRCT_CAMPUS_BLOCKS).map((bKey) => {
              const b = KRCT_CAMPUS_BLOCKS[bKey];
              const isSelected = activeBlockKey === bKey;
              return (
                <button
                  key={bKey}
                  type="button"
                  onClick={() => setActiveBlockKey(bKey)}
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    background: isSelected ? '#1e3a8a' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#334155',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 150ms'
                  }}
                >
                  {b.name} ({b.totalFloors} {b.totalFloors === 1 ? 'Floor' : 'Floors'})
                </button>
              );
            })}
          </div>

          {/* Block Overview Card */}
          <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '0.85rem 1.25rem', border: '1px solid #bfdbfe' }}>
            <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem' }}>
              {currentBlock.name} — {currentBlock.description}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>
              Equipped with centralized high-speed optical fiber, power backup DG sets, fire safety networks, and academic wings.
            </div>
          </div>

          {/* Floors Timeline / Floor-by-Floor Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentBlock.floors.map((floor) => {
              // Find active tickets on this floor
              const floorTickets = requests.filter(
                r => r.building === activeBlockKey && r.roomNumber?.includes(floor.level)
              );

              return (
                <div
                  key={floor.level}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1.1rem 1.25rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Floor Level Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          background: '#1e3a8a',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px'
                        }}
                      >
                        {floor.level}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>
                        {floor.label}
                      </strong>
                    </div>

                    {floorTickets.length > 0 ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fef2f2', color: '#b91c1c', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                        {floorTickets.length} Active {floorTickets.length === 1 ? 'Ticket' : 'Tickets'}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                        All Systems Operational ✓
                      </span>
                    )}
                  </div>

                  {/* Rooms & Laboratories List */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {floor.rooms.map((room) => (
                      <span
                        key={room}
                        style={{
                          fontSize: '0.78rem',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          color: '#334155'
                        }}
                      >
                        • {room}
                      </span>
                    ))}
                  </div>

                  {/* Attached Active Tickets if any */}
                  {floorTickets.length > 0 && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.6rem', borderTop: '1px dashed #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                        Reported Maintenance Tickets on this floor:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.35rem' }}>
                        {floorTickets.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => {
                              setSelectedRequest(t);
                              onClose();
                            }}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              background: '#fff7ed',
                              padding: '0.4rem 0.75rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              border: '1px solid #fed7aa'
                            }}
                            title="Click to view ticket details"
                          >
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9a3412' }}>
                              [{t.id}] {t.title}
                            </span>
                            <span style={{ fontSize: '0.72rem', background: '#ffffff', padding: '0.1rem 0.5rem', borderRadius: '4px', color: '#c2410c', fontWeight: 700 }}>
                              {t.status} →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
