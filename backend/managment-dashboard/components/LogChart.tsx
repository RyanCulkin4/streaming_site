'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { time: '00:00', api: 22, auth: 15, worker: 32 },
  { time: '01:00', api: 28, auth: 18, worker: 29 },
  { time: '02:00', api: 35, auth: 21, worker: 25 },
  { time: '03:00', api: 30, auth: 19, worker: 27 },
  { time: '04:00', api: 33, auth: 23, worker: 30 }
];

export default function LogChart() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Log Entries Per Hour</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="api" stroke="#00BFFF" strokeWidth={2} />
          <Line type="monotone" dataKey="auth" stroke="#FFD700" strokeWidth={2} />
          <Line type="monotone" dataKey="worker" stroke="#FF6347" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
