import React from 'react';

type Status = 'normal' | 'low' | 'high' | 'medium';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  status: Status;
}

const statusColors: Record<Status, { bg: string, text: string, icon: string, border: string }> = {
  normal: { bg: 'from-green-50 to-white', text: 'text-green-800', icon: 'text-green-500', border: 'border-green-200' },
  low: { bg: 'from-yellow-50 to-white', text: 'text-yellow-800', icon: 'text-yellow-500', border: 'border-yellow-200' },
  medium: { bg: 'from-orange-50 to-white', text: 'text-orange-800', icon: 'text-orange-500', border: 'border-orange-200' },
  high: { bg: 'from-red-50 to-white', text: 'text-red-800', icon: 'text-red-500', border: 'border-red-200' },
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, unit, status }) => {
  const colors = statusColors[status] || statusColors.normal;

  return (
    <div className={`p-4 rounded-2xl shadow-lg border ${colors.border} bg-gradient-to-br ${colors.bg} flex flex-col justify-between transition-transform transform hover:scale-105`}>
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-bold ${colors.text}`}>{label}</h3>
        <div className={colors.icon}>{icon}</div>
      </div>
      <div>
        <p className={`text-4xl font-black tracking-tight ${colors.text}`}>{value}</p>
        <p className={`text-sm ${colors.text}`}>{unit}</p>
      </div>
    </div>
  );
};

export default MetricCard;
