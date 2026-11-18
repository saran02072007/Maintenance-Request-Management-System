import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  AlertCircle,
  Zap,
  Droplets,
  Armchair,
  Wind,
  Sparkles,
  Wrench,
  CheckCircle,
  Building2,
  Layers,
  MapPin,
  Camera,
  UploadCloud,
  Trash2,
  ImageIcon
} from 'lucide-react';
import { useRequests } from '../context/RequestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { CATEGORIES } from '../utils/formatters.js';
import {
  KRCT_CAMPUS_BLOCKS,
  getCampusBlockNames,
  getFloorsForBlock,
  getRoomsForFloor
} from '../utils/krctCampusData.js';

const CATEGORY_ICONS = {
  Electrical: Zap,
  Plumbing: Droplets,
  Furniture: Armchair,
  AC: Wind,
  Cleaning: Sparkles,
  Other: Wrench
};

export const CreateRequestModal = ({ isOpen, onClose }) => {
  const { createRequest } = useRequests();
  const { currentUser } = useAuth();

  const [category, setCategory] = useState('Electrical');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // KRCT Block and Floor hierarchy
  const [selectedBlock, setSelectedBlock] = useState('Circuit Block');
  const [selectedFloor, setSelectedFloor] = useState('3rd Floor');
  const [selectedRoom, setSelectedRoom] = useState('CSE Lab 3 (Object-Oriented Analysis & Design Lab)');
  const [customRoomNote, setCustomRoomNote] = useState('');

  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Defect Photo / Image Attachment
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const fileInputRef = useRef(null);

  // Handle image file selection & Base64 conversion with auto-compression
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please select a valid image file (PNG, JPG, JPEG, WEBP).' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
        setImage(dataUrl);
        setImageFileName(file.name);
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.image;
          return copy;
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Available floors for the selected block
  const availableFloors = getFloorsForBlock(selectedBlock);
  // Available rooms for the selected block & floor
  const availableRooms = getRoomsForFloor(selectedBlock, selectedFloor);

  // Whenever block changes, default floor to the first available floor
  useEffect(() => {
    const floors = getFloorsForBlock(selectedBlock);
    if (floors.length > 0) {
      // If Circuit Block, pick 3rd Floor (CSE) as nice default, else 1st floor
      if (selectedBlock === 'Circuit Block') {
        setSelectedFloor('3rd Floor');
      } else {
        setSelectedFloor(floors[0].level);
      }
    }
  }, [selectedBlock]);

  // Whenever floor changes, update room selection
  useEffect(() => {
    const rooms = getRoomsForFloor(selectedBlock, selectedFloor);
    if (rooms.length > 0) {
      setSelectedRoom(rooms[0]);
    } else {
      setSelectedRoom('');
    }
  }, [selectedBlock, selectedFloor]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Please enter a short title for the issue.';
    } else if (title.trim().length < 5) {
      errs.title = 'Title should be at least 5 characters long.';
    }

    if (!description.trim()) {
      errs.description = 'Please provide detailed information describing the problem.';
    } else if (description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters long.';
    }

    if (!selectedBlock) {
      errs.building = 'Please select a campus block.';
    }

    if (!selectedRoom && !customRoomNote.trim()) {
      errs.roomNumber = 'Please specify the exact room or lab location.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const roomLocation = customRoomNote.trim()
      ? `${selectedFloor} — ${selectedRoom} (${customRoomNote.trim()})`
      : `${selectedFloor} — ${selectedRoom}`;

    const res = createRequest({
      title: title.trim(),
      description: description.trim(),
      category,
      building: selectedBlock,
      roomNumber: roomLocation,
      priority,
      image
    });

    setSubmitting(false);
    if (res.success) {
      setTitle('');
      setDescription('');
      setCustomRoomNote('');
      setImage(null);
      setImageFileName('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, background: '#1e3a8a', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                KRCT
              </span>
              <h3 style={{ margin: 0 }}>Log Campus Maintenance Request</h3>
            </div>
            <p>Report defects across Circuit Block, Unwind Block, laboratories, and campus facilities.</p>
          </div>
          <button className="btn-icon-action" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
          <div className="modal-body" style={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto' }}>
            {/* Category Selection */}
            <div className="form-group">
              <label className="form-label">
                Maintenance Category <span className="required">*</span>
              </label>
              <div className="category-selection-grid">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id] || Wrench;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      className={`category-tile ${isSelected ? 'selected' : ''}`}
                      onClick={() => setCategory(cat.id)}
                    >
                      <Icon size={20} color={isSelected ? '#1e3a8a' : cat.color} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* KRCT Building & Floor Navigation Strip */}
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                <Building2 size={16} color="#1e3a8a" /> KRCT Campus Location (Blocks & Floors)
              </span>

              {/* Block Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '0.85rem' }}>
                {getCampusBlockNames().map((bName) => {
                  const isBSelected = selectedBlock === bName;
                  const bInfo = KRCT_CAMPUS_BLOCKS[bName];
                  return (
                    <button
                      type="button"
                      key={bName}
                      onClick={() => setSelectedBlock(bName)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: isBSelected ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
                        background: isBSelected ? '#eff6ff' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 150ms'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isBSelected ? '#1e3a8a' : '#334155' }}>
                        {bName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                        {bInfo.totalFloors} Floors • {bName.includes('Circuit') ? 'EEE, AI&DS, CSE, ECE' : bName.includes('Unwind') ? 'Auto, Mech, Civil, IT, S&H' : 'Library, Hostels'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Floor & Room Selectors */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Floor Level <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                  >
                    {availableFloors.map((f) => (
                      <option key={f.level} value={f.level}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Department / Laboratory / Room <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  >
                    {availableRooms.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Room Bench / Specific Desk */}
              <div style={{ marginTop: '0.6rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', fontSize: '0.82rem' }}
                  placeholder="Optional specific location (e.g., Bench 4, System No 18, Near Door, Stage Podium)"
                  value={customRoomNote}
                  onChange={(e) => setCustomRoomNote(e.target.value)}
                />
              </div>
            </div>

            {/* Issue Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="req-title">
                Problem Summary / Title <span className="required">*</span>
              </label>
              <input
                id="req-title"
                type="text"
                className="form-input"
                placeholder="e.g., Projector HDMI connection failing, AC water dripping on desk, hydraulic bench valve jammed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={13} /> {errors.title}
                </div>
              )}
            </div>

            {/* Priority Selector */}
            <div className="form-group">
              <label className="form-label">
                Priority Urgency Level <span className="required">*</span>
              </label>
              <div className="priority-selection-grid">
                {[
                  { id: 'Low', label: 'Low', color: '#475569', bg: '#f8fafc', desc: 'Can be handled during routine maintenance' },
                  { id: 'Medium', label: 'Medium', color: '#1e3a8a', bg: '#eff6ff', desc: 'Affects non-critical academic activities' },
                  { id: 'High', label: 'High', color: '#ea580c', bg: '#fff7ed', desc: 'Impacting active lab or lecture sessions' },
                  { id: 'Urgent', label: 'Urgent', color: '#dc2626', bg: '#fef2f2', desc: 'Safety hazard, power failure or water leak' }
                ].map((p) => {
                  const isSelected = priority === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      className={`priority-tile ${isSelected ? 'selected' : ''}`}
                      style={{
                        backgroundColor: p.bg,
                        color: p.color,
                        borderColor: isSelected ? p.color : '#e2e8f0'
                      }}
                      onClick={() => setPriority(p.id)}
                    >
                      <div>{p.label}</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 400, opacity: 0.85, marginTop: '2px' }}>
                        {p.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="req-desc">
                Detailed Problem Description <span className="required">*</span>
              </label>
              <textarea
                id="req-desc"
                className="form-textarea"
                rows={3}
                placeholder="Describe exact symptoms, error codes, time of occurrence, and any temporary steps taken by faculty or lab assistant..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={13} /> {errors.description}
                </div>
              )}
            </div>

            {/* Defect Photo / Evidence Attachment */}
            <div className="form-group" style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Camera size={16} color="#1e3a8a" /> Attach Defect Photo / Evidence (Optional)
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>PNG, JPG, WEBP (Max 5MB)</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="defect-photo-upload"
                onChange={handleImageChange}
              />

              {!image ? (
                <label
                  htmlFor="defect-photo-upload"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    background: '#ffffff',
                    border: '1px dashed #94a3b8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 150ms'
                  }}
                >
                  <UploadCloud size={24} color="#1e3a8a" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1e3a8a', marginTop: '0.3rem' }}>
                    Click to select or capture defect photo
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    Helps technicians inspect damage and bring the correct replacement parts
                  </span>
                </label>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <img
                    src={image}
                    alt="Defect Preview"
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {imageFileName || 'Attached Defect Photo'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                      ✓ Photo ready for KRCT Maintenance Office
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-icon-action"
                    onClick={handleRemoveImage}
                    title="Remove Photo"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {errors.image && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem' }}>
                  <AlertCircle size={13} /> {errors.image}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '1rem 1.75rem', position: 'sticky', bottom: 0, zIndex: 10 }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{
                background: '#1e3a8a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '0.65rem 1.5rem',
                boxShadow: '0 2px 6px rgba(30, 58, 138, 0.25)'
              }}
            >
              <CheckCircle size={16} />
              {submitting ? 'Submitting to KRCT...' : 'Submit to KRCT Maintenance Office'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
