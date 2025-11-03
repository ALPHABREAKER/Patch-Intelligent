import React from 'react';
import { PatientData } from '../types';
import Header from './shared/Header';
import MetricGrid from './shared/MetricGrid';
import ChartsGrid from './shared/ChartsGrid';
import AlertsPanel from './shared/AlertsPanel';
import PatientProfileCard from './shared/PatientProfileCard';

interface PatientViewProps {
  patientData: PatientData;
  onBack: () => void;
}

const PatientView: React.FC<PatientViewProps> = ({ patientData, onBack }) => {
  return (
    <div>
      <Header
        title={`Bonjour, ${patientData.name.split(' ')[0]}`}
        onBack={onBack}
      />
      <main className="p-4 md:p-8">
        <PatientProfileCard patient={patientData} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
             <h2 className="text-2xl font-bold text-slate-700 mb-4">Aperçu en temps réel</h2>
            <MetricGrid currentMetrics={patientData.currentMetrics} />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Historique des mesures</h2>
            <ChartsGrid historicalData={patientData.historicalData} />
          </div>

          <div className="lg:col-span-1">
             <h2 className="text-2xl font-bold text-slate-700 mb-4">Alertes et notifications</h2>
            <AlertsPanel alerts={patientData.alerts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientView;
