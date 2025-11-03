
import React from 'react';
import { DeviceStatus } from '../../types';
import { BatteryIcon, WifiIcon } from '../icons/Icons';

interface DeviceStatusCardProps {
  deviceStatus: DeviceStatus;
}

const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ deviceStatus }) => {
  const getBatteryColor = (level: number) => {
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-yellow-500';
    return 'text-green-500';
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <div className="flex items-center">
            <BatteryIcon className={`w-6 h-6 mr-3 ${getBatteryColor(deviceStatus.batteryLevel)}`} />
            <div>
                <p className="font-semibold text-slate-700">Niveau de batterie</p>
                <p className={`text-lg font-bold ${getBatteryColor(deviceStatus.batteryLevel)}`}>{deviceStatus.batteryLevel}%</p>
            </div>
        </div>
         <div className="flex items-center">
            <WifiIcon className="w-6 h-6 mr-3 text-cyan-500" />
            <div>
                <p className="font-semibold text-slate-700">Dernière synchronisation</p>
                <p className="text-sm text-slate-500">{new Date(deviceStatus.lastSync).toLocaleTimeString('fr-FR')}</p>
            </div>
        </div>
    </div>
  );
};

export default DeviceStatusCard;
