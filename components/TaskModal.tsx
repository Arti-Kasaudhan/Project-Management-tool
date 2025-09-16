import React, { useState } from 'react';
import type { Task, Subtask, Priority } from '../types';
import { generateSubtasks } from '../services/geminiService';
import { SpinnerIcon, SparklesIcon, XMarkIcon, PaperAirplaneIcon, ChecklistIcon } from './icons';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onCommentAdd: (taskId: string, commentText: string) => void;
  onSubtasksUpdate: (taskId: string, subtasks: Subtask[]) => void;
  onTaskUpdate: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onCommentAdd, onSubtasksUpdate, onTaskUpdate }) => {
  const [newComment, setNewComment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onCommentAdd(task.id, newComment.trim());
      setNewComment('');
    }
  };

  const handleGenerateSubtasks = async () => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const generated = await generateSubtasks(task.title, task.description);
      const newSubtasks: Subtask[] = generated.map(text => ({ text, completed: false }));
      onSubtasksUpdate(task.id, [...task.subtasks, ...newSubtasks]);
    } catch (error) {
      console.error('Error generating subtasks:', error);
      setAiError('Failed to generate subtasks. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const toggleSubtask = (index: number) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    onTaskUpdate({ ...task, subtasks: updatedSubtasks });
  };
  
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as Priority;
    onTaskUpdate({ ...task, priority: newPriority });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>

              {/* Subtasks Section */}
              <div className="mt-6">
                 <div className="flex items-center mb-3">
                  <ChecklistIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Sub-tasks</h3>
                 </div>
                <div className="space-y-2">
                    {task.subtasks.map((subtask, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => toggleSubtask(index)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className={`ml-3 text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                {subtask.text}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                  onClick={handleGenerateSubtasks}
                  disabled={isGenerating}
                  className="mt-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <SparklesIcon className="h-5 w-5 mr-2" />
                  )}
                  {isGenerating ? 'Generating...' : 'Generate Sub-tasks with AI'}
                </button>
                {aiError && <p className="text-red-500 text-sm mt-2">{aiError}</p>}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3 md:col-span-1 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Assignee</h4>
                <div className="flex items-center mt-2">
                  <img src={task.assignee.avatarUrl} alt={task.assignee.name} className="h-8 w-8 rounded-full mr-2" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{task.assignee.name}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Status</h4>
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 capitalize">
                  {task.status.replace('-', ' ')}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Priority</h4>
                 <select
                    value={task.priority}
                    onChange={handlePriorityChange}
                    className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white capitalize"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-6 border-t dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Comments</h3>
            <div className="space-y-4">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <img src={comment.user.avatarUrl} alt={comment.user.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">{comment.user.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">{new Date(comment.timestamp).toLocaleString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Comment Form */}
        <div className="p-4 border-t dark:border-gray-700 flex-shrink-0">
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;