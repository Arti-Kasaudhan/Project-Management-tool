
import React, { useState, useCallback } from 'react';
import type { Project, Task, Comment, User, ColumnId } from './types';
import { useMockData } from './hooks/useMockData';
import Header from './components/Header';
import Board from './components/Board';
import TaskModal from './components/TaskModal';

const App: React.FC = () => {
  const { projects: initialProjects, users: initialUsers } = useMockData();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [users] = useState<User[]>(initialUsers);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const currentUser = users[0];

  const handleTaskSelect = (task: Task | null) => {
    setSelectedTask(task);
  };

  const updateTaskState = useCallback((updatedTask: Task) => {
    setActiveProject(prevProject => {
      const newTasks = prevProject.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      return { ...prevProject, tasks: newTasks };
    });
  }, []);


  const handleTaskUpdate = useCallback((updatedTask: Task) => {
    updateTaskState(updatedTask);
  },[updateTaskState]);


  const handleCommentAdd = useCallback((taskId: string, commentText: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    const taskToUpdate = activeProject.tasks.find(t => t.id === taskId);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        comments: [...taskToUpdate.comments, newComment],
      };
      updateTaskState(updatedTask);
      if (selectedTask?.id === taskId) {
        setSelectedTask(updatedTask);
      }
    }
  }, [activeProject.tasks, currentUser, selectedTask, updateTaskState]);

  const handleSubtasksUpdate = useCallback((taskId: string, subtasks: { text: string; completed: boolean }[]) => {
      const taskToUpdate = activeProject.tasks.find(t => t.id === taskId);
      if (taskToUpdate) {
          const updatedTask = { ...taskToUpdate, subtasks };
          updateTaskState(updatedTask);
          if (selectedTask?.id === taskId) {
              setSelectedTask(updatedTask);
          }
      }
  }, [activeProject.tasks, selectedTask, updateTaskState]);
  
  const handleTaskMove = (taskId: string, newColumnId: ColumnId) => {
    const taskToUpdate = activeProject.tasks.find(t => t.id === taskId);
    if(taskToUpdate) {
        const updatedTask = {...taskToUpdate, status: newColumnId};
        updateTaskState(updatedTask);
    }
  };
  
  const handleAddTask = (columnId: ColumnId) => {
      const newTaskTitle = window.prompt("Enter new task title:");
      if (newTaskTitle) {
          const newTask: Task = {
              id: `task-${Date.now()}`,
              title: newTaskTitle,
              description: "Newly added task.",
              status: columnId,
              // FIX: Added default priority for new tasks to satisfy the Task type.
              priority: 'medium',
              assignee: users[Math.floor(Math.random() * users.length)],
              comments: [],
              subtasks: [],
          };

          setActiveProject(prevProject => ({
              ...prevProject,
              tasks: [...prevProject.tasks, newTask]
          }));
      }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      <Header projectTitle={activeProject.name} users={users} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Board
          project={activeProject}
          onTaskSelect={handleTaskSelect}
          onTaskMove={handleTaskMove}
          onAddTask={handleAddTask}
        />
      </main>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => handleTaskSelect(null)}
          onCommentAdd={handleCommentAdd}
          onSubtasksUpdate={handleSubtasksUpdate}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default App;