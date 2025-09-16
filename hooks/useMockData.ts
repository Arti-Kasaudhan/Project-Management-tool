import type { Project, User, Task } from '../types';

const users: User[] = [
  { id: 'user-1', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'James Smith', avatarUrl: 'https://i.pravatar.cc/150?u=user-3' },
];

const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design homepage UX',
    description: 'Create wireframes and mockups for the new homepage design. Focus on user flow and conversion optimization.',
    status: 'todo',
    priority: 'high',
    assignee: users[0],
    comments: [
      { id: 'comment-1', user: users[1], text: 'Can you share the initial wireframes?', timestamp: '2023-10-26T10:00:00Z' },
    ],
    subtasks: [
      { text: 'Research competitor homepages', completed: true },
      { text: 'Sketch initial layout ideas', completed: false },
    ],
  },
  {
    id: 'task-2',
    title: 'Develop API for user authentication',
    description: 'Build and document the REST API endpoints for user registration, login, and password reset.',
    status: 'in-progress',
    priority: 'high',
    assignee: users[1],
    comments: [],
    subtasks: [
      { text: 'Setup database schema', completed: true },
      { text: 'Implement JWT token generation', completed: true },
      { text: 'Write endpoint tests', completed: false },
    ],
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure a continuous integration and deployment pipeline using GitHub Actions to automate testing and deployment.',
    status: 'in-progress',
    priority: 'medium',
    assignee: users[1],
    comments: [],
    subtasks: [],
  },
  {
    id: 'task-4',
    title: 'Deploy staging environment',
    description: 'Provision and configure the staging server environment on AWS.',
    status: 'done',
    priority: 'low',
    assignee: users[2],
    comments: [],
    subtasks: [],
  },
  {
    id: 'task-5',
    title: 'Create marketing copy for launch',
    description: 'Write compelling copy for the website, social media, and email campaigns for the product launch.',
    status: 'todo',
    priority: 'medium',
    assignee: users[0],
    comments: [],
    subtasks: [],
  },
];

const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Q4 Product Launch',
    columns: [
      { id: 'todo', title: 'To Do' },
      { id: 'in-progress', title: 'In Progress' },
      { id: 'done', title: 'Done' },
    ],
    tasks: tasks,
  },
];

export const useMockData = () => ({
  projects,
  users,
});