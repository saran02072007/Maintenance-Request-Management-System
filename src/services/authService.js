import { storageService, DEMO_USERS } from './storageService.js';

class AuthService {
  login(email, password) {
    const users = storageService.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error('No KRCT account found with this email address.');
    }

    if (!user.verifyPassword(password)) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    storageService.setActiveUser(user);
    return user;
  }

  register({ name, email, password, role = 'user', building, roomNumber, specialization, department, phone }) {
    if (!name || !email || !password) {
      throw new Error('Full Name, College Email, and Password are required.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const userData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      phone: phone || '',
      building: building || 'Circuit Block',
      roomNumber: roomNumber || '3rd Floor — CSE Lab 1',
      specialization: specialization || 'General Maintenance',
      department: department || 'KRCT Department',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e3a8a&textColor=ffffff`
    };

    const newUser = storageService.addUser(userData);
    storageService.setActiveUser(newUser);
    return newUser;
  }

  logout() {
    storageService.setActiveUser(null);
  }

  getCurrentUser() {
    return storageService.getActiveUser();
  }

  getDemoAccounts() {
    return [
      {
        roleName: 'Estate Admin / Supervisor',
        email: 'admin@demo.com',
        password: 'Admin123',
        personName: 'Ms. S. Shahina Shalu / Mr. R. Rajavarman',
        description: 'Complete campus facilities oversight across Circuit & Unwind blocks, dispatch technicians, view metrics',
        badgeColor: 'blue'
      },
      {
        roleName: 'Project Requester / Student',
        email: 'user@demo.com',
        password: 'User123',
        personName: 'Saran I (2403811710421140)',
        description: 'Report lab & classroom defects, track real-time resolution, cancel unstarted requests',
        badgeColor: 'emerald'
      },
      {
        roleName: 'Lead Technician (Electrical / HVAC)',
        email: 'technician@demo.com',
        password: 'Tech123',
        personName: 'Marcus Vance (Circuit Block In-Charge)',
        description: 'Accept assigned work orders, update job status, log repair details & replacement parts',
        badgeColor: 'amber'
      }
    ];
  }
}

export const authService = new AuthService();
