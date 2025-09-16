
import React from 'react';
import type { User } from '../types';
import { LogoIcon } from './icons';

interface HeaderProps {
  projectTitle: string;
  users: User[];
}

const Header: React.FC<HeaderProps> = ({ projectTitle, users }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <LogoIcon className="h-8 w-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{projectTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {users.map(user => (
            <img
              key={user.id}
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800"
              src={user.avatarUrl}
              alt={user.name}
              title={user.name}
            />
          ))}
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Share
        </button>
      </div>
    </header>
  );
};

export default Header;
