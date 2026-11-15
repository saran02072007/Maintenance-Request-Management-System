/**
 * K.Ramakrishnan College of Technology (KRCT) — Campus Building & Floor Directory
 * Autonomous Engineering College in Tiruchirappalli
 * 
 * Accurately models:
 * 1. Circuit Block (4 Floors: Commercial Hall, EEE, AI&DS, CSE with 5 labs, ECE)
 * 2. Unwind Block (5 Floors: Automobile Lab & EDC, Conference Hall, Mech, Civil & IT, S&H 1st yr, S&H 2 Labs)
 * 3. Campus Amenities & Hostels
 */

export const KRCT_COLLEGE_INFO = {
  name: 'K.Ramakrishnan College of Technology',
  shortName: 'KRCT',
  tagline: 'Autonomous Engineering College in Tiruchirappalli',
  accreditation: 'Approved by AICTE | Affiliated to Anna University Chennai | NAAC "A+" Grade | NBA Accredited',
  tneaCode: '3701',
  location: 'Kariyamanickam Road, Samayapuram, Tiruchirappalli, Tamil Nadu - 621112',
  logoUrl: 'https://krct.ac.in/logo.png?v=3',
  website: 'https://krct.ac.in/'
};

export const KRCT_CAMPUS_BLOCKS = {
  'Circuit Block': {
    name: 'Circuit Block',
    code: 'CB',
    description: 'Computing & Circuit Engineering Wing (4 Floors + Ground)',
    totalFloors: 4,
    floors: [
      {
        level: 'Ground Floor',
        label: 'Ground Floor — Commercial & Facilities Hub',
        departments: ['Commercial Hall', 'Campus Stationery & Amenities', 'Central Maintenance Office'],
        rooms: [
          'Commercial Hall (Central Gathering)',
          'Student Cooperative Store & Stationery',
          'Campus ATM & Amenities Kiosk',
          'Estate & Maintenance Helpdesk (CB-G01)',
          'Restrooms (Ground Floor East Wing)'
        ]
      },
      {
        level: '1st Floor',
        label: '1st Floor — Electrical & Electronics Engineering (EEE)',
        departments: ['EEE Department'],
        rooms: [
          'EEE Department Office & HOD Cabin',
          'EEE Faculty Lounge (CB-101)',
          'Power Electronics & Drives Laboratory',
          'Electrical Machines Laboratory',
          'Control Systems & Simulation Lab',
          'Classroom EEE-A (CB-104)',
          'Classroom EEE-B (CB-105)',
          'EEE Smart Seminar Room (CB-106)'
        ]
      },
      {
        level: '2nd Floor',
        label: '2nd Floor — Artificial Intelligence & Data Science (AI&DS)',
        departments: ['AI & DS Department'],
        rooms: [
          'AI & DS Department Office & HOD Cabin',
          'AI & DS Faculty Lounge (CB-201)',
          'Artificial Intelligence & Machine Learning Lab',
          'Data Analytics & Cloud Computing Lab',
          'Classroom AI-A (CB-204)',
          'Classroom AI-B (CB-205)',
          'AI&DS Project & Innovation Cell'
        ]
      },
      {
        level: '3rd Floor',
        label: '3rd Floor — Computer Science & Engineering (CSE)',
        departments: ['CSE Department'],
        rooms: [
          'CSE Department Office & HOD Cabin',
          'CSE Faculty Workstations (CB-301)',
          'CSE Lab 1 (Programming & Data Structures)',
          'CSE Lab 2 (Database & Web Technologies)',
          'CSE Lab 3 (Object-Oriented Analysis & Design Lab)',
          'CSE Lab 4 (Networks & Operating Systems Lab)',
          'CSE Lab 5 (High Performance Computing Lab)',
          'Classroom CSE-A (CB-308)',
          'Classroom CSE-B (CB-309)',
          'Classroom CSE-C (CB-310)'
        ]
      },
      {
        level: '4th Floor',
        label: '4th Floor — Electronics & Communication Engineering (ECE)',
        departments: ['ECE Department'],
        rooms: [
          'ECE Department Office & HOD Cabin',
          'ECE Faculty Lounge (CB-401)',
          'VLSI & Embedded Systems Laboratory',
          'Microwave & Optical Communication Lab',
          'Digital Signal Processing (DSP) Lab',
          'Classroom ECE-A (CB-406)',
          'Classroom ECE-B (CB-407)',
          'ECE Hardware Prototype Cell'
        ]
      }
    ]
  },
  'Unwind Block': {
    name: 'Unwind Block',
    code: 'UB',
    description: 'Engineering, Technology & Science & Humanities Wing (5 Floors)',
    totalFloors: 5,
    floors: [
      {
        level: 'Ground Floor',
        label: 'Ground Floor — Automobile Engineering & EDC Cell',
        departments: ['Automobile Engineering', 'Entrepreneurship Development Cell (EDC)'],
        rooms: [
          'Automotive Systems & Chassis Laboratory',
          'Internal Combustion (IC) Engines Workshop',
          'Two-Wheeler & Heavy Vehicle Servicing Bay',
          'Entrepreneurship Development Cell (EDC Incubation Hub)',
          'Startup Prototype Workspace (UB-G05)'
        ]
      },
      {
        level: '1st Floor',
        label: '1st Floor — Central Administration & Conference Hall',
        departments: ['Central Administration', 'Executive Conference Wing'],
        rooms: [
          'Main Air-Conditioned Conference Hall (Auditorium)',
          'Principal Executive Boardroom',
          'Dean (Academic) & Controller of Examinations (CoE)',
          'College Administrative Office & Accounts Section',
          'VIP Guest Lounge & Reception (UB-104)'
        ]
      },
      {
        level: '2nd Floor',
        label: '2nd Floor — Mechanical Engineering Department',
        departments: ['Mechanical Engineering'],
        rooms: [
          'Mechanical Engineering HOD Cabin & Department Office',
          'Thermal Engineering Laboratory',
          'Fluid Mechanics & Machinery Lab',
          'CAD/CAM Simulation & Automation Lab',
          'Classroom MECH-A (UB-205)',
          'Classroom MECH-B (UB-206)',
          'Mechanical Project & Fabrication Room'
        ]
      },
      {
        level: '3rd Floor',
        label: '3rd Floor — Civil Engineering & Information Technology (IT)',
        departments: ['Civil Engineering', 'Information Technology'],
        rooms: [
          'Civil Engineering HOD Cabin & Office',
          'IT Department HOD Cabin & Office',
          'Civil Drawing Hall & CADD Laboratory',
          'Strength of Materials & Concrete Testing Lab',
          'IT Web Systems & Mobile Application Lab',
          'Classroom CIVIL-A (UB-305)',
          'Classroom IT-A (UB-306)',
          'Classroom IT-B (UB-307)'
        ]
      },
      {
        level: '4th Floor',
        label: '4th Floor — Science & Humanities (S&H) 1st Year Classes',
        departments: ['Science & Humanities (1st Year)'],
        rooms: [
          '1st Year Coordinator & HOD (S&H) Office',
          'S&H Faculty Common Room (Mathematics & English)',
          'Classroom 1st Year Section A (UB-403)',
          'Classroom 1st Year Section B (UB-404)',
          'Classroom 1st Year Section C (UB-405)',
          'Classroom 1st Year Section D (UB-406)',
          'Classroom 1st Year Section E (UB-407)'
        ]
      },
      {
        level: '5th Floor',
        label: '5th Floor — Science Laboratories (Physics & Chemistry Labs)',
        departments: ['S&H Physics & Chemistry Laboratories'],
        rooms: [
          'Engineering Physics Laboratory (Optics & Mechanics)',
          'Engineering Chemistry Laboratory (Volumetric & Instrumental)',
          'Physics Preparation & Dark Room',
          'Chemistry Reagent & Analytical Store',
          'S&H Seminar & Tutorial Hall (UB-505)'
        ]
      }
    ]
  },
  'Campus Amenities & Hostels': {
    name: 'Campus Amenities & Hostels',
    code: 'AH',
    description: 'Central Campus Facilities & Residential Dormitories',
    totalFloors: 3,
    floors: [
      {
        level: 'Ground Floor',
        label: 'Central Library & Student Cafeteria',
        departments: ['Library & Dining'],
        rooms: [
          'Central Library (Digital Reference Section)',
          'Main Student Food Court & Cafeteria',
          'Indoor Sports Badminton & Table Tennis Court',
          'Medical First-Aid & Health Center'
        ]
      },
      {
        level: 'Boys Hostel',
        label: 'Boys Residential Block (Rooms 101 - 320)',
        departments: ['Boys Hostel'],
        rooms: [
          'Hostel Block 1 - Common Study Hall',
          'Hostel Block 1 - Room 214',
          'Hostel Block 2 - Room 204',
          'Hostel Block 2 - 2nd Floor Common Washroom'
        ]
      },
      {
        level: 'Girls Hostel',
        label: 'Girls Residential Block (Rooms 101 - 320)',
        departments: ['Girls Hostel'],
        rooms: [
          'Girls Hostel Wing A - Room 108',
          'Girls Hostel Wing B - Study Lounge',
          'Girls Hostel Mess Dining Hall'
        ]
      }
    ]
  }
};

/**
 * Get all available buildings/blocks
 */
export const getCampusBlockNames = () => Object.keys(KRCT_CAMPUS_BLOCKS);

/**
 * Get floors for a given block
 */
export const getFloorsForBlock = (blockName) => {
  const block = KRCT_CAMPUS_BLOCKS[blockName];
  return block ? block.floors : [];
};

/**
 * Get rooms/labs for a given block and floor level
 */
export const getRoomsForFloor = (blockName, floorLevel) => {
  const block = KRCT_CAMPUS_BLOCKS[blockName];
  if (!block) return [];
  const floor = block.floors.find(f => f.level === floorLevel);
  return floor ? floor.rooms : [];
};
