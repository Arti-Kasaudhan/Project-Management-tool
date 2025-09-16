export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Subtask {
  text: string;
  completed: boolean;
}

export type Priority = 'low' | 'medium' | 'high';
export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  priority: Priority;
  assignee: User;
  comments: Comment[];
  subtasks: Subtask[];
}

export interface Column {
  id: ColumnId;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  columns: Column[];
  tasks: Task[];
}