
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricReading } from '../../types';

interface HealthChartProps {
  title: string;
  data: MetricReading[];
  dataKey: string;
  unit: string;
  color: string;
  isBloodPressure?: boolean;
}

const HealthChart: React.FC<HealthChartProps> = ({ title, data, unit, color, isBloodPressure = false }) => {
    
  const formatXAxis = (tickItem: number) => {
    return new Date(tickItem).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="label">{`${date}`}</p>
          {isBloodPressure ? (
            <>
              <p style={{ color: '#8884d8' }}>{`Systolique : ${payload[0].value} ${unit}`}</p>
              <p style={{ color: '#82ca9d' }}>{`Diastolique : ${payload[1].value} ${unit}`}</p>
            </>
          ) : (
            <p style={{ color }}>{`${payload[0].name} : ${payload[0].value} ${unit}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const processedData = data.map(d => ({
    ...d,
    systolic: isBloodPressure && typeof d.value === 'object' ? d.value.systolic : undefined,
    diastolic: isBloodPressure && typeof d.value === 'object' ? d.value.diastolic : undefined,
  }))

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
       <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis} 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#64748b" tick={{ fontSize: 12 }} unit={unit}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {isBloodPressure ? (
            <>
              <Line type="monotone" dataKey="systolic" name="Systolique" stroke="#8884d8" dot={false} strokeWidth={2}/>
              <Line type="monotone" dataKey="diastolic" name="Diastolique" stroke="#82ca9d" dot={false} strokeWidth={2}/>
            </>
          ) : (
            <Line type="monotone" dataKey="value" name={title.split(' ')[0]} stroke={color} dot={false} strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(HealthChart);