import React, { useState } from 'react';
import {
  FileText,
  GitBranch,
  Layers,
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  ArrowRight,
  Shield,
  HelpCircle,
  BookOpen,
  Printer
} from 'lucide-react';
import { MermaidViewer } from '../components/MermaidViewer.jsx';

// Mermaid Diagram Strings
const ARCHITECTURE_DIAGRAM = `graph TD
    Client["Presentation Layer (React.js SPA)"]
    subgraph UI ["User Interface Layer"]
        AuthView["Login / Register / Quick Persona Switcher"]
        Dashboards["Role Dashboards (User, Admin, Technician)"]
        Forms["Maintenance Request Forms & Validation Modals"]
        AnalyticsView["Reports & Workload Analytics Engine"]
    end
    subgraph State ["Application Context & State"]
        AuthCtx["AuthContext (Session & Role Checking)"]
        ReqCtx["RequestContext (Lifecycle Actions, Toast System)"]
    end
    subgraph Models ["OOAD Domain Class Hierarchy"]
        MUser["User Class & Subclasses (Resident, Admin, Tech)"]
        MReq["MaintenanceRequest (Encapsulated Entity)"]
        MAssign["Assignment (Association Entity)"]
        MTimeline["TimelineEvent (Audit Trail Entity)"]
        MReport["MaintenanceReport (Analytics Engine)"]
    end
    subgraph Storage ["Persistence Layer"]
        LocalStorage["Browser LocalStorage (Keys: mrms_users, mrms_requests)"]
    end
    Client --> UI
    UI --> State
    State --> Models
    Models --> Storage`;

const USE_CASE_DIAGRAM = `flowchart LR
    Resident(("Resident / Student User"))
    Admin(("Facilities Administrator"))
    Tech(("Maintenance Technician"))

    subgraph System ["FixFlow - Maintenance Request Management System"]
        UC1(["Register & Sign In"])
        UC2(["Submit Maintenance Request"])
        UC3(["View Personal Request Status"])
        UC4(["Cancel Submitted Request"])
        UC5(["View Central Maintenance Queue"])
        UC6(["Assign Technician to Request"])
        UC7(["Override / Update Ticket Status"])
        UC8(["Generate Maintenance Reports"])
        UC9(["Manage Staff & Technicians"])
        UC10(["View Assigned Work Orders"])
        UC11(["Accept Assigned Job"])
        UC12(["Update Progress & Post Repair Notes"])
    end

    Resident --> UC1
    Resident --> UC2
    Resident --> UC3
    Resident --> UC4

    Admin --> UC1
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9

    Tech --> UC1
    Tech --> UC10
    Tech --> UC11
    Tech --> UC12`;

const CLASS_DIAGRAM = `classDiagram
    class User {
        <<abstract>>
        #String id
        #String name
        #String email
        #String password
        #String role
        #String phone
        #Date createdAt
        +verifyPassword(candidate) Boolean
        +canCreateRequest() Boolean
        +canAssignTechnician() Boolean
        +canUpdateRepairStatus() Boolean
        +toJSON() Object
    }

    class ResidentUser {
        +String building
        +String roomNumber
        +canCreateRequest() Boolean
        +canCancelRequest(status) Boolean
    }

    class Administrator {
        +String department
        +canAssignTechnician() Boolean
        +canManageUsers() Boolean
        +canGenerateReports() Boolean
    }

    class Technician {
        +String specialization
        +String status
        +Number activeJobsCount
        +canUpdateRepairStatus() Boolean
        +incrementWorkload() void
        +decrementWorkload() void
    }

    class MaintenanceRequest {
        +String id
        +String title
        +String description
        +String category
        +String building
        +String roomNumber
        +String priority
        +String status
        +Object createdBy
        +Date createdAt
        +Date completedAt
        +assignTo(technician, admin, notes) void
        +acceptJob(technician) void
        +updateStatus(status, actor, note) void
        +addRepairNote(actor, noteText) void
        +cancel(user, reason) void
    }

    class Assignment {
        +String id
        +String requestId
        +String technicianId
        +String technicianName
        +String assignedBy
        +Date assignedAt
        +String status
        +String instructions
        +accept() void
        +complete() void
    }

    class TimelineEvent {
        +String id
        +Date timestamp
        +String status
        +String actorName
        +String actorRole
        +String action
        +String note
    }

    class MaintenanceReport {
        -Array requests
        -Array technicians
        +getTotalCount() Number
        +getPendingCount() Number
        +getInProgressCount() Number
        +getCompletedCount() Number
        +getResolutionRate() Number
        +getAverageResolutionHours() Number
        +getCategoryBreakdown() Array
        +getPriorityDistribution() Array
        +getTechnicianWorkload() Array
    }

    User <|-- ResidentUser : Inheritance
    User <|-- Administrator : Inheritance
    User <|-- Technician : Inheritance

    MaintenanceRequest "1" *-- "0..1" Assignment : Composition
    MaintenanceRequest "1" *-- "*" TimelineEvent : Audit Trail
    MaintenanceReport ..> MaintenanceRequest : Aggregates
    MaintenanceReport ..> Technician : Analyzes
    Administrator ..> Assignment : Dispatches
    Technician ..> MaintenanceRequest : Resolves`;

const SEQUENCE_DIAGRAM = `sequenceDiagram
    autonumber
    actor Resident as Resident User
    participant UI as React UI Form
    participant ReqCtx as Request Context
    participant ReqModel as MaintenanceRequest Model
    participant Storage as LocalStorage
    actor Admin as Administrator
    actor Tech as Technician

    Resident->>UI: Enters category, location, title & description
    Resident->>UI: Clicks "Submit Request"
    UI->>ReqCtx: createRequest(formData)
    ReqCtx->>ReqModel: new MaintenanceRequest(...)
    ReqModel->>ReqModel: create initial TimelineEvent("Submitted")
    ReqCtx->>Storage: saveRequests(requests)
    Storage-->>UI: Storage Updated
    UI-->>Resident: Show Success Toast & Generated Request ID

    Note over Admin, UI: Admin Reviews Queue & Assigns Staff
    Admin->>UI: Views central queue in Admin Dashboard
    Admin->>UI: Selects qualified Technician & clicks "Confirm Assignment"
    Admin->>ReqCtx: assignTechnician(reqId, techId, instructions)
    ReqCtx->>ReqModel: assignTo(technician, admin, instructions)
    ReqModel->>ReqModel: updateStatus("Assigned")
    ReqModel->>ReqModel: append TimelineEvent("Assigned")
    ReqCtx->>Storage: updateRequest(req)
    UI-->>Admin: Notification: Technician Dispatched

    Note over Tech, UI: Technician Acceptance & Completion
    Tech->>UI: Opens "Assigned Jobs"
    Tech->>ReqCtx: acceptJob(reqId)
    ReqCtx->>ReqModel: updateStatus("In Progress")
    ReqCtx->>Storage: save
    Tech->>UI: Enters repair notes & selects "Mark as Completed"
    ReqCtx->>ReqModel: updateStatus("Completed")
    ReqCtx->>Storage: save
    UI-->>Tech: Repair Order Finalized`;

const ACTIVITY_DIAGRAM = `flowchart TD
    Start([User Discovers Facility Defect]) --> Input[User Submits Request Form]
    Input --> Valid{Input Valid?}
    Valid -- No --> Input
    Valid -- Yes --> Create[Request Created in State: Submitted]
    Create --> Review{Admin Review & Triage}
    
    Review -- Invalid / Duplicate --> Reject[Status: Rejected / Cancelled]
    Reject --> EndTerm([Workflow Closed])

    Review -- Valid Complaint --> Assign[Admin Assigns Technician: Status = Assigned]
    Assign --> TechAccept{Technician Check-In}

    TechAccept -- Accept Job --> InProg[Status: In Progress]
    TechAccept -- Needs Spares --> Hold[Status: On Hold]
    Hold --> InProg

    InProg --> Repair[Technician Executes Physical Repair]
    Repair --> Verify{Repair Successful?}
    Verify -- Parts Needed --> Hold
    Verify -- Verified OK --> Complete[Technician Adds Notes & Marks Completed]
    Complete --> Archive([Request Closed & Archived])`;

const STATE_MACHINE_DIAGRAM = `stateDiagram-v2
    [*] --> Login
    Login --> Authenticated : Valid Credentials
    Login --> Login : Invalid Login Attempt

    Authenticated --> RequestSubmitted : User Submits Complaint
    RequestSubmitted --> UnderReview : Admin Reviews Request
    
    UnderReview --> CancelledOrRejected : Duplicate / Invalid Issue
    CancelledOrRejected --> [*] : Request Closed

    UnderReview --> TaskAssigned : Admin Dispatches Technician
    TaskAssigned --> InProgress : Technician Accepts Work Order
    
    InProgress --> OnHold : Spares / Parts Pending
    OnHold --> InProgress : Spares Procured
    
    InProgress --> Completed : Physical Repair Finished & Verified
    Completed --> [*] : Ticket Closed & Archived`;

const DEPLOYMENT_DIAGRAM = `graph TD
    subgraph ClientNode ["Client Device (PC / Laptop / Smartphone)"]
        Browser["Modern Web Browser (Chrome, Edge, Firefox)"]
        subgraph ClientRuntime ["Client-Side Runtime"]
            ReactApp["React 19 SPA Application"]
            LocalStore[("HTML5 LocalStorage Engine")]
        end
        Browser --> ReactApp
        ReactApp <--> LocalStore
    end

    subgraph AppServerNode ["Application Server (Localhost / Cloud Server)"]
        NodeRuntime["Node.js / Express Web Server"]
        StaticAssets["Static Asset Bundles (HTML, CSS, JSX Chunks)"]
        NodeRuntime --> StaticAssets
    end

    subgraph DBServerNode ["Database & Directory Server"]
        MySQL[("Campus DBMS / MySQL Storage")]
    end

    ClientNode -- "HTTP/HTTPS (Port 5173 / 443)" --> AppServerNode
    AppServerNode -- "TCP/IP (Port 3306)" --> DBServerNode`;

const PACKAGE_DIAGRAM = `graph TD
    subgraph UI_Layer ["User Interface Layer Package"]
        P_Views["Pages Package (UserDash, AdminDash, TechDash, Reports)"]
        P_Components["Components Package (Modals, Tables, Cards, Badges)"]
    end

    subgraph Auth_Layer ["Authentication Layer Package"]
        P_AuthService["AuthService & Session Manager"]
        P_AuthContext["AuthContext Provider"]
    end

    subgraph Request_Layer ["Maintenance Request Layer Package"]
        P_ReqContext["RequestContext Provider"]
        P_ReqModel["MaintenanceRequest Domain Class"]
    end

    subgraph Task_Layer ["Task Management Layer Package"]
        P_AssignModel["Assignment Class & Tech Dispatch"]
        P_TechWorkload["Technician Workload Manager"]
    end

    subgraph Notification_Layer ["Notification & Audit Layer Package"]
        P_Timeline["TimelineEvent Audit Trail"]
        P_Toast["NotificationToast Dispatcher"]
    end

    subgraph Data_Layer ["Data Access & Persistence Layer Package"]
        P_Storage["storageService (Storage Adapter)"]
        P_DataSeeds["krctCampusData (Campus Blocks, Floors, Rooms)"]
    end

    UI_Layer --> Auth_Layer
    UI_Layer --> Request_Layer
    UI_Layer --> Task_Layer
    Request_Layer --> Task_Layer
    Request_Layer --> Notification_Layer
    Request_Layer --> Data_Layer
    Task_Layer --> Data_Layer
    Auth_Layer --> Data_Layer`;

const ERD_DIAGRAM = `erDiagram
    USER ||--o{ MAINTENANCE_REQUEST : "submits"
    USER ||--o{ ASSIGNMENT : "assigned as technician"
    MAINTENANCE_REQUEST ||--o| ASSIGNMENT : "has"
    MAINTENANCE_REQUEST ||--|{ TIMELINE_EVENT : "logs"
    MAINTENANCE_REQUEST ||--o{ REPAIR_NOTE : "contains"

    USER {
        string id PK
        string name
        string email
        string password
        string role
        string phone
        string building
        string roomNumber
        string specialization
        string department
    }

    MAINTENANCE_REQUEST {
        string id PK
        string title
        string description
        string category
        string building
        string roomNumber
        string priority
        string status
        string createdBy_id FK
        datetime createdAt
        datetime updatedAt
        datetime completedAt
    }

    ASSIGNMENT {
        string id PK
        string requestId FK
        string technicianId FK
        string assignedBy
        datetime assignedAt
        string status
        string instructions
    }

    TIMELINE_EVENT {
        string id PK
        string requestId FK
        datetime timestamp
        string status
        string actorName
        string actorRole
        string action
        string note
    }

    REPAIR_NOTE {
        string id PK
        string requestId FK
        string authorName
        string authorRole
        datetime timestamp
        string note
        boolean isTechnician
    }`;

export const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Title & Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            College Academic Submission
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Object-Oriented Analysis & Design (OOAD) Report
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Comprehensive architectural specifications, UML design artifacts, class hierarchies, and verification test cases.
          </p>
        </div>

        <button className="btn-primary" onClick={() => window.print()}>
          <Printer size={15} /> Print Documentation
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        {[
          { id: 'overview', label: '1. Abstract & Scope' },
          { id: 'requirements', label: '2. Requirements (FR & NFR)' },
          { id: 'usecase', label: '3.1 Use Case Diagram' },
          { id: 'class', label: '3.2 Class Diagram' },
          { id: 'activity', label: '3.3 Activity Diagram' },
          { id: 'sequence', label: '3.4 Sequence Diagram' },
          { id: 'statemachine', label: '3.5 State Machine Diagram' },
          { id: 'component', label: '3.6 Component Diagram' },
          { id: 'deployment', label: '3.7 Deployment Diagram' },
          { id: 'package', label: '3.8 Package Diagram' },
          { id: 'testcases', label: '5. Verification & Tests' },
          { id: 'screenshots', label: 'Appendix B: UI Screens' },
          { id: 'conclusion', label: '6. Conclusion & Scope' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`btn-secondary ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              background: activeTab === tab.id ? '#2563eb' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#334155',
              borderColor: activeTab === tab.id ? '#2563eb' : '#e2e8f0'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* 1. Abstract & Scope */}
      {activeTab === 'overview' && (
        <div>
          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <BookOpen size={20} color="#2563eb" /> 1.1 Project Abstract & College Context
            </h3>
            <div className="doc-markdown-content">
              <p>
                <strong>K.Ramakrishnan College of Technology (KRCT)</strong>, an Autonomous Engineering Institution in Tiruchirappalli, Tamil Nadu (Accredited by NAAC with 'A+' Grade, NBA Accredited, TNEA Code: 3701), houses extensive multi-storey academic infrastructure spread across two primary departmental wings: the <strong>Circuit Block</strong> and the <strong>Unwind Block</strong>.
              </p>
              <p>
                The <strong>KRCT FixFlow Maintenance Request Management System</strong> is an Object-Oriented web application engineered to streamline the end-to-end lifecycle of campus maintenance complaints. The system models three primary stakeholders—<strong>Faculty & Students</strong>, <strong>Estate & Maintenance Administrators</strong>, and <strong>Field Maintenance Technicians</strong>—enforcing object-oriented concepts including inheritance, encapsulation, polymorphism, and state machine transitions.
              </p>

              <h4 style={{ color: '#11235a', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                🏢 Modeled Campus Infrastructure (Circuit Block & Unwind Block):
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#1e3a8a', fontSize: '0.95rem' }}>Circuit Block (4 Floors + Ground):</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <li><strong>Ground Floor:</strong> Commercial Hall, Campus Store, Central Maintenance Helpdesk</li>
                    <li><strong>1st Floor:</strong> Electrical & Electronics Engineering (EEE) Department & Labs</li>
                    <li><strong>2nd Floor:</strong> Artificial Intelligence & Data Science (AI&DS) Department & Machine Learning Labs</li>
                    <li><strong>3rd Floor:</strong> Computer Science & Engineering (CSE) Department with 5 Specialized Computer Labs</li>
                    <li><strong>4th Floor:</strong> Electronics & Communication Engineering (ECE) Department & VLSI/Microwave Labs</li>
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#1e3a8a', fontSize: '0.95rem' }}>Unwind Block (5 Floors):</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <li><strong>Ground Floor:</strong> Automobile / Automotive Engineering Lab & EDC (Incubation Cell)</li>
                    <li><strong>1st Floor:</strong> Main Air-Conditioned Conference Hall & Principal Executive Wing</li>
                    <li><strong>2nd Floor:</strong> Mechanical Engineering Department & Thermal/CAD Labs</li>
                    <li><strong>3rd Floor:</strong> Civil Engineering Department & Information Technology (IT) Department</li>
                    <li><strong>4th Floor:</strong> Science & Humanities (S&H) — 1st Year Engineering Classrooms</li>
                    <li><strong>5th Floor:</strong> Science & Humanities Laboratories (Engineering Physics Lab & Chemistry Lab)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <Layers size={20} color="#2563eb" /> 1.2 Problem Statement & Objectives
            </h3>
            <div className="doc-markdown-content">
              <h4>Problem Statement:</h4>
              <p>
                Without a unified digital system, facilities management suffers from unorganized complaint queues, slow dispatching, untracked parts requisitions, inability of residents to track repair status, and absence of executive analytics on recurring defect patterns.
              </p>
              <h4>Key Objectives:</h4>
              <ul>
                <li>Enable residents to log categorized complaints (Electrical, Plumbing, Furniture, AC, Cleaning, Other) with exact location and priority.</li>
                <li>Empower administrators with a single-pane queue to triage complaints, dispatch qualified technicians, and monitor SLA compliance.</li>
                <li>Provide technicians with a specialized work order console to accept assignments, record diagnostic notes, and signal repair completion.</li>
                <li>Maintain an immutable audit trail (`TimelineEvent`) logging every lifecycle state transition.</li>
                <li>Demonstrate pure Object-Oriented Analysis & Design principles (Inheritance, Polymorphism, Encapsulation, Composition) within a modern React and LocalStorage architecture.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Requirements */}
      {activeTab === 'requirements' && (
        <div>
          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <CheckCircle2 size={20} color="#2563eb" /> 2.1 Functional Requirements (FR)
            </h3>
            <div className="doc-markdown-content">
              <ul>
                <li><strong>FR-01 User Authentication & RBAC:</strong> Secure registration, login, and role-based access control for User, Admin, and Technician roles.</li>
                <li><strong>FR-02 Maintenance Request Submission:</strong> Resident users can create requests specifying category, priority, building, room number, title, and detailed description.</li>
                <li><strong>FR-03 Lifecycle Progression:</strong> Enforce strict request states: <code>Submitted → Pending → Assigned → In Progress → Completed</code>, plus <code>On Hold</code> and <code>Rejected</code>.</li>
                <li><strong>FR-04 Technician Dispatch:</strong> Administrators can assign available technicians to requests with custom instructions.</li>
                <li><strong>FR-05 Work Order Execution:</strong> Technicians can accept assignments, change status, and record timestamped repair notes.</li>
                <li><strong>FR-06 Request Cancellation:</strong> Users can cancel their requests before work begins (states <code>Submitted</code> or <code>Pending</code>).</li>
                <li><strong>FR-07 Search & Multi-criteria Filtering:</strong> Instant search by keyword, room, building, priority, category, and status.</li>
                <li><strong>FR-08 Executive Analytics & Reporting:</strong> Real-time computation of resolution rates, turnaround hours, category distribution, and workforce utilization.</li>
              </ul>
            </div>
          </div>

          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <Cpu size={20} color="#2563eb" /> 2.2 Non-Functional & System Requirements
            </h3>
            <div className="doc-markdown-content">
              <ul>
                <li><strong>Data Persistence:</strong> Browser <code>LocalStorage</code> guarantees data remains available across page refreshes and browser restarts without requiring external servers.</li>
                <li><strong>Responsive UI:</strong> Mobile-friendly design functioning seamlessly across smartphones, tablets, laptops, and ultra-wide desktops.</li>
                <li><strong>Performance:</strong> Sub-100ms local query latency and instant client-side filtering.</li>
                <li><strong>Hardware Requirements:</strong> Any standard computing device with ≥ 2 GB RAM and a modern web browser (Chrome, Edge, Firefox, Safari).</li>
                <li><strong>Software Requirements:</strong> Node.js (v18+) runtime environment, React.js 19, Vite build tooling, Lucide React icon suite.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. System Architecture */}
      {activeTab === 'architecture' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Layers size={20} color="#2563eb" /> 3. System Architecture Diagram
          </h3>
          <p className="doc-markdown-content">
            Tiered Single-Page Application (SPA) architecture showing Presentation, Context State, Domain Class Hierarchy, and Persistent Storage.
          </p>
          <MermaidViewer chart={ARCHITECTURE_DIAGRAM} title="System Architecture" />
        </div>
      )}

      {/* 4. Use Case Diagram */}
      {activeTab === 'usecase' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Activity size={20} color="#2563eb" /> 4. Use Case Diagram
          </h3>
          <p className="doc-markdown-content">
            Illustrates interactions between the three system actors (Resident User, Administrator, Technician) and primary application use cases.
          </p>
          <MermaidViewer chart={USE_CASE_DIAGRAM} title="Use Case Diagram" />
        </div>
      )}

      {/* 5. Class Diagram */}
      {activeTab === 'class' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <GitBranch size={20} color="#2563eb" /> 5. Object-Oriented Class Diagram
          </h3>
          <p className="doc-markdown-content">
            Models core domain classes displaying Object-Oriented inheritance (<code>User → ResidentUser, Administrator, Technician</code>), composition (<code>MaintenanceRequest *-- Assignment, TimelineEvent</code>), and dependency associations.
          </p>
          <MermaidViewer chart={CLASS_DIAGRAM} title="Class Diagram" />
        </div>
      )}

      {/* 6. Sequence Diagram */}
      {activeTab === 'sequence' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <ArrowRight size={20} color="#2563eb" /> 6. Sequence Diagram (Submission, Assignment & Resolution)
          </h3>
          <p className="doc-markdown-content">
            Chronological message flow between Resident User, React UI, Context Provider, Domain Models, Administrator, and Field Technician.
          </p>
          <MermaidViewer chart={SEQUENCE_DIAGRAM} title="Sequence Diagram" />
        </div>
      )}

      {/* 7. Activity Diagram */}
      {activeTab === 'activity' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Activity size={20} color="#2563eb" /> 7. Activity Diagram (Maintenance Workflow)
          </h3>
          <p className="doc-markdown-content">
            State transitions and decision nodes governing complaint validation, triage, assignment, in-progress execution, and completion.
          </p>
          <MermaidViewer chart={ACTIVITY_DIAGRAM} title="Activity Diagram" />
        </div>
      )}

      {/* 3.5 State Machine Diagram */}
      {activeTab === 'statemachine' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Activity size={20} color="#2563eb" /> 3.5 State Machine Diagram (Figure 3.5)
          </h3>
          <p className="doc-markdown-content">
            Represents the lifecycle of the Maintenance Management System and its state transitions from initial user login to complaint submission, admin triage, technician dispatch, execution, and final completion.
          </p>
          <MermaidViewer chart={STATE_MACHINE_DIAGRAM} title="State Machine Diagram (Figure 3.5)" />
        </div>
      )}

      {/* 3.6 Component Diagram */}
      {activeTab === 'component' && (
        <div>
          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <Cpu size={20} color="#2563eb" /> 3.6 Component Diagram (Figure 3.6)
            </h3>
            <p className="doc-markdown-content">
              Displays the modular architecture of the Maintenance Management System, showing how UI presentation, authentication services, request controllers, task assignment modules, and persistence adapters interact.
            </p>
            <MermaidViewer chart={COMPONENT_DIAGRAM} title="Component Diagram (Figure 3.6)" />
          </div>

          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <Database size={20} color="#2563eb" /> Entity Relationship Diagram (ERD Reference)
            </h3>
            <p className="doc-markdown-content">
              Relational representation of entities, primary keys, foreign keys, and cardinalities.
            </p>
            <MermaidViewer chart={ERD_DIAGRAM} title="Entity Relationship Diagram" />
          </div>
        </div>
      )}

      {/* 3.7 Deployment Diagram */}
      {activeTab === 'deployment' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Cpu size={20} color="#2563eb" /> 3.7 Deployment Diagram (Figure 3.7)
          </h3>
          <p className="doc-markdown-content">
            Illustrates the physical nodes and runtime deployment configuration of the Maintenance Management System across Client Devices, Application/Web Server nodes, and the Database/Storage persistence tier.
          </p>
          <MermaidViewer chart={DEPLOYMENT_DIAGRAM} title="Deployment Diagram (Figure 3.7)" />
        </div>
      )}

      {/* 3.8 Package Diagram */}
      {activeTab === 'package' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <Layers size={20} color="#2563eb" /> 3.8 Package Diagram (Figure 3.8)
          </h3>
          <p className="doc-markdown-content">
            Organizes the system into high-cohesion, loosely-coupled logical packages: User Interface Layer, Authentication Layer, Maintenance Request Layer, Task Management Layer, Notification Layer, and Data Access Layer.
          </p>
          <MermaidViewer chart={PACKAGE_DIAGRAM} title="Package Diagram (Figure 3.8)" />
        </div>
      )}

      {/* Appendix B: Screenshots */}
      {activeTab === 'screenshots' && (
        <div>
          <div className="doc-section-card">
            <h3 className="doc-section-title">
              <FileText size={20} color="#2563eb" /> APPENDIX B – SYSTEM SCREENSHOTS & UI WALKTHROUGH
            </h3>
            <p className="doc-markdown-content">
              The KRCT Maintenance Request Management System features a responsive single-page application interface tailored to Requesters (Faculty/Students), Estate Administrators, and Maintenance Technicians.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.1 — Home Page / Sign In Page</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Features KRCT college branding, role selector tabs, email and password credential authentication, and one-click quick switch buttons for demo testing (Resident, Administrator, Technician).
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.2 — Register Account Modal / Page</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Form allowing faculty, lab assistants, and students to register with their full name, official email ID, phone number, campus block, and room/department details.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.3 — Submit Maintenance Request</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Tile-based category picker (Electrical, Plumbing, AC, Furniture, Cleaning, Other), KRCT block selector (Circuit Block vs Unwind Block), floor and laboratory dropdown, priority urgencies, and real-time character count validation.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.4 — View Maintenance Requests (Personal & Central Queue)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Interactive data table with filter chips, color-coded status badges (Submitted, Assigned, In Progress, Completed), search by keyword or room, and modal pop-up for complete ticket audit history.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.5 — Maintenance Report & Analytics</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Campus operations KPIs including total volume, pending count, resolution rate, average turnaround hours, trade-wise breakdown bar charts, and CSV/JSON export actions.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ color: '#1e3a8a', fontWeight: 800, margin: 0 }}>Figure B.6 — Technician Dashboard & Work Orders</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Field technician workstation displaying assigned tasks, room navigation info, dispatch instructions from admin, action button to accept jobs, and form to record replacement parts notes before marking completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Test Cases */}
      {activeTab === 'testcases' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <CheckCircle2 size={20} color="#2563eb" /> 9. Verification & Test Cases
          </h3>
          <p className="doc-markdown-content">
            Systematic test suite validating functional specifications, boundaries, and expected system behavior.
          </p>

          <div className="data-table-wrapper" style={{ marginTop: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Test Scenario</th>
                  <th>Input Data</th>
                  <th>Expected Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>TC-01</strong></td>
                  <td>User Login with Valid Demo Credentials</td>
                  <td>user@demo.com / User123</td>
                  <td>Authenticates successfully and displays personalized Resident Dashboard</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-02</strong></td>
                  <td>User Login with Invalid Password</td>
                  <td>admin@demo.com / WrongPass</td>
                  <td>Authentication rejected with "Incorrect password" error message</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-03</strong></td>
                  <td>Request Creation with Missing Fields</td>
                  <td>Empty title or empty description</td>
                  <td>Client validation displays inline error messages and blocks submission</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-04</strong></td>
                  <td>Valid Maintenance Request Submission</td>
                  <td>Category: AC, Room: A-302, Priority: Urgent</td>
                  <td>New MaintenanceRequest instance generated with status 'Submitted' and saved to LocalStorage</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-05</strong></td>
                  <td>Admin Assigns Technician to Request</td>
                  <td>Select Tech: Marcus Vance, Instructions: Check compressor</td>
                  <td>Assignment entity created, request status transitions to 'Assigned', audit timeline updated</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-06</strong></td>
                  <td>Technician Accepts Assigned Job</td>
                  <td>Technician clicks 'Accept Job'</td>
                  <td>Status transitions from 'Assigned' to 'In Progress', timestamp logged</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-07</strong></td>
                  <td>Technician Adds Repair Notes & Completes</td>
                  <td>Note: "Replaced faulty capacitor", status: 'Completed'</td>
                  <td>Repair note appended, status set to 'Completed', completedAt timestamp stored</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-08</strong></td>
                  <td>Resident Cancels Unstarted Request</td>
                  <td>User clicks 'Cancel' on Submitted request</td>
                  <td>Status transitions to 'Rejected' with reason 'Cancelled by requester'</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-09</strong></td>
                  <td>Search and Category Filter Operations</td>
                  <td>Search "leakage", Category: "Plumbing"</td>
                  <td>Only plumbing complaints matching "leakage" appear in table</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
                <tr>
                  <td><strong>TC-10</strong></td>
                  <td>LocalStorage Refresh Persistence</td>
                  <td>Page reloaded via browser refresh</td>
                  <td>All modified requests, assignments, notes, and statuses persist intact</td>
                  <td><span style={{ color: '#10b981', fontWeight: 700 }}>PASS ✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10. Conclusion */}
      {activeTab === 'conclusion' && (
        <div className="doc-section-card">
          <h3 className="doc-section-title">
            <CheckCircle2 size={20} color="#2563eb" /> 10. Conclusion & Future Enhancements
          </h3>
          <div className="doc-markdown-content">
            <h4>Conclusion:</h4>
            <p>
              The <strong>FixFlow Maintenance Request Management System</strong> successfully fulfills all Object-Oriented Analysis & Design (OOAD) project requirements. By modeling domain entities using polymorphic class inheritance, encapsulation of lifecycle methods, and strict association relationships, the system delivers a robust, academic-grade solution for facilities management.
            </p>
            <h4>Future Enhancements:</h4>
            <ul>
              <li><strong>Automated AI Dispatch:</strong> Machine learning algorithms to automatically parse problem descriptions and dispatch the closest technician with the matching skillset.</li>
              <li><strong>SMS & Push Notifications:</strong> Real-time SMS alerts to residents when technician arrives at their dorm room.</li>
              <li><strong>Barcode / QR Code Tagging:</strong> Affixing QR stickers onto physical equipment (AC units, water purifiers, projectors) for instant issue logging by scanning with a smartphone camera.</li>
              <li><strong>Inventory & Spare Parts ERP Integration:</strong> Direct inventory deduction and cost estimation upon technician part usage.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
