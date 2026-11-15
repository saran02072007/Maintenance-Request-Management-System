/**
 * TimelineEvent - Encapsulates an audit trail log entry for state transitions
 * in the Maintenance Request lifecycle.
 * Part of the OOAD Object Model.
 */
export class TimelineEvent {
  constructor({
    id = `TL-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp = new Date().toISOString(),
    status,
    actorName,
    actorRole,
    action,
    note = ''
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.status = status;
    this.actorName = actorName;
    this.actorRole = actorRole;
    this.action = action;
    this.note = note;
  }

  toJSON() {
    return {
      id: this.id,
      timestamp: this.timestamp,
      status: this.status,
      actorName: this.actorName,
      actorRole: this.actorRole,
      action: this.action,
      note: this.note
    };
  }

  static fromJSON(json) {
    return new TimelineEvent(json);
  }
}
