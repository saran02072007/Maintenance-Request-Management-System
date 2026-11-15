/**
 * Assignment Class - OOAD Association Model
 * Connects a MaintenanceRequest with a Technician, recording assignment audit details.
 */
export class Assignment {
  constructor({
    id = `ASN-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    requestId,
    technicianId,
    technicianName,
    technicianSpecialization = '',
    assignedBy,
    assignedAt = new Date().toISOString(),
    status = 'Assigned', // Assigned, Accepted, In Progress, Completed, Reassigned
    instructions = '',
    targetCompletionDate = null
  }) {
    this.id = id;
    this.requestId = requestId;
    this.technicianId = technicianId;
    this.technicianName = technicianName;
    this.technicianSpecialization = technicianSpecialization;
    this.assignedBy = assignedBy;
    this.assignedAt = assignedAt;
    this.status = status;
    this.instructions = instructions;
    this.targetCompletionDate = targetCompletionDate;
  }

  accept() {
    this.status = 'Accepted';
  }

  complete() {
    this.status = 'Completed';
  }

  toJSON() {
    return {
      id: this.id,
      requestId: this.requestId,
      technicianId: this.technicianId,
      technicianName: this.technicianName,
      technicianSpecialization: this.technicianSpecialization,
      assignedBy: this.assignedBy,
      assignedAt: this.assignedAt,
      status: this.status,
      instructions: this.instructions,
      targetCompletionDate: this.targetCompletionDate
    };
  }

  static fromJSON(json) {
    return new Assignment(json);
  }
}
