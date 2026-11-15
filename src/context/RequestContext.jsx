import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { storageService } from '../services/storageService.js';
import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { MaintenanceReport } from '../models/MaintenanceReport.js';
import { useAuth } from './AuthContext.jsx';

const RequestContext = createContext(null);

export const RequestProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Load data from LocalStorage
  const loadData = useCallback(() => {
    const loadedRequests = storageService.getRequests();
    const loadedTechs = storageService.getTechnicians();
    setRequests(loadedRequests);
    setTechnicians(loadedTechs);

    // Keep selected request up to date if currently open
    setSelectedRequest(prev => {
      if (!prev) return null;
      return loadedRequests.find(r => r.id === prev.id) || null;
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Create new Maintenance Request
  const createRequest = useCallback((formData) => {
    try {
      const newRequest = storageService.addRequest({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        building: formData.building,
        roomNumber: formData.roomNumber,
        priority: formData.priority || 'Medium',
        status: 'Submitted',
        image: formData.image || null,
        createdBy: {
          id: currentUser?.id || 'USR-ANON',
          name: currentUser?.name || 'Resident User',
          email: currentUser?.email || 'user@demo.com'
        }
      });

      loadData();
      showToast(`Request ${newRequest.id} created successfully!`, 'success');
      return { success: true, request: newRequest };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [currentUser, loadData, showToast]);

  // Assign Technician to Request (Admin Action)
  const assignTechnician = useCallback((requestId, technicianId, instructions = '') => {
    try {
      const request = storageService.getRequestById(requestId);
      if (!request) throw new Error('Request not found');

      const tech = technicians.find(t => t.id === technicianId);
      if (!tech) throw new Error('Selected technician does not exist');

      request.assignTo(tech, currentUser, instructions);
      storageService.updateRequest(request);

      loadData();
      showToast(`Assigned ${tech.name} to request ${requestId}`, 'success');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [technicians, currentUser, loadData, showToast]);

  // Update Request Status (Admin / Technician)
  const updateStatus = useCallback((requestId, newStatus, note = '') => {
    try {
      const request = storageService.getRequestById(requestId);
      if (!request) throw new Error('Request not found');

      request.updateStatus(newStatus, currentUser, note);
      storageService.updateRequest(request);

      loadData();
      showToast(`Status updated to ${newStatus} for ${requestId}`, 'success');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [currentUser, loadData, showToast]);

  // Technician Accepts Job
  const acceptJob = useCallback((requestId) => {
    try {
      const request = storageService.getRequestById(requestId);
      if (!request) throw new Error('Request not found');

      request.acceptJob(currentUser);
      storageService.updateRequest(request);

      loadData();
      showToast(`Job accepted! Status changed to In Progress for ${requestId}`, 'success');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [currentUser, loadData, showToast]);

  // Add Repair Note / Comment
  const addRepairNote = useCallback((requestId, noteText) => {
    try {
      const request = storageService.getRequestById(requestId);
      if (!request) throw new Error('Request not found');

      const isTech = currentUser?.role === 'technician';
      request.addRepairNote(currentUser, noteText, isTech);
      storageService.updateRequest(request);

      loadData();
      showToast('Note added successfully', 'info');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [currentUser, loadData, showToast]);

  // Cancel Request (User Action for Submitted / Pending requests)
  const cancelRequest = useCallback((requestId, reason = 'Cancelled by resident') => {
    try {
      const request = storageService.getRequestById(requestId);
      if (!request) throw new Error('Request not found');

      if (!request.isCancellableBy(currentUser?.id)) {
        throw new Error('This request cannot be cancelled because it is already assigned or in progress.');
      }

      request.cancel(currentUser, reason);
      storageService.updateRequest(request);

      loadData();
      showToast(`Request ${requestId} has been cancelled`, 'info');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [currentUser, loadData, showToast]);

  // Delete Request (Admin only)
  const deleteRequest = useCallback((requestId) => {
    try {
      storageService.deleteRequest(requestId);
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(null);
      }
      loadData();
      showToast(`Request ${requestId} permanently deleted`, 'info');
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [selectedRequest, loadData, showToast]);

  // Reset to initial demo database
  const resetDemoData = useCallback(() => {
    storageService.resetToDemo();
    loadData();
    showToast('Database reset to initial demo state', 'info');
  }, [loadData, showToast]);

  // Compute MaintenanceReport instance
  const report = useMemo(() => {
    return new MaintenanceReport(requests, technicians);
  }, [requests, technicians]);

  const value = {
    requests,
    technicians,
    selectedRequest,
    setSelectedRequest,
    isCreateModalOpen,
    setIsCreateModalOpen,
    toast,
    showToast,
    closeToast,
    createRequest,
    assignTechnician,
    updateStatus,
    acceptJob,
    addRepairNote,
    cancelRequest,
    deleteRequest,
    resetDemoData,
    reload: loadData,
    report
  };

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
};

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};
