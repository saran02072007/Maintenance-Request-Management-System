import { User, ResidentUser, Administrator, Technician } from '../models/User.js';
import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { TimelineEvent } from '../models/TimelineEvent.js';
import { Assignment } from '../models/Assignment.js';

const USERS_STORAGE_KEY = 'krct_mrms_users_v4';
const REQUESTS_STORAGE_KEY = 'krct_mrms_requests_v4';
const ACTIVE_USER_STORAGE_KEY = 'krct_mrms_active_user_v4';

// KRCT Pre-Seeded Personnel (Matching Project Team & CSE Faculty)
export const DEMO_USERS = [
  {
    id: 'KRCT-USR-ADMIN',
    name: 'Ms. S. Shahina Shalu M.E. (Supervisor & AP/CSE)',
    email: 'admin@demo.com',
    password: 'Admin123',
    role: 'admin',
    department: 'Department of Computer Science & Engineering',
    phone: '+91 90950 13777',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Shahina%20Shalu&backgroundColor=1e3a8a&textColor=ffffff',
    createdAt: '2026-06-01T08:00:00Z'
  },
  {
    id: 'KRCT-USR-FACULTY',
    name: 'Saran I (2403811710421140)',
    email: 'user@demo.com',
    password: 'User123',
    role: 'user',
    building: 'Circuit Block',
    roomNumber: '3rd Floor — CSE Lab 3 (OOAD Lab)',
    phone: '+91 98424 55120',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Saran%20I&backgroundColor=047857&textColor=ffffff',
    createdAt: '2026-06-10T09:30:00Z'
  },
  {
    id: 'KRCT-USR-STUDENT-SAKTHI',
    name: 'Sakthivel K (2403811710421137)',
    email: 'sakthivel@demo.com',
    password: 'User123',
    role: 'user',
    building: 'Circuit Block',
    roomNumber: '3rd Floor — CSE Lab 1',
    phone: '+91 98765 43210',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sakthivel%20K&backgroundColor=0d9488&textColor=ffffff',
    createdAt: '2026-06-12T09:30:00Z'
  },
  {
    id: 'KRCT-USR-STUDENT-YUVA',
    name: 'Yuvaraj S (2403811710421187)',
    email: 'yuvaraj@demo.com',
    password: 'User123',
    role: 'user',
    building: 'Circuit Block',
    roomNumber: '3rd Floor — CSE Lab 2',
    phone: '+91 97890 12345',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Yuvaraj%20S&backgroundColor=4338ca&textColor=ffffff',
    createdAt: '2026-06-14T09:30:00Z'
  },
  {
    id: 'KRCT-USR-TECH-ELEC',
    name: 'Marcus Vance',
    email: 'technician@demo.com',
    password: 'Tech123',
    role: 'technician',
    specialization: 'Electrical & HVAC (Circuit Block)',
    status: 'Available',
    activeJobsCount: 2,
    phone: '+91 94431 88412',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Marcus%20Tech&backgroundColor=b45309&textColor=ffffff',
    createdAt: '2026-06-05T10:00:00Z'
  },
  {
    id: 'KRCT-USR-TECH-PLUMB',
    name: 'David Chen',
    email: 'tech.plumbing@demo.com',
    password: 'Tech123',
    role: 'technician',
    specialization: 'Plumbing & Hydraulic Systems (Unwind Block)',
    status: 'Available',
    activeJobsCount: 1,
    phone: '+91 97890 22345',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David%20Plumber&backgroundColor=0369a1&textColor=ffffff',
    createdAt: '2026-06-05T11:00:00Z'
  },
  {
    id: 'KRCT-USR-TECH-CIVIL',
    name: 'Sarah Jenkins',
    email: 'tech.furniture@demo.com',
    password: 'Tech123',
    role: 'technician',
    specialization: 'Carpentry, Civil & Lab Fixtures',
    status: 'Available',
    activeJobsCount: 0,
    phone: '+91 98400 33456',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Woodwork&backgroundColor=7e22ce&textColor=ffffff',
    createdAt: '2026-06-08T12:00:00Z'
  }
];

// KRCT Pre-Seeded Maintenance Requests (Circuit Block & Unwind Block Specific)
export const DEMO_REQUESTS = [
  {
    id: 'KRCT-REQ-101',
    title: 'Ceiling projector HDMI port damaged and lamp flickering',
    description: 'During OOAD lab session in CSE Lab 3, ceiling projector lamp flickers erratically and the wall HDMI faceplate port pins are bent. Class cannot view code demonstrations.',
    category: 'Other',
    building: 'Circuit Block',
    roomNumber: '3rd Floor — CSE Lab 3 (OOAD Lab)',
    priority: 'Urgent',
    status: 'Assigned',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    createdBy: {
      id: 'KRCT-USR-FACULTY',
      name: 'Saran I (2403811710421140)',
      email: 'user@demo.com'
    },
    assignment: {
      id: 'ASN-101',
      requestId: 'KRCT-REQ-101',
      technicianId: 'KRCT-USR-TECH-ELEC',
      technicianName: 'Marcus Vance',
      technicianSpecialization: 'Electrical & HVAC (Circuit Block)',
      assignedBy: 'Ms. S. Shahina Shalu M.E.',
      assignedAt: '2026-10-18T10:00:00Z',
      status: 'Assigned',
      instructions: 'Inspect projector lamp ballast and replace faceplate HDMI extender.'
    },
    repairNotes: [
      {
        id: 'NOTE-1',
        authorName: 'Ms. S. Shahina Shalu M.E.',
        authorRole: 'admin',
        timestamp: '2026-10-18T10:05:00Z',
        note: 'Assigned with priority to avoid disruption to 3rd year CSE lab timetable.',
        isTechnician: false
      }
    ],
    timeline: [
      {
        id: 'TL-1',
        timestamp: '2026-10-18T09:15:00Z',
        status: 'Submitted',
        actorName: 'Prof. Priya Sharma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Filed complaint for CSE Lab 3 projector in Circuit Block.'
      },
      {
        id: 'TL-2',
        timestamp: '2026-10-18T10:00:00Z',
        status: 'Assigned',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Assigned to Marcus Vance',
        note: 'Dispatched Marcus Vance for immediate AV repair.'
      }
    ],
    createdAt: '2026-10-18T09:15:00Z',
    updatedAt: '2026-10-18T10:00:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-102',
    title: 'Main split AC unit leaking condensed water near server workstation',
    description: 'The 2.0-ton cassette AC in AI&DS Lab is leaking water droplets directly above student system rows 3 and 4. Cooling performance is degraded and water collection tray is overflowing.',
    category: 'AC',
    building: 'Circuit Block',
    roomNumber: '2nd Floor — AI & DS Machine Learning Lab',
    priority: 'High',
    status: 'In Progress',
    createdBy: {
      id: 'KRCT-USR-FACULTY',
      name: 'Prof. Priya Sharma (CSE Dept)',
      email: 'user@demo.com'
    },
    assignment: {
      id: 'ASN-102',
      requestId: 'KRCT-REQ-102',
      technicianId: 'KRCT-USR-TECH-ELEC',
      technicianName: 'Marcus Vance',
      technicianSpecialization: 'Electrical & HVAC (Circuit Block)',
      assignedBy: 'Dr. S. Shanmugam',
      assignedAt: '2026-10-17T11:00:00Z',
      status: 'In Progress',
      instructions: 'Clear drain trap blockage and check refrigerant suction pressure.'
    },
    repairNotes: [
      {
        id: 'NOTE-2',
        authorName: 'Marcus Vance',
        authorRole: 'technician',
        timestamp: '2026-10-17T13:30:00Z',
        note: 'Flushed out algae clogging in 25mm PVC drain hose. Evaporator coil chemically cleaned. Pressure holding steady at 65 psi.',
        isTechnician: true
      }
    ],
    timeline: [
      {
        id: 'TL-10',
        timestamp: '2026-10-17T10:30:00Z',
        status: 'Submitted',
        actorName: 'Prof. Priya Sharma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Water dripping in AI&DS Lab.'
      },
      {
        id: 'TL-11',
        timestamp: '2026-10-17T11:00:00Z',
        status: 'Assigned',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Assigned to Marcus Vance',
        note: 'Dispatched Marcus.'
      },
      {
        id: 'TL-12',
        timestamp: '2026-10-17T11:45:00Z',
        status: 'In Progress',
        actorName: 'Marcus Vance',
        actorRole: 'Technician',
        action: 'Job Accepted & Work Started',
        note: 'Technician on-site at Circuit Block 2nd floor.'
      }
    ],
    createdAt: '2026-10-17T10:30:00Z',
    updatedAt: '2026-10-17T13:30:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-103',
    title: 'Burned 3-phase test bench socket and tripped sub-MCB',
    description: 'During motor loading demonstration in EEE Machines Lab, bench 2 power terminal suffered flashover. Smelled burnt bakelite and 32A MCB tripped.',
    category: 'Electrical',
    building: 'Circuit Block',
    roomNumber: '1st Floor — Electrical Machines Laboratory',
    priority: 'High',
    status: 'Completed',
    createdBy: {
      id: 'KRCT-USR-FACULTY',
      name: 'Prof. Priya Sharma',
      email: 'user@demo.com'
    },
    assignment: {
      id: 'ASN-103',
      requestId: 'KRCT-REQ-103',
      technicianId: 'KRCT-USR-TECH-ELEC',
      technicianName: 'Marcus Vance',
      technicianSpecialization: 'Electrical & HVAC (Circuit Block)',
      assignedBy: 'Dr. S. Shanmugam',
      assignedAt: '2026-10-16T09:00:00Z',
      status: 'Completed',
      instructions: 'Replace terminal block with flame-retardant industrial unit.'
    },
    repairNotes: [
      {
        id: 'NOTE-3',
        authorName: 'Marcus Vance',
        authorRole: 'technician',
        timestamp: '2026-10-16T14:00:00Z',
        note: 'Replaced charred 3-phase ceramic socket, rewound loose terminal crimps, and verified zero earth leakage. Passed insulation test at 500V DC.',
        isTechnician: true
      }
    ],
    timeline: [
      {
        id: 'TL-20',
        timestamp: '2026-10-16T08:30:00Z',
        status: 'Submitted',
        actorName: 'Prof. Priya Sharma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'EEE Lab motor bench trip.'
      },
      {
        id: 'TL-21',
        timestamp: '2026-10-16T09:00:00Z',
        status: 'Assigned',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Assigned to Marcus Vance',
        note: 'Assigned.'
      },
      {
        id: 'TL-22',
        timestamp: '2026-10-16T09:30:00Z',
        status: 'In Progress',
        actorName: 'Marcus Vance',
        actorRole: 'Technician',
        action: 'Work Started',
        note: 'Isolated power feeder.'
      },
      {
        id: 'TL-23',
        timestamp: '2026-10-16T14:00:00Z',
        status: 'Completed',
        actorName: 'Marcus Vance',
        actorRole: 'Technician',
        action: 'Status changed to Completed',
        note: 'Electrical safety clearance verified.'
      }
    ],
    createdAt: '2026-10-16T08:30:00Z',
    updatedAt: '2026-10-16T14:00:00Z',
    completedAt: '2026-10-16T14:00:00Z'
  },
  {
    id: 'KRCT-REQ-104',
    title: 'Hydraulic lift ramp hydraulic oil pressure leak',
    description: 'Vehicle scissor lift ramp in Automobile Workshop (Unwind Block Ground Floor) is losing pressure under load. Oil puddle forming near actuator seals.',
    category: 'Plumbing',
    building: 'Unwind Block',
    roomNumber: 'Ground Floor — Automotive Systems Lab',
    priority: 'Urgent',
    status: 'In Progress',
    createdBy: {
      id: 'KRCT-USR-STUDENT',
      name: 'Rahul Verma (Student Rep)',
      email: 'student@demo.com'
    },
    assignment: {
      id: 'ASN-104',
      requestId: 'KRCT-REQ-104',
      technicianId: 'KRCT-USR-TECH-PLUMB',
      technicianName: 'David Chen',
      technicianSpecialization: 'Plumbing & Hydraulic Systems (Unwind Block)',
      assignedBy: 'Dr. S. Shanmugam',
      assignedAt: '2026-10-19T08:00:00Z',
      status: 'In Progress',
      instructions: 'Lock out lift mechanism before hydraulic line disassembly.'
    },
    repairNotes: [
      {
        id: 'NOTE-4',
        authorName: 'David Chen',
        authorRole: 'technician',
        timestamp: '2026-10-19T10:30:00Z',
        note: 'Identified worn polyurethane O-ring on primary cylinder. Replacement seal kit installed. Performing bleed cycle.',
        isTechnician: true
      }
    ],
    timeline: [
      {
        id: 'TL-30',
        timestamp: '2026-10-19T07:30:00Z',
        status: 'Submitted',
        actorName: 'Rahul Verma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Automobile lift hydraulic leak reported.'
      },
      {
        id: 'TL-31',
        timestamp: '2026-10-19T08:00:00Z',
        status: 'Assigned',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Assigned to David Chen',
        note: 'Urgent hydraulic attention assigned.'
      },
      {
        id: 'TL-32',
        timestamp: '2026-10-19T08:45:00Z',
        status: 'In Progress',
        actorName: 'David Chen',
        actorRole: 'Technician',
        action: 'Work Started',
        note: 'On site at Unwind Block Ground Floor.'
      }
    ],
    createdAt: '2026-10-19T07:30:00Z',
    updatedAt: '2026-10-19T10:30:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-105',
    title: 'Audio amplifier feedback & cordless mic distortion in Conference Hall',
    description: 'During guest lecture in the Main Conference Hall (Unwind Block 1st floor), stage sound system emits high pitch acoustic feedback and podium mic cut off repeatedly.',
    category: 'Electrical',
    building: 'Unwind Block',
    roomNumber: '1st Floor — Main Conference Hall',
    priority: 'Urgent',
    status: 'Pending',
    createdBy: {
      id: 'KRCT-USR-FACULTY',
      name: 'Prof. Priya Sharma',
      email: 'user@demo.com'
    },
    assignment: null,
    repairNotes: [],
    timeline: [
      {
        id: 'TL-40',
        timestamp: '2026-10-19T11:00:00Z',
        status: 'Submitted',
        actorName: 'Prof. Priya Sharma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Conference Hall sound system complaint.'
      },
      {
        id: 'TL-41',
        timestamp: '2026-10-19T11:30:00Z',
        status: 'Pending',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Status changed to Pending',
        note: 'Awaiting technician return from Circuit Block.'
      }
    ],
    createdAt: '2026-10-19T11:00:00Z',
    updatedAt: '2026-10-19T11:30:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-106',
    title: 'Fume hood exhaust blower noisy and weak ventilation in Chemistry Lab',
    description: 'Acid fume hood cabinet 2 on 5th floor Chemistry Lab (Unwind Block) has rattling fan noise and chemical vapor is not discharging smoothly through the roof stack.',
    category: 'AC',
    building: 'Unwind Block',
    roomNumber: '5th Floor — Engineering Chemistry Laboratory',
    priority: 'Medium',
    status: 'On Hold',
    createdBy: {
      id: 'KRCT-USR-STUDENT',
      name: 'Rahul Verma',
      email: 'student@demo.com'
    },
    assignment: {
      id: 'ASN-106',
      requestId: 'KRCT-REQ-106',
      technicianId: 'KRCT-USR-TECH-ELEC',
      technicianName: 'Marcus Vance',
      technicianSpecialization: 'Electrical & HVAC (Circuit Block)',
      assignedBy: 'Dr. S. Shanmugam',
      assignedAt: '2026-10-17T15:00:00Z',
      status: 'On Hold',
      instructions: 'Check V-belt tension on roof exhaust blower.'
    },
    repairNotes: [
      {
        id: 'NOTE-5',
        authorName: 'Marcus Vance',
        authorRole: 'technician',
        timestamp: '2026-10-18T11:00:00Z',
        note: 'Exhaust blower belt has cracked. Placed internal stock requisition for replacement A-36 V-belt with campus stores.',
        isTechnician: true
      }
    ],
    timeline: [
      {
        id: 'TL-50',
        timestamp: '2026-10-17T14:20:00Z',
        status: 'Submitted',
        actorName: 'Rahul Verma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Chemistry lab fume hood.'
      },
      {
        id: 'TL-51',
        timestamp: '2026-10-17T15:00:00Z',
        status: 'Assigned',
        actorName: 'Dr. S. Shanmugam',
        actorRole: 'Administrator',
        action: 'Assigned to Marcus Vance',
        note: 'Marcus dispatched.'
      },
      {
        id: 'TL-52',
        timestamp: '2026-10-18T11:00:00Z',
        status: 'On Hold',
        actorName: 'Marcus Vance',
        actorRole: 'Technician',
        action: 'Status changed to On Hold',
        note: 'Awaiting replacement V-belt from stores.'
      }
    ],
    createdAt: '2026-10-17T14:20:00Z',
    updatedAt: '2026-10-18T11:00:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-107',
    title: 'Broken wooden drawing board clamp in Civil Drawing Hall',
    description: 'Desk row 4 board 8 has stripped threaded adjustment knob and fractured wooden armrest. Drawing sheet slips during isometric projection class.',
    category: 'Furniture',
    building: 'Unwind Block',
    roomNumber: '3rd Floor — Civil Drawing Hall',
    priority: 'Low',
    status: 'Submitted',
    createdBy: {
      id: 'KRCT-USR-FACULTY',
      name: 'Prof. Priya Sharma',
      email: 'user@demo.com'
    },
    assignment: null,
    repairNotes: [],
    timeline: [
      {
        id: 'TL-60',
        timestamp: '2026-10-20T08:15:00Z',
        status: 'Submitted',
        actorName: 'Prof. Priya Sharma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Civil drawing table issue reported.'
      }
    ],
    createdAt: '2026-10-20T08:15:00Z',
    updatedAt: '2026-10-20T08:15:00Z',
    completedAt: null
  },
  {
    id: 'KRCT-REQ-108',
    title: 'Spectrometer optical crosswire realignment in Physics Lab',
    description: 'Spectrometer instrument unit 3 crosswire in eyepiece was displaced during refractive index practical exam. Needs precision collimator recalibration.',
    category: 'Other',
    building: 'Unwind Block',
    roomNumber: '5th Floor — Engineering Physics Laboratory',
    priority: 'Low',
    status: 'Completed',
    createdBy: {
      id: 'KRCT-USR-STUDENT',
      name: 'Rahul Verma',
      email: 'student@demo.com'
    },
    assignment: {
      id: 'ASN-108',
      requestId: 'KRCT-REQ-108',
      technicianId: 'KRCT-USR-TECH-CIVIL',
      technicianName: 'Sarah Jenkins',
      technicianSpecialization: 'Carpentry, Civil & Lab Fixtures',
      assignedBy: 'Dr. S. Shanmugam',
      assignedAt: '2026-10-15T10:00:00Z',
      status: 'Completed',
      instructions: 'Carefully realign graticule ring with sodium vapor lamp light.'
    },
    repairNotes: [
      {
        id: 'NOTE-6',
        authorName: 'Sarah Jenkins',
        authorRole: 'technician',
        timestamp: '2026-10-15T16:00:00Z',
        note: 'Crosswires repositioned and fixed with optical adhesive. Sodium doublet spectral line resolution verified sharp.',
        isTechnician: true
      }
    ],
    timeline: [
      {
        id: 'TL-70',
        timestamp: '2026-10-15T09:00:00Z',
        status: 'Submitted',
        actorName: 'Rahul Verma',
        actorRole: 'User',
        action: 'Request Submitted',
        note: 'Physics spectrometer repair request.'
      },
      {
        id: 'TL-71',
        timestamp: '2026-10-15T16:00:00Z',
        status: 'Completed',
        actorName: 'Sarah Jenkins',
        actorRole: 'Technician',
        action: 'Status changed to Completed',
        note: 'Optical alignment complete.'
      }
    ],
    createdAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-10-15T16:00:00Z',
    completedAt: '2026-10-15T16:00:00Z'
  }
];

class StorageService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    try {
      if (!localStorage.getItem(USERS_STORAGE_KEY)) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      }
      if (!localStorage.getItem(REQUESTS_STORAGE_KEY)) {
        localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(DEMO_REQUESTS));
      }
    } catch (e) {
      console.error('LocalStorage initialization error:', e);
    }
  }

  resetToDemo() {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(DEMO_REQUESTS));
      return true;
    } catch (e) {
      console.error('Reset to demo failed:', e);
      return false;
    }
  }

  // User Storage Operations
  getUsers() {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : DEMO_USERS;
      return parsed.map(u => User.fromJSON(u));
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return DEMO_USERS.map(u => User.fromJSON(u));
    }
  }

  saveUsers(users) {
    try {
      const serialized = users.map(u => (u instanceof User ? u.toJSON() : u));
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(serialized));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  }

  addUser(userData) {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('An account with this email address already exists at KRCT.');
    }

    const newUser = User.fromJSON({
      id: `KRCT-USR-${Date.now().toString().slice(-5)}`,
      ...userData,
      createdAt: new Date().toISOString()
    });

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  getTechnicians() {
    const users = this.getUsers();
    return users.filter(u => u.role === 'technician');
  }

  getActiveUser() {
    try {
      const data = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
      if (!data) return null;
      return User.fromJSON(JSON.parse(data));
    } catch (e) {
      return null;
    }
  }

  setActiveUser(user) {
    try {
      if (!user) {
        localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
      } else {
        const serialized = user instanceof User ? user.toJSON() : user;
        localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(serialized));
      }
    } catch (e) {
      console.error('Error storing active user:', e);
    }
  }

  // Requests Storage Operations
  getRequests() {
    try {
      const data = localStorage.getItem(REQUESTS_STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : DEMO_REQUESTS;
      return parsed.map(r => MaintenanceRequest.fromJSON(r));
    } catch (e) {
      console.error('Error reading requests from storage:', e);
      return DEMO_REQUESTS.map(r => MaintenanceRequest.fromJSON(r));
    }
  }

  saveRequests(requests) {
    try {
      const serialized = requests.map(r => (r instanceof MaintenanceRequest ? r.toJSON() : r));
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(serialized));
    } catch (e) {
      console.error('Error saving requests to storage:', e);
    }
  }

  getRequestById(id) {
    const requests = this.getRequests();
    return requests.find(r => r.id === id) || null;
  }

  addRequest(requestData) {
    const requests = this.getRequests();
    const newRequest = new MaintenanceRequest({
      id: `KRCT-REQ-${Date.now().toString().slice(-4)}`,
      ...requestData
    });
    requests.unshift(newRequest);
    this.saveRequests(requests);
    return newRequest;
  }

  updateRequest(updatedRequest) {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === updatedRequest.id);
    if (index !== -1) {
      requests[index] = updatedRequest instanceof MaintenanceRequest ? updatedRequest : MaintenanceRequest.fromJSON(updatedRequest);
      this.saveRequests(requests);
      return requests[index];
    }
    throw new Error(`Request with ID ${updatedRequest.id} not found.`);
  }

  deleteRequest(id) {
    const requests = this.getRequests();
    const filtered = requests.filter(r => r.id !== id);
    this.saveRequests(filtered);
    return true;
  }
}

export const storageService = new StorageService();
