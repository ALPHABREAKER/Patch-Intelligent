
export enum ViewMode {
  PATIENT = 'PATIENT',
  FAMILY = 'FAMILY',
}

export interface MetricReading {
  timestamp: number;
  value: number | { systolic: number; diastolic: number };
}

export interface CurrentMetrics {
  glucose: number;
  hydration: number;
  pulse: number;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
}

export interface HistoricalData {
  glucose: MetricReading[];
  hydration: MetricReading[];
  pulse: MetricReading[];
  bloodPressure: MetricReading[];
  heartRate: MetricReading[];
}

export type AlertSeverity = 'low' | 'medium' | 'high';

export interface Alert {
  id: string;
  type: 'health' | 'device';
  severity: AlertSeverity;
  message: string;
  timestamp: number;
}

export interface DeviceStatus {
  batteryLevel: number;
  lastSync: number;
}

export interface PatientData {
  name: string;
  age: number;
  condition: string;
  currentMetrics: CurrentMetrics;
  historicalData: HistoricalData;
  alerts: Alert[];
  deviceStatus: DeviceStatus;
}
