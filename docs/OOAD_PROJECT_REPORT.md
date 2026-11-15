# Object-Oriented Analysis and Design (OOAD) Project Report
## FixFlow - Campus Maintenance Request Management System
### K.Ramakrishnan College of Technology (Autonomous), Tiruchirappalli

**Institution:** K.Ramakrishnan College of Technology (KRCT), Tiruchirappalli — 621 112  
**Accreditation:** Approved by AICTE | Affiliated to Anna University Chennai | NAAC "A+" Grade | NBA Accredited  
**TNEA Counselling Code:** 3701  
**Academic Year:** Semester 5  
**Course Title:** Object-Oriented Analysis & Design (OOAD)  
**Project Title:** Maintenance Request Management System (Campus Facilities Automation)  
**System Architecture:** Component-Based Single Page Application (React.js + LocalStorage)  

---

## Table of Contents
1. [Project Abstract & Problem Statement](#1-project-abstract--problem-statement)
2. [Objectives and Scope](#2-objectives-and-scope)
3. [Campus Infrastructure & Block Layout](#3-campus-infrastructure--block-layout)
4. [Requirements Engineering](#4-requirements-engineering)
   - 4.1 Functional Requirements (FR)
   - 4.2 Non-Functional Requirements (NFR)
5. [Hardware and Software Specifications](#5-hardware-and-software-specifications)
6. [Object-Oriented Modeling & UML Diagrams](#6-object-oriented-modeling--uml-diagrams)
   - 6.1 System Architecture Diagram
   - 6.2 Use Case Diagram
   - 6.3 Class Diagram (Inheritance, Associations, Encapsulation)
   - 6.4 Sequence Diagram 1 (Request Submission & Admin Assignment)
   - 6.5 Sequence Diagram 2 (Technician Acceptance & Repair Completion)
   - 6.6 Activity Diagram (Maintenance Lifecycle Workflow)
   - 6.7 Component Diagram
   - 6.8 Database & Entity-Relationship Diagram (ERD)
7. [Design Patterns & Object-Oriented Concepts](#7-design-patterns--object-oriented-concepts)
8. [Comprehensive Verification & Test Suite](#8-comprehensive-verification--test-suite)
9. [Conclusion and Future Enhancements](#9-conclusion-and-future-enhancements)

---

## 1. Project Abstract & Problem Statement

### 1.1 Abstract
**K.Ramakrishnan College of Technology (KRCT)** is an autonomous engineering institution situated in Samayapuram, Tiruchirappalli. The campus houses extensive modern laboratory facilities and smart lecture classrooms distributed across two prominent multi-storey blocks: the **Circuit Block** (Ground + 4 Floors) and the **Unwind Block** (5 Floors).

In an active technical institution with thousands of students, faculty, and high-value laboratory equipment, facility breakdowns—including computer network dropouts in CSE labs, air conditioner water leakage in AI&DS server rooms, hydraulic line failures in Automobile workshops, electrical motor trips in EEE test benches, and sound feedback in the Main Conference Hall—demand rapid, documented, and accountable resolution.

The **FixFlow Maintenance Request Management System** is an Object-Oriented software system engineered to digitize and automate facilities operations across KRCT. Developed in alignment with Semester 5 OOAD principles, the platform encapsulates core domain entities (`User`, `MaintenanceRequest`, `Assignment`, `TimelineEvent`, and `MaintenanceReport`), enforcing role-based privileges across three primary actors:
1. **Faculty, Staff & Student Users:** Report defects specifying exact campus block, floor, and room/lab, monitor live progress through colored status badges, and cancel unstarted requests.
2. **Estate & Maintenance Administrators:** Supervise the campus-wide ticket queue, assign certified trade technicians with custom instructions, override statuses, manage workforce directories, and inspect analytics.
3. **Field Maintenance Technicians:** Access assigned work orders, accept dispatched jobs, transition status (`In Progress`, `On Hold`, `Completed`), and append diagnostic and replacement parts notes.

### 1.2 Problem Statement
Prior to this system:
- Defect notifications were reported verbally, causing tickets in distant wings (such as the 5th floor S&H Chemistry lab or Ground floor Automobile lab) to be delayed or overlooked.
- Technicians had to physically commute between the Circuit Block and Unwind Block without prior knowledge of required tools or replacement parts.
- Department HODs and faculty had no mechanism to track real-time repair progress or know why a repair was put on hold.
- College management lacked consolidated analytics regarding recurrent component failures, block-wise maintenance load, and technician resolution throughput.

---

## 2. Campus Infrastructure & Block Layout

The system directly models the physical departmental and laboratory layout of K.Ramakrishnan College of Technology:

### 2.1 Circuit Block (Computing & Circuit Engineering — 4 Floors + Ground)
- **Ground Floor:** Commercial Hall, Student Amenities, Campus Stationery Store, Estate & Maintenance Helpdesk.
- **1st Floor:** Department of Electrical & Electronics Engineering (EEE)
  - EEE HOD Cabin, Faculty Cabins, Power Electronics Lab, Electrical Machines Lab, Control Systems Lab.
- **2nd Floor:** Department of Artificial Intelligence & Data Science (AI & DS)
  - AI&DS HOD Cabin, Faculty Cabins, Artificial Intelligence & Machine Learning Lab, Data Analytics Lab.
- **3rd Floor:** Department of Computer Science & Engineering (CSE)
  - CSE HOD Cabin, Faculty Cabins, and 5 Specialized Computing Labs:
    - *CSE Lab 1:* Programming & Data Structures Lab
    - *CSE Lab 2:* Database & Web Technologies Lab
    - *CSE Lab 3:* Object-Oriented Analysis & Design (OOAD) Lab
    - *CSE Lab 4:* Networks & Operating Systems Lab
    - *CSE Lab 5:* High Performance Computing Lab
- **4th Floor:** Department of Electronics & Communication Engineering (ECE)
  - ECE HOD Cabin, VLSI & Embedded Systems Lab, Microwave & Optical Lab, DSP Lab.

### 2.2 Unwind Block (Engineering, Technology & Science & Humanities — 5 Floors)
- **Ground Floor:** Automobile Engineering & Entrepreneurship Cell
  - Automobile Systems Workshop, Chassis & IC Engines Lab, EDC Incubation Hub.
- **1st Floor:** Central Administration & Conference Hall
  - Main Air-Conditioned Conference Hall, Principal Executive Boardroom, Dean Offices, Administrative Section.
- **2nd Floor:** Department of Mechanical Engineering
  - Mechanical HOD Cabin, Thermal Engineering Lab, Fluid Mechanics Lab, CAD/CAM Simulation Lab.
- **3rd Floor:** Department of Civil Engineering & Department of Information Technology (IT)
  - Civil Drawing Hall, Strength of Materials Lab, IT Department Offices, Web Systems Lab.
- **4th Floor:** Department of Science & Humanities (S&H) — 1st Year Classes
  - 1st Year Classrooms (Sections A through E), S&H Faculty Rooms (Mathematics, Physics, English).
- **5th Floor:** Department of Science & Humanities Laboratories
  - Engineering Physics Laboratory, Engineering Chemistry Laboratory, Analytical Store.

---

## 2. Objectives and Scope

### 2.1 Project Objectives
- **Centralize Complaint Ingestion:** Standardize complaint logging across six core categories: Electrical, Plumbing, Furniture, AC, Cleaning, and Other.
- **Enforce Lifecycle State Machine:** Maintain a rigid progression model:  
  `Submitted → Pending → Assigned → In Progress → Completed` (with support for `On Hold` and `Rejected`).
- **Ensure Role Separation & Access Control:** Grant specific operational privileges to Residents, Administrators, and Technicians.
- **Maintain Audit Trail Integrity:** Record every status change, assigning actor, and diagnostic note in an immutable `TimelineEvent` history.
- **Deliver Zero-Dependency Persistence:** Enable local operation using browser `LocalStorage` without requiring paid cloud databases or API keys.

### 2.2 Scope
- **Target Environments:** University campuses, hostel residences, co-working facilities, apartment complexes, hospital blocks.
- **Platform Scope:** Web browser application fully responsive across desktops, tablets, and smartphones.

---

## 3. Requirements Engineering

### 3.1 Functional Requirements (FR)

| Req ID | Module | Description | Actor |
| :--- | :--- | :--- | :--- |
| **FR-01** | Authentication | User registration, login, session retention, and role switching | All |
| **FR-02** | User Portal | Personalized dashboard showing my requests, resolution status, and defect counts | Resident |
| **FR-03** | Request Creation | Submit request with category, priority, building, room number, title, and description | Resident |
| **FR-04** | Cancellation | Cancel submitted request before physical repair commences (Submitted/Pending states) | Resident |
| **FR-05** | Admin Queue | Central maintenance queue showing all campus tickets with advanced search and filters | Admin |
| **FR-06** | Dispatching | Assign/reassign certified technician to ticket with custom dispatch instructions | Admin |
| **FR-07** | Status Override | Administrator override capability to transition any ticket state | Admin |
| **FR-08** | Workforce Admin | View registered users, active workloads, and register new certified technicians | Admin |
| **FR-09** | Reporting | Real-time computation of resolution rates, turnaround hours, category volumes | Admin |
| **FR-10** | Work Order Desk | Technician view of assigned work orders with problem descriptions and locations | Technician |
| **FR-11** | Job Acceptance | Technician accepts job to transition state to 'In Progress' | Technician |
| **FR-12** | Repair Notes | Technicians and users append timestamped remarks and replacement parts details | Tech / User |
| **FR-13** | Job Completion | Technician marks order as Completed with completion remarks | Technician |

### 3.2 Non-Functional Requirements (NFR)
- **NFR-01 Data Persistence:** Browser LocalStorage stores user accounts and maintenance requests indefinitely across page reloads.
- **NFR-02 Usability & Aesthetics:** Modern blue-and-white theme layout with color-coded status badges, micro-animations, and glassmorphic navigation.
- **NFR-03 Responsiveness:** Responsive CSS grid and flexbox layout adapting to screens from 360px mobile to 2560px 4K.
- **NFR-04 Zero Latency:** Instantaneous client-side filtering, sorting, and state transitions.

---

## 4. Hardware and Software Specifications

### 4.1 Hardware Specifications
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher.
- **RAM:** Minimum 2 GB (4 GB recommended).
- **Disk Storage:** At least 250 MB free space for Node modules and project files.
- **Display Resolution:** 1280x720 or higher.

### 4.2 Software Specifications
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Node.js Environment:** v18.0.0 or higher (v24.x tested).
- **Package Manager:** npm v9+ or npm v11+.
- **Frontend Framework:** React.js 19 (Functional Components & Hooks).
- **Build Tool:** Vite 6 / 8.
- **Icons Library:** Lucide React (`lucide-react`).
- **Diagramming Tool:** Mermaid.js.

---

## 5. Object-Oriented Modeling & UML Diagrams

### 5.1 System Architecture Diagram
```mermaid
graph TD
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
    Models --> Storage
```

### 5.2 Use Case Diagram
```mermaid
flowchart LR
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
    Tech --> UC12
```

### 5.3 Class Diagram (Inheritance, Associations, Encapsulation)
```mermaid
classDiagram
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
    Technician ..> MaintenanceRequest : Resolves
```

### 5.4 Sequence Diagram 1: Request Submission & Admin Assignment
```mermaid
sequenceDiagram
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
```

### 5.5 Sequence Diagram 2: Technician Acceptance & Repair Completion
```mermaid
sequenceDiagram
    autonumber
    actor Tech as Technician
    participant UI as Technician Console
    participant ReqCtx as Request Context
    participant ReqModel as MaintenanceRequest Model
    participant Storage as LocalStorage
    actor User as Resident User

    Tech->>UI: Opens "Assigned Jobs" tab
    Tech->>UI: Clicks "Accept Job"
    UI->>ReqCtx: acceptJob(reqId)
    ReqCtx->>ReqModel: acceptJob(technician)
    ReqModel->>ReqModel: updateStatus("In Progress")
    ReqModel->>ReqModel: append TimelineEvent("In Progress")
    ReqCtx->>Storage: saveRequests(requests)
    UI-->>Tech: Status Changed to In Progress

    Note over Tech, UI: Physical Repair & Notes
    Tech->>UI: Enters repair diagnostics & parts used
    UI->>ReqCtx: addRepairNote(reqId, noteText)
    ReqCtx->>ReqModel: addRepairNote(technician, noteText)
    ReqCtx->>Storage: updateRequest(req)

    Tech->>UI: Clicks "Mark as Completed"
    UI->>ReqCtx: updateStatus(reqId, "Completed", completionNote)
    ReqCtx->>ReqModel: updateStatus("Completed", technician, completionNote)
    ReqModel->>ReqModel: set completedAt = Date.now()
    ReqCtx->>Storage: saveRequests(requests)
    UI-->>Tech: Job Marked Completed

    Note over User, UI: Resident tracks completion
    User->>UI: Views My Requests table
    UI-->>User: Status shown as Completed with green badge
```

### 5.6 Activity Diagram (Maintenance Lifecycle Workflow)
```mermaid
flowchart TD
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
    Complete --> Archive([Request Closed & Archived])
```

### 5.7 State Machine Diagram
```mermaid
stateDiagram-v2
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
    Completed --> [*] : Ticket Closed & Archived
```

### 5.8 Component Diagram
```mermaid
graph TD
    App["App.jsx (Root Router & Layout Shell)"]
    AuthProvider["AuthProvider (Context & JWT Simulation)"]
    RequestProvider["RequestProvider (Context & Lifecycle Operations)"]
    
    subgraph UIComponents ["UI Presentation Components"]
        Sidebar["Sidebar.jsx"]
        Navbar["Navbar.jsx"]
        MetricCard["MetricCard.jsx"]
        RequestTable["RequestTable.jsx"]
        StatusBadge["StatusBadge.jsx"]
        PriorityBadge["PriorityBadge.jsx"]
        CreateModal["CreateRequestModal.jsx"]
        DetailModal["RequestDetailModal.jsx"]
        Toast["NotificationToast.jsx"]
        Mermaid["MermaidViewer.jsx"]
    end

    subgraph Pages ["Application Pages"]
        LoginPage["LoginPage.jsx"]
        UserDash["UserDashboard.jsx"]
        AdminDash["AdminDashboard.jsx"]
        TechDash["TechnicianDashboard.jsx"]
        Reports["ReportsPage.jsx"]
        UsersPage["UserManagementPage.jsx"]
        DocsPage["DocumentationPage.jsx"]
    end

    subgraph DomainModels ["OOAD Class Models"]
        UserClass["User Hierarchy (Resident, Admin, Tech)"]
        ReqClass["MaintenanceRequest Entity"]
        AssignClass["Assignment Entity"]
        ReportClass["MaintenanceReport Engine"]
    end

    subgraph Persistence ["Persistence Layer"]
        StorageService["storageService.js (LocalStorage Adapter)"]
    end

    App --> AuthProvider
    AuthProvider --> RequestProvider
    RequestProvider --> Pages
    Pages --> UIComponents
    Pages --> DomainModels
    DomainModels --> StorageService
```

### 5.9 Deployment Diagram
```mermaid
graph TD
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

    ClientNode -- "HTTP/HTTPS (Port 5173 / 443)" --> WebServerNode
    WebServerNode -- "TCP/IP (Port 3306)" --> DBServerNode
```

### 5.10 Package Diagram
```mermaid
graph TD
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
    Auth_Layer --> Data_Layer
```

### 5.11 Database & Entity-Relationship Diagram (ERD)
```mermaid
erDiagram
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
    }
```

---

## 6. Design Patterns & Object-Oriented Concepts

1. **Encapsulation:**
   - Properties of `User` (password, id, role) are shielded with getter methods and protected internal variables.
   - `MaintenanceRequest` guards status updates through domain methods (`assignTo()`, `acceptJob()`, `updateStatus()`) which simultaneously update timestamps and log an immutable `TimelineEvent`.
2. **Inheritance & Polymorphism:**
   - Base `User` class is extended into `ResidentUser`, `Administrator`, and `Technician`.
   - Each subclass overrides permissions (`canCreateRequest()`, `canAssignTechnician()`, `canUpdateRepairStatus()`).
3. **Composition & Association:**
   - A `MaintenanceRequest` owns an `Assignment` (associating a Technician) and an array of `TimelineEvent` records.
4. **State Pattern (Lifecycle Machine):**
   - The ticket lifecycle transitions through defined valid states: `Submitted → Pending → Assigned → In Progress → Completed`, preventing invalid transitions.
5. **Repository / Storage Adapter Pattern:**
   - `storageService.js` abstracts data serialization and deserialization from/to LocalStorage, decoupling UI components from underlying storage mechanisms.

---

## 7. Comprehensive Verification & Test Suite

| Test ID | Test Case Title | Input / Precondition | Test Execution Steps | Expected Outcome | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Admin Authentication | `admin@demo.com` / `Admin123` | Enter credentials and submit login form | Successfully logs into Admin Dashboard; shows all campus requests | **PASS** |
| **TC-02** | User Authentication | `user@demo.com` / `User123` | Enter credentials and submit login form | Navigates to User Dashboard; displays only user's personal requests | **PASS** |
| **TC-03** | Technician Authentication | `technician@demo.com` / `Tech123` | Enter credentials and submit login form | Opens Technician Dashboard with assigned work orders | **PASS** |
| **TC-04** | Invalid Login Handling | `admin@demo.com` / `Wrong123` | Submit incorrect password | Displays error message "Incorrect password" | **PASS** |
| **TC-05** | Form Validation on Request | Empty fields | Click submit on blank request modal | Shows validation errors on required fields (title, room, etc.) | **PASS** |
| **TC-06** | Request Creation & Auto ID | Valid form input | Submit request for Plumbing in Room B-104 | Generates unique ID `REQ-XXXX`, state set to `Submitted`, appears in queue | **PASS** |
| **TC-07** | Admin Assigns Technician | Ticket in Submitted state | Admin selects Marcus Vance and assigns | Status changes to `Assigned`, assignment entity linked, audit log recorded | **PASS** |
| **TC-08** | Tech Accepts Work Order | Ticket in Assigned state | Technician clicks "Accept Job" | Status changes to `In Progress`, technician note appended | **PASS** |
| **TC-09** | Tech Completes Repair | Ticket In Progress | Technician posts note and clicks "Mark as Completed" | Status changes to `Completed`, completedAt recorded, resolution metrics update | **PASS** |
| **TC-10** | User Cancels Submitted Ticket | Request in Submitted state | Resident clicks "Cancel My Request" | Status changes to `Rejected`, audit log records cancellation reason | **PASS** |
| **TC-11** | Cancellation Boundary Check | Ticket already In Progress | Resident inspects request details | Cancel button is hidden/disabled; user cannot cancel active job | **PASS** |
| **TC-12** | Multi-Factor Search & Filtering| Query: "AC", Priority: "Urgent" | Enter search terms in table filters | Table filters instantly displaying only matching urgent AC tickets | **PASS** |
| **TC-13** | Register New Technician | Admin registers new tech | Fill name, email, specialization, and submit | New technician appears in personnel directory and assignment dropdowns | **PASS** |
| **TC-14** | LocalStorage Persistence | Perform changes & reload | Refresh browser with `F5` | All requests, statuses, audit timeline, and notes persist accurately | **PASS** |

---

## 8. Conclusion and Future Enhancements

### 8.1 Conclusion
The **FixFlow Maintenance Request Management System** provides a comprehensive, robust, and intuitive digital facilities maintenance platform. Designed to satisfy all academic requirements of Semester 5 Object-Oriented Analysis & Design, the project models key software engineering practices including domain-driven class diagrams, interactive UML representations, role-based workflows, and client-side data persistence.

### 8.2 Future Enhancements
- **QR Code Asset Scanning:** Affix unique QR stickers to physical classroom assets (projectors, smartboards, HVAC units) to auto-fill building and model details.
- **Automated AI Triage:** Leverage natural language processing to categorize complaints and predict spare part requirements.
- **SMS / Web Push Notifications:** Push automated status alerts to residents when technicians arrive or parts arrive.
- **Inventory & Billing Integration:** Connect with university ERP to automatically track spare parts inventory and calculate repair labor costs.
