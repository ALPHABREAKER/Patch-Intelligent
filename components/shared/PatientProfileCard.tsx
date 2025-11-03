import React from 'react';
import { PatientData } from '../../types';
import { UserIcon } from '../icons/Icons';

interface PatientProfileCardProps {
  patient: Pick<PatientData, 'name' | 'age' | 'condition'>;
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ patient }) => (
  <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center space-x-6 mb-8 border border-slate-200 bg-gradient-to-r from-white to-cyan-50">
    <div className="flex-shrink-0">
      <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
        <UserIcon className="w-16 h-16 text-cyan-600" />
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold text-slate-800">{patient.name}</h2>
      <p className="text-slate-600 text-lg mt-1">{patient.age} ans · {patient.condition}</p>
    </div>
  </div>
);

export default PatientProfileCard;
