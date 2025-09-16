
import React from 'react';
import type { Column as ColumnType, Task, ColumnId } from '../types';
import TaskCard from './TaskCard';
import { PlusIcon } from './icons';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onTaskMove: (taskId: string, newColumnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onTaskSelect, onTaskMove, onAddTask }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onTaskMove(taskId, column.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 flex flex-col"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{column.title}</h2>
        <span className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1 text-sm font-bold">
          {tasks.length}
        </span>
      </div>
      <div className="flex-grow space-y-4 overflow-y-auto">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onSelect={() => onTaskSelect(task)} />
        ))}
      </div>
       <button 
        onClick={() => onAddTask(column.id)}
        className="mt-4 flex items-center justify-center w-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Task
      </button>
    </div>
  );
};

export default Column;
