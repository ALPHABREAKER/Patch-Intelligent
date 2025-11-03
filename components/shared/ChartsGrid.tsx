
import React from 'react';
import { HistoricalData } from '../../types';
import HealthChart from './HealthChart';

interface ChartsGridProps {
  historicalData: HistoricalData;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({ historicalData }) => {
  return (
    <div className="space-y-6">
      <HealthChart
        title="Glucose (3 derniers jours)"
        data={historicalData.glucose}
        dataKey="value"
        unit="mg/dL"
        color="#ef4444"
      />
      <HealthChart
        title="Fréquence Cardiaque (3 derniers jours)"
        data={historicalData.heartRate}
        dataKey="value"
        unit="bpm"
        color="#3b82f6"
      />
       <HealthChart
        title="Tension Artérielle (3 derniers jours)"
        data={historicalData.bloodPressure}
        dataKey="value"
        unit="mmHg"
        color="#8b5cf6"
        isBloodPressure={true}
      />
    </div>
  );
};

export default React.memo(ChartsGrid);