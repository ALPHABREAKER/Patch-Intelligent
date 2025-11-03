import React from 'react';
import { PatientData } from '../types';
import Header from './shared/Header';
import MetricGrid from './shared/MetricGrid';
import ChartsGrid from './shared/ChartsGrid';
import AlertsPanel from './shared/AlertsPanel';
import DeviceStatusCard from './shared/DeviceStatusCard';
import PatientProfileCard from './shared/PatientProfileCard';

interface FamilyViewProps {
  patientData: PatientData;
  onBack: () => void;
}

const FamilyView: React.FC<FamilyViewProps> = ({ patientData, onBack }) => {
  return (
    <div>
      <Header
        title={`Suivi de ${patientData.name}`}
        onBack={onBack}
      />
      <main className="p-4 md:p-8">
        <PatientProfileCard patient={patientData} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Aperçu des paramètres</h2>
            <MetricGrid currentMetrics={patientData.currentMetrics} />
          </div>

          <div className="lg:col-span-2">
             <h2 className="text-2xl font-bold text-slate-700 mb-4">Historique des mesures</h2>
            <ChartsGrid historicalData={patientData.historicalData} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">État du dispositif</h2>
                <DeviceStatusCard deviceStatus={patientData.deviceStatus} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">Alertes et notifications</h2>
                <AlertsPanel alerts={patientData.alerts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FamilyView;