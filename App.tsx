import React, { useState, useEffect } from 'react';
import { ViewMode, PatientData } from './types';
import ModeSelector from './components/ModeSelector';
import PatientView from './components/PatientView';
import FamilyView from './components/FamilyView';
import { MOCK_PATIENT_DATA } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode | null>(null);
  const [patientData, setPatientData] = useState<PatientData>(MOCK_PATIENT_DATA);

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      setPatientData(prevData => {
        const { glucose, hydration, pulse, bloodPressure } = prevData.currentMetrics;
        
        // Simulate Heart Rate based on glucose and hydration
        let newHeartRate = 75;
        if (glucose > 180) newHeartRate += 5;
        if (hydration < 55) newHeartRate += 3;
        newHeartRate += Math.floor(Math.random() * 5) - 2;

        // Simulate Hydration fluctuation
        let newHydration = hydration + (Math.random() * 2 - 1.2);
        newHydration = parseFloat(Math.max(45, Math.min(75, newHydration)).toFixed(1));

        // Simulate Glucose fluctuation
        let newGlucose = glucose + (Math.random() * 8 - 4);
        newGlucose = Math.round(Math.max(60, Math.min(250, newGlucose)));

        // Simulate Pulse fluctuation
        let newPulse = pulse + (Math.random() * 4 - 2);
        newPulse = Math.round(Math.max(60, Math.min(100, newPulse)));

        // Simulate Blood Pressure fluctuation
        let newSystolic = bloodPressure.systolic + (Math.random() * 6 - 3);
        let newDiastolic = bloodPressure.diastolic + (Math.random() * 4 - 2);

        return {
          ...prevData,
          currentMetrics: {
            ...prevData.currentMetrics,
            heartRate: newHeartRate,
            hydration: newHydration,
            glucose: newGlucose,
            pulse: newPulse,
            bloodPressure: {
              systolic: Math.round(newSystolic),
              diastolic: Math.round(newDiastolic),
            }
          },
          deviceStatus: {
            ...prevData.deviceStatus,
            lastSync: Date.now(),
          }
        };
      });
    }, 4000); // Update every 4 seconds to de-synchronize from alert animations

    return () => clearInterval(simulationInterval);
  }, []);


  const renderContent = () => {
    switch (viewMode) {
      case ViewMode.PATIENT:
        return <PatientView patientData={patientData} onBack={() => setViewMode(null)} />;
      case ViewMode.FAMILY:
        return <FamilyView patientData={patientData} onBack={() => setViewMode(null)} />;
      default:
        return <ModeSelector onSelectMode={setViewMode} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 antialiased">
      {renderContent()}
    </div>
  );
};

export default App;