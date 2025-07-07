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
  { hour: '01:00', jobs: 42 },
  { hour: '02:00', jobs: 51 },
  { hour: '03:00', jobs: 37 },
  { hour: '04:00', jobs: 60 },
  { hour: '05:00', jobs: 48 }
];

export default function WorkerChart() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Jobs Processed (per hour)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="jobs" stroke="#00BFFF" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
