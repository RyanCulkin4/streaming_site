'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const sampleData = {
  qps: [
    { time: '00:00', value: 120 },
    { time: '01:00', value: 98 },
    { time: '02:00', value: 150 },
    { time: '03:00', value: 130 },
    { time: '04:00', value: 170 }
  ],
  latency: [
    { time: '00:00', value: 20 },
    { time: '01:00', value: 25 },
    { time: '02:00', value: 15 },
    { time: '03:00', value: 30 },
    { time: '04:00', value: 22 }
  ]
};

export default function SqlLineChart() {
  const [selected, setSelected] = useState<'qps' | 'latency'>('qps');

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {selected === 'qps' ? 'Queries Per Second' : 'Request Latency (ms)'}
        </h2>
        <select
          className="bg-gray-700 text-white p-2 rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value as 'qps' | 'latency')}
        >
          <option value="qps">Queries/sec</option>
          <option value="latency">Latency</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData[selected]}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00BFFF"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
