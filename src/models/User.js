/**
 * User Hierarchy - Object-Oriented Analysis & Design
 * Base class User with polymorphic subclasses ResidentUser, Administrator, and Technician.
 */

export class User {
  constructor({
    id,
    name,
    email,
    password,
    role = 'user',
    phone = '',
    avatar = '',
    createdAt = new Date().toISOString()
  }) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._role = role;
    this._phone = phone;
    this._avatar = avatar;
    this._createdAt = createdAt;
  }

  // Encapsulation via Getters
  get id() { return this._id; }
  get name() { return this._name; }
  get email() { return this._email; }
  get role() { return this._role; }
  get phone() { return this._phone; }
  get avatar() { return this._avatar; }
  get createdAt() { return this._createdAt; }

  // Validation method
  verifyPassword(candidatePassword) {
    return this._password === candidatePassword;
  }

  // Base permission checks
  canCreateRequest() { return false; }
  canAssignTechnician() { return false; }
  canManageUsers() { return false; }
  canUpdateRepairStatus() { return false; }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
      role: this._role,
      phone: this._phone,
      avatar: this._avatar,
      createdAt: this._createdAt
    };
  }

  static fromJSON(data) {
    if (!data) return null;
    switch (data.role) {
      case 'admin':
        return new Administrator(data);
      case 'technician':
        return new Technician(data);
      case 'user':
      default:
        return new ResidentUser(data);
    }
  }
}

/**
 * ResidentUser (Standard User)
 * Represents college students, hostel residents, apartment owners, or office staff.
 */
export class ResidentUser extends User {
  constructor(data) {
    super({ ...data, role: 'user' });
    this.building = data.building || 'Main Campus';
    this.roomNumber = data.roomNumber || 'N/A';
  }

  canCreateRequest() { return true; }
  canCancelRequest(requestStatus) {
    // A user can cancel only if not started yet (Submitted or Pending)
    return requestStatus === 'Submitted' || requestStatus === 'Pending';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      building: this.building,
      roomNumber: this.roomNumber
    };
  }
}

/**
 * Administrator
 * System supervisor who oversees requests, assigns technicians, and tracks analytics.
 */
export class Administrator extends User {
  constructor(data) {
    super({ ...data, role: 'admin' });
    this.department = data.department || 'Facilities & Operations';
  }

  canAssignTechnician() { return true; }
  canManageUsers() { return true; }
  canGenerateReports() { return true; }
  canOverrideStatus() { return true; }

  toJSON() {
    return {
      ...super.toJSON(),
      department: this.department
    };
  }
}

/**
 * Technician
 * Specialized field personnel assigned to repair complaints.
 */
export class Technician extends User {
  constructor(data) {
    super({ ...data, role: 'technician' });
    this.specialization = data.specialization || 'General Maintenance';
    this.status = data.status || 'Available'; // 'Available', 'Busy', 'On Leave'
    this.activeJobsCount = data.activeJobsCount || 0;
  }

  canUpdateRepairStatus() { return true; }

  incrementWorkload() {
    this.activeJobsCount += 1;
    if (this.activeJobsCount >= 3) {
      this.status = 'Busy';
    }
  }

  decrementWorkload() {
    this.activeJobsCount = Math.max(0, this.activeJobsCount - 1);
    if (this.activeJobsCount < 3) {
      this.status = 'Available';
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      specialization: this.specialization,
      status: this.status,
      activeJobsCount: this.activeJobsCount
    };
  }
}
