import React from 'react';
import { CurrentMetrics } from '../../types';
import MetricCard from './MetricCard';
import { GlucoseIcon, WaterIcon, PulseIcon, BloodPressureIcon, HeartRateIcon } from '../icons/Icons';

interface MetricGridProps {
  currentMetrics: CurrentMetrics;
}

const getGlucoseStatus = (value: number) => {
  if (value < 70) return 'high'; // Hypoglycemia is a high alert
  if (value > 180) return 'high';
  return 'normal';
};

const getHydrationStatus = (value: number) => {
  if (value < 50) return 'low';
  if (value < 60) return 'medium';
  return 'normal';
};

const MetricGrid: React.FC<MetricGridProps> = ({ currentMetrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MetricCard
        icon={<GlucoseIcon className="w-8 h-8"/>}
        label="Glucose"
        value={currentMetrics.glucose}
        unit="mg/dL"
        status={getGlucoseStatus(currentMetrics.glucose)}
      />
      <MetricCard
        icon={<WaterIcon className="w-8 h-8"/>}
        label="Hydratation"
        value={currentMetrics.hydration}
        unit="%"
        status={getHydrationStatus(currentMetrics.hydration)}
      />
       <MetricCard
        icon={<HeartRateIcon className="w-8 h-8"/>}
        label="Fréq. Cardiaque"
        value={currentMetrics.heartRate}
        unit="bpm"
        status="normal"
      />
      <MetricCard
        icon={<PulseIcon className="w-8 h-8"/>}
        label="Pulsation"
        value={currentMetrics.pulse}
        unit="bpm"
        status="normal"
      />
      <MetricCard
        icon={<BloodPressureIcon className="w-8 h-8"/>}
        label="Tension"
        value={`${currentMetrics.bloodPressure.systolic}/${currentMetrics.bloodPressure.diastolic}`}
        unit="mmHg"
        status={currentMetrics.bloodPressure.systolic > 140 ? 'high' : 'normal'}
      />
    </div>
  );
};

export default MetricGrid;