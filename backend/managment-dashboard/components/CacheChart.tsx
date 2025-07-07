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
  { time: '00:00', hits: 320, misses: 12 },
  { time: '01:00', hits: 410, misses: 8 },
  { time: '02:00', hits: 360, misses: 15 },
  { time: '03:00', hits: 430, misses: 9 },
  { time: '04:00', hits: 398, misses: 10 }
];

export default function CacheChart() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Hits vs Misses Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hits" stroke="#00FF99" strokeWidth={2} />
          <Line type="monotone" dataKey="misses" stroke="#FF5555" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
