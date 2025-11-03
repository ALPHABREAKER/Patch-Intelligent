import React, { useState, useEffect, useMemo } from 'react';
import { Alert, AlertSeverity } from '../../types';
import { BellIcon, ExclamationTriangleIcon, InformationCircleIcon } from '../icons/Icons';

interface AlertsPanelProps {
  alerts: Alert[];
}

const severityConfig: Record<AlertSeverity, { icon: React.ReactNode, color: string }> = {
  high: { icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />, color: 'border-l-4 border-red-500' },
  medium: { icon: <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />, color: 'border-l-4 border-orange-500' },
  low: { icon: <InformationCircleIcon className="w-6 h-6 text-yellow-500" />, color: 'border-l-4 border-yellow-500' },
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const config = severityConfig[alert.severity];
  return (
    <div 
      className={`p-4 bg-slate-50 rounded-lg flex items-start space-x-4 ${config.color} animate-slide-in-fade-in`}
    >
      <div>{config.icon}</div>
      <div>
        <p className="font-semibold text-slate-800">{alert.message}</p>
        <p className="text-sm text-slate-500">
          {new Date(alert.timestamp).toLocaleString('fr-FR')}
        </p>
      </div>
    </div>
  );
};


const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const [displayedAlerts, setDisplayedAlerts] = useState<Alert[]>([]);
  const alertQueue = useMemo(() => [...alerts].sort((a, b) => b.timestamp - a.timestamp), [alerts]);

  useEffect(() => {
    setDisplayedAlerts([]); // Start with an empty list

    const interval = setInterval(() => {
      setDisplayedAlerts(prev => {
        // If there are more alerts in the queue to show
        if (prev.length < alertQueue.length) {
          // Add the next alert from the queue by taking a slice of the full queue
          return alertQueue.slice(0, prev.length + 1);
        }
        // Once all alerts are shown, stop the interval
        clearInterval(interval);
        return prev;
      });
    }, 3000); // Add a new alert "tres doucement" (every 3 seconds)

    // Cleanup interval on component unmount or when the alert list changes
    return () => clearInterval(interval);
  }, [alertQueue]);


  if (displayedAlerts.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md h-full flex items-center justify-center">
        <div className="text-center py-8">
            <BellIcon className="w-12 h-12 mx-auto text-slate-300" />
            <p className="mt-4 text-slate-500">Aucune alerte pour le moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="space-y-3">
        {displayedAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;