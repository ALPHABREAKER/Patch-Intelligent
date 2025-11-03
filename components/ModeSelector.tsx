import React from 'react';
import { ViewMode } from '../types';
import { UserIcon, HomeIcon, HeartIcon } from './icons/Icons';

interface ModeSelectorProps {
  onSelectMode: (mode: ViewMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-white via-sky-50 to-cyan-100">
      <div className="text-center mb-12">
        <HeartIcon className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Bienvenue sur VitalPatch
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Votre moniteur de santé personnel. Sélectionnez votre mode de visualisation pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <ModeCard
          icon={<UserIcon className="w-12 h-12 mb-4 text-cyan-500" />}
          title="Vue Patient"
          description="Accédez à vos données de santé en temps réel, consultez votre historique et gérez vos alertes."
          onClick={() => onSelectMode(ViewMode.PATIENT)}
        />
        <ModeCard
          icon={<HomeIcon className="w-12 h-12 mb-4 text-cyan-500" />}
          title="Vue Membre de la Famille"
          description="Suivez les paramètres de santé d'un proche, recevez des alertes et consultez l'état du dispositif."
          onClick={() => onSelectMode(ViewMode.FAMILY)}
        />
      </div>
    </div>
  );
};

interface ModeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-left flex flex-col items-start border border-slate-200"
  >
    {icon}
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-600 flex-grow">{description}</p>
    <span className="mt-6 text-cyan-600 font-semibold hover:text-cyan-700">
      Continuer &rarr;
    </span>
  </button>
);


export default ModeSelector;