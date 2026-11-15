import React, { useState, useMemo } from 'react';
import { Search, Eye, Filter, CheckCircle, Clock, XCircle, UserCheck, Camera } from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { PriorityBadge } from './PriorityBadge.jsx';
import { EmptyState } from './EmptyState.jsx';
import { formatDate } from '../utils/formatters.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useRequests } from '../context/RequestContext.jsx';

export const RequestTable = ({
  requests = [],
  title = 'Maintenance Requests',
  subtitle = 'Track, inspect, and update maintenance requests across facilities',
  showFilters = true,
  defaultStatusFilter = 'All'
}) => {
  const { currentUser, isAdmin, isTechnician, isUser } = useAuth();
  const { setSelectedRequest, cancelRequest, acceptJob, setIsCreateModalOpen } = useRequests();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState(defaultStatusFilter);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          req.id.toLowerCase().includes(query) ||
          req.title.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query) ||
          (req.building && req.building.toLowerCase().includes(query)) ||
          (req.roomNumber && req.roomNumber.toLowerCase().includes(query)) ||
          (req.createdBy?.name && req.createdBy.name.toLowerCase().includes(query)) ||
          (req.assignment?.technicianName && req.assignment.technicianName.toLowerCase().includes(query));

        if (!matchesQuery) return false;
      }

      // Category
      if (categoryFilter !== 'All' && req.category !== categoryFilter) {
        return false;
      }

      // Priority
      if (priorityFilter !== 'All' && req.priority !== priorityFilter) {
        return false;
      }

      // Status
      if (statusFilter !== 'All' && req.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [requests, searchTerm, categoryFilter, priorityFilter, statusFilter]);

  return (
    <div className="card-container">
      <div className="card-header-bar">
        <div className="card-title-group">
          <h2>{title}</h2>
          <p>{subtitle} ({filteredRequests.length} {filteredRequests.length === 1 ? 'record' : 'records'})</p>
        </div>

        {showFilters && (
          <div className="table-filter-bar">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search by ID, keyword, room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Furniture">Furniture</option>
              <option value="AC">Air Conditioning</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Other">Other</option>
            </select>

            {/* Priority Filter */}
            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Status Filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>

      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No matching maintenance requests"
          description={
            searchTerm || categoryFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All'
              ? 'Try adjusting or clearing your filters to see more results.'
              : 'There are currently no maintenance complaints logged in this view.'
          }
          actionLabel={isUser ? 'Submit New Request' : ''}
          onAction={isUser ? () => setIsCreateModalOpen(true) : null}
        />
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Issue & Location</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => {
                const canCancel = isUser && (req.status === 'Submitted' || req.status === 'Pending') && req.createdBy?.id === currentUser?.id;
                const canAccept = isTechnician && req.status === 'Assigned' && req.assignment?.technicianId === currentUser?.id;

                return (
                  <tr key={req.id}>
                    <td>
                      <span className="request-id-badge">{req.id}</span>
                    </td>
                    <td>
                      <div className="table-title-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <span className="table-title-main">{req.title}</span>
                          {req.image && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              background: '#eff6ff',
                              color: '#1e3a8a',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              border: '1px solid #bfdbfe'
                            }} title="Photo evidence attached">
                              <Camera size={11} /> Photo
                            </span>
                          )}
                        </div>
                        <span className="table-title-sub">
                          {req.building} • Room {req.roomNumber}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">
                        {req.category}
                      </span>
                    </td>
                    <td>
                      <PriorityBadge priority={req.priority} />
                    </td>
                    <td>
                      <StatusBadge status={req.status} />
                    </td>
                    <td>
                      {req.assignment ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <UserCheck size={14} color="#4338ca" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>
                            {req.assignment.technicianName}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {formatDate(req.createdAt)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        {canAccept && (
                          <button
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                            onClick={() => acceptJob(req.id)}
                            title="Accept this assignment"
                          >
                            <CheckCircle size={14} />
                            Accept
                          </button>
                        )}

                        {canCancel && (
                          <button
                            className="btn-danger-outline"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to cancel request ${req.id}?`)) {
                                cancelRequest(req.id);
                              }
                            }}
                            title="Cancel Request"
                          >
                            <XCircle size={14} />
                            Cancel
                          </button>
                        )}

                        <button
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                          onClick={() => setSelectedRequest(req)}
                          title="View Full Details & Audit Trail"
                        >
                          <Eye size={14} />
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
