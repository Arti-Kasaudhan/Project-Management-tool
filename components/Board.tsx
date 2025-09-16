import React, { useState } from 'react';
import type { Project, Task, ColumnId, Priority } from '../types';
import Column from './Column';

interface BoardProps {
  project: Project;
  onTaskSelect: (task: Task) => void;
  onTaskMove: (taskId: string, newColumnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId) => void;
}

const priorityOrder: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};


const Board: React.FC<BoardProps> = ({ project, onTaskSelect, onTaskMove, onAddTask }) => {
  const [sortBy, setSortBy] = useState<'default' | 'priority'>('default');

  const getTasksForColumn = (columnId: ColumnId) => {
    const columnTasks = project.tasks.filter(task => task.status === columnId);

    if (sortBy === 'priority') {
      return columnTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    return columnTasks;
  };
  
  return (
    <div>
       <div className="mb-6 flex justify-end">
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'priority')}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="default">Default</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.columns.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={getTasksForColumn(column.id)}
            onTaskSelect={onTaskSelect}
            onTaskMove={onTaskMove}
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;