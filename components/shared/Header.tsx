
import React from 'react';
import { ArrowLeftIcon, HeartIcon } from '../icons/Icons';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-cyan-500 mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Changer de vue
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
