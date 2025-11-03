import { PatientData, MetricReading } from './types';

const now = Date.now();
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

const generateHistoricalData = (
  days: number,
  pointsPerHour: number,
  baseValue: number,
  fluctuation: number,
  isBloodPressure = false
): MetricReading[] => {
  const data: MetricReading[] = [];
  const totalPoints = days * 24 * pointsPerHour;
  for (let i = 0; i < totalPoints; i++) {
    const timestamp = now - totalPoints * (oneHour / pointsPerHour) + i * (oneHour / pointsPerHour);
    if (isBloodPressure) {
      const systolic = Math.round(baseValue + (Math.random() - 0.5) * fluctuation);
      const diastolic = Math.round(systolic * 0.6 + (Math.random() - 0.5) * 10);
      data.push({ timestamp, value: { systolic, diastolic } });
    } else {
      const value = parseFloat((baseValue + (Math.random() - 0.5) * fluctuation).toFixed(1));
      data.push({ timestamp, value });
    }
  }
  return data;
};


export const MOCK_PATIENT_DATA: PatientData = {
  name: 'Jean Dupont',
  age: 72,
  condition: 'Diabète de type 2',
  currentMetrics: {
    glucose: 185, // mg/dL
    hydration: 55, // %
    pulse: 78, // bpm
    bloodPressure: { systolic: 135, diastolic: 85 }, // mmHg
    heartRate: 75, // bpm
  },
  historicalData: {
    glucose: generateHistoricalData(3, 1, 150, 60),
    hydration: generateHistoricalData(3, 1, 60, 10),
    pulse: generateHistoricalData(3, 4, 75, 10),
    bloodPressure: generateHistoricalData(3, 1, 130, 20, true),
    heartRate: generateHistoricalData(3, 4, 72, 8),
  },
  alerts: [
    {
      id: 'alert1',
      type: 'health',
      severity: 'high',
      message: 'Taux de glucose élevé détecté.',
      timestamp: now - 10 * 60 * 1000,
    },
    {
      id: 'alert-hypo',
      type: 'health',
      severity: 'high',
      message: 'Hypoglycémie possible. Taux de glucose bas.',
      timestamp: now - 2 * oneHour,
    },
    {
      id: 'alert2',
      type: 'health',
      severity: 'medium',
      message: 'Tension artérielle légèrement élevée.',
      timestamp: now - 5 * oneHour,
    },
     {
      id: 'alert-device-conn',
      type: 'device',
      severity: 'high',
      message: 'Connexion du dispositif perdue.',
      timestamp: now - 6 * oneHour,
    },
    {
      id: 'alert-hydra',
      type: 'health',
      severity: 'low',
      message: 'Rappel : Pensez à bien vous hydrater.',
      timestamp: now - 8 * oneHour,
    },
    {
      id: 'alert3',
      type: 'device',
      severity: 'low',
      message: 'Niveau de batterie faible (18%). Veuillez recharger.',
      timestamp: now - oneDay,
    },
  ],
  deviceStatus: {
    batteryLevel: 18,
    lastSync: now - 5 * 60 * 1000,
  },
};