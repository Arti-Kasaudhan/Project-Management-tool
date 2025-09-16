import React from 'react';
import type { Task, Priority } from '../types';
import { ChatBubbleIcon, ChecklistIcon } from './icons';

interface TaskCardProps {
  task: Task;
  onSelect: () => void;
}

const priorityStyles: Record<Priority, string> = {
  low: 'border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400',
  medium: 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400',
  high: 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400',
};


const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect }) => {
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
  };
    
  return (
    <div
      onClick={onSelect}
      draggable
      onDragStart={handleDragStart}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow border-l-4 border-indigo-500"
    >
      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{task.title}</h3>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          {task.subtasks.length > 0 && (
            <span className="flex items-center">
              <ChecklistIcon className="h-4 w-4 mr-1" />
              {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
            </span>
          )}
          {task.comments.length > 0 && (
            <span className="flex items-center">
              <ChatBubbleIcon className="h-4 w-4 mr-1" />
              {task.comments.length}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
           <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          <img
            className="h-8 w-8 rounded-full"
            src={task.assignee.avatarUrl}
            alt={task.assignee.name}
            title={task.assignee.name}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;