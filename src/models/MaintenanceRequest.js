import { TimelineEvent } from './TimelineEvent.js';
import { Assignment } from './Assignment.js';

/**
 * MaintenanceRequest Class - Core OOAD Entity
 * Encapsulates data and behaviors for maintenance issues, tracking full lifecycle:
 * Submitted -> Pending -> Assigned -> In Progress -> Completed (or On Hold / Rejected)
 */
export class MaintenanceRequest {
  constructor({
    id = `REQ-${Date.now().toString().slice(-6)}`,
    title,
    description,
    category, // Electrical, Plumbing, Furniture, AC, Cleaning, Other
    building,
    roomNumber,
    priority = 'Medium', // Low, Medium, High, Urgent
    status = 'Submitted', // Submitted, Pending, Assigned, In Progress, On Hold, Completed, Rejected
    createdBy, // { id, name, email }
    assignment = null,
    timeline = [],
    repairNotes = [],
    image = null,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    completedAt = null
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.building = building;
    this.roomNumber = roomNumber;
    this.priority = priority;
    this.status = status;
    this.createdBy = createdBy;
    this.assignment = assignment ? (assignment instanceof Assignment ? assignment : new Assignment(assignment)) : null;
    this.timeline = (timeline || []).map(t => t instanceof TimelineEvent ? t : new TimelineEvent(t));
    this.repairNotes = repairNotes || [];
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.completedAt = completedAt;

    // Ensure initial event exists
    if (this.timeline.length === 0) {
      this.timeline.push(
        new TimelineEvent({
          status: this.status,
          actorName: this.createdBy?.name || 'User',
          actorRole: 'User',
          action: 'Request Submitted',
          note: `New request created for ${this.category} in ${this.building} (${this.roomNumber}).`
        })
      );
    }
  }

  // State queries
  isCancellableBy(userId) {
    return (
      this.createdBy?.id === userId &&
      (this.status === 'Submitted' || this.status === 'Pending')
    );
  }

  // Domain Actions
  assignTo(technician, admin, instructions = '') {
    this.assignment = new Assignment({
      requestId: this.id,
      technicianId: technician.id,
      technicianName: technician.name,
      technicianSpecialization: technician.specialization || '',
      assignedBy: admin ? admin.name : 'System Admin',
      instructions
    });

    this.status = 'Assigned';
    this.updatedAt = new Date().toISOString();

    this.timeline.push(
      new TimelineEvent({
        status: 'Assigned',
        actorName: admin?.name || 'Administrator',
        actorRole: 'Administrator',
        action: `Assigned to ${technician.name}`,
        note: instructions || `Technician ${technician.name} (${technician.specialization || 'Maintenance'}) assigned.`
      })
    );
  }

  acceptJob(technician) {
    if (this.assignment) {
      this.assignment.accept();
    }
    this.status = 'In Progress';
    this.updatedAt = new Date().toISOString();

    this.timeline.push(
      new TimelineEvent({
        status: 'In Progress',
        actorName: technician?.name || 'Technician',
        actorRole: 'Technician',
        action: 'Job Accepted & Work Started',
        note: 'Technician has accepted the assignment and is actively working on the resolution.'
      })
    );
  }

  updateStatus(newStatus, actor, note = '') {
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();

    if (newStatus === 'Completed') {
      this.completedAt = new Date().toISOString();
      if (this.assignment) {
        this.assignment.complete();
      }
    }

    this.timeline.push(
      new TimelineEvent({
        status: newStatus,
        actorName: actor?.name || 'System',
        actorRole: actor?.role ? actor.role.charAt(0).toUpperCase() + actor.role.slice(1) : 'Staff',
        action: `Status changed to ${newStatus}`,
        note: note || `Request marked as ${newStatus}.`
      })
    );
  }

  addRepairNote(actor, noteText, isTechnician = false) {
    const noteEntry = {
      id: `NOTE-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      authorName: actor?.name || 'User',
      authorRole: actor?.role || 'staff',
      timestamp: new Date().toISOString(),
      note: noteText,
      isTechnician
    };

    this.repairNotes.push(noteEntry);
    this.updatedAt = new Date().toISOString();

    this.timeline.push(
      new TimelineEvent({
        status: this.status,
        actorName: actor?.name || 'Staff',
        actorRole: actor?.role ? actor.role.charAt(0).toUpperCase() + actor.role.slice(1) : 'Staff',
        action: isTechnician ? 'Technician Repair Note Added' : 'Comment Added',
        note: noteText
      })
    );
  }

  cancel(user, reason = 'Cancelled by requester') {
    this.status = 'Rejected';
    this.updatedAt = new Date().toISOString();

    this.timeline.push(
      new TimelineEvent({
        status: 'Rejected',
        actorName: user?.name || 'Requester',
        actorRole: 'User',
        action: 'Request Cancelled',
        note: reason
      })
    );
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      building: this.building,
      roomNumber: this.roomNumber,
      priority: this.priority,
      status: this.status,
      createdBy: this.createdBy,
      assignment: this.assignment ? this.assignment.toJSON() : null,
      timeline: this.timeline.map(t => t.toJSON()),
      repairNotes: this.repairNotes,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      completedAt: this.completedAt
    };
  }

  static fromJSON(data) {
    if (!data) return null;
    return new MaintenanceRequest(data);
  }
}
