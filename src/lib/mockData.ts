// Mock data for the CMS

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'moderator';
  lastLogin?: string;
  status: 'active' | 'inactive';
}

export interface Content {
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'published' | 'unpublished';
  createdBy: string;
  createdAt: string;
  publishedAt?: string;
  views: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  speaker: string;
  registrationLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Form {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  responses: number;
  createdAt: string;
}

export interface Log {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@icai.org', role: 'admin', lastLogin: '2025-01-10 14:30', status: 'active' },
  { id: '2', name: 'Editor One', email: 'editor1@icai.org', role: 'editor', lastLogin: '2025-01-10 12:15', status: 'active' },
  { id: '3', name: 'Editor Two', email: 'editor2@icai.org', role: 'editor', lastLogin: '2025-01-09 16:45', status: 'active' },
  { id: '4', name: 'Moderator One', email: 'mod1@icai.org', role: 'moderator', lastLogin: '2025-01-10 10:20', status: 'active' },
  { id: '5', name: 'Moderator Two', email: 'mod2@icai.org', role: 'moderator', lastLogin: '2025-01-08 09:30', status: 'inactive' },
];

export const mockContent: Content[] = [
  { id: '1', title: 'Annual Tax Conference 2025', category: 'Conferences', status: 'published', createdBy: 'Admin User', createdAt: '2025-01-05', publishedAt: '2025-01-06', views: 1250 },
  { id: '2', title: 'New GST Guidelines', category: 'Announcements', status: 'published', createdBy: 'Editor One', createdAt: '2025-01-08', publishedAt: '2025-01-08', views: 890 },
  { id: '3', title: 'ITR Filing Deadline Extended', category: 'Updates', status: 'published', createdBy: 'Editor Two', createdAt: '2025-01-09', publishedAt: '2025-01-09', views: 2340 },
  { id: '4', title: 'Webinar on Digital Taxation', category: 'Webinars', status: 'draft', createdBy: 'Editor One', createdAt: '2025-01-10', views: 0 },
  { id: '5', title: 'DTC Annual Report 2024', category: 'Reports', status: 'published', createdBy: 'Admin User', createdAt: '2025-01-03', publishedAt: '2025-01-04', views: 560 },
  { id: '6', title: 'Budget 2025 Analysis', category: 'Publications', status: 'draft', createdBy: 'Editor Two', createdAt: '2025-01-10', views: 0 },
];

export const mockEvents: Event[] = [
  { 
    id: '1', 
    title: 'National Tax Summit 2025', 
    description: 'Annual conference discussing latest tax reforms and policies',
    location: 'New Delhi Convention Center',
    startDate: '2025-02-15',
    endDate: '2025-02-17',
    speaker: 'CA. Rajesh Kumar',
    registrationLink: 'https://icai.org/register/summit2025',
    status: 'upcoming'
  },
  { 
    id: '2', 
    title: 'GST Updates Workshop', 
    description: 'Interactive workshop on recent GST amendments',
    location: 'Mumbai',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    speaker: 'CA. Priya Sharma',
    registrationLink: 'https://icai.org/register/gst-workshop',
    status: 'upcoming'
  },
  { 
    id: '3', 
    title: 'Digital Taxation Webinar', 
    description: 'Online webinar on digital economy taxation',
    location: 'Online',
    startDate: '2025-01-12',
    endDate: '2025-01-12',
    speaker: 'CA. Amit Verma',
    status: 'completed'
  },
];

export const mockForms: Form[] = [
  { id: '1', title: 'Member Feedback Survey 2025', description: 'Annual member satisfaction survey', status: 'active', responses: 145, createdAt: '2025-01-01' },
  { id: '2', title: 'Event Registration Form', description: 'Registration for upcoming events', status: 'active', responses: 234, createdAt: '2024-12-15' },
  { id: '3', title: 'Course Enrollment Form', description: 'Professional development course enrollment', status: 'active', responses: 89, createdAt: '2025-01-05' },
  { id: '4', title: 'Publication Feedback', description: 'Feedback on monthly publications', status: 'inactive', responses: 67, createdAt: '2024-11-20' },
];

export const mockLogs: Log[] = [
  { id: '1', action: 'Content Published', user: 'Admin User', timestamp: '2025-01-10 14:25', details: 'Published: ITR Filing Deadline Extended' },
  { id: '2', action: 'User Login', user: 'Editor One', timestamp: '2025-01-10 12:15', details: 'Successful login from 192.168.1.1' },
  { id: '3', action: 'Content Created', user: 'Editor Two', timestamp: '2025-01-10 11:30', details: 'Created draft: Budget 2025 Analysis' },
  { id: '4', action: 'Event Updated', user: 'Admin User', timestamp: '2025-01-10 10:45', details: 'Updated event: National Tax Summit 2025' },
  { id: '5', action: 'Form Response', user: 'Guest User', timestamp: '2025-01-10 09:20', details: 'Submitted: Member Feedback Survey 2025' },
  { id: '6', action: 'User Created', user: 'Admin User', timestamp: '2025-01-09 16:30', details: 'Created new moderator: Moderator Two' },
  { id: '7', action: 'Content Unpublished', user: 'Moderator One', timestamp: '2025-01-09 14:10', details: 'Unpublished: Old Tax Guidelines' },
];

export interface Discussion {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'answered' | 'resolved';
  askedBy: string;
  askedAt: string;
  pendingDays: number;
}

export const mockDiscussions: Discussion[] = [
  { id: '1', title: 'Query on TDS deduction rates', category: 'TDS', status: 'pending', askedBy: 'Member #1234', askedAt: '2025-01-07', pendingDays: 3 },
  { id: '2', title: 'GST return filing clarification', category: 'GST', status: 'pending', askedBy: 'Member #5678', askedAt: '2025-01-06', pendingDays: 4 },
  { id: '3', title: 'Income tax exemption query', category: 'Income Tax', status: 'answered', askedBy: 'Member #9012', askedAt: '2025-01-09', pendingDays: 1 },
  { id: '4', title: 'Capital gains calculation', category: 'Capital Gains', status: 'resolved', askedBy: 'Member #3456', askedAt: '2025-01-05', pendingDays: 0 },
];
