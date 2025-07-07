'use client';

import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';

// Lazy load the chart
const LogChart = dynamic(() => import('../../components/LogChart'), { ssr: false });

export default function LoggingPage() {
  const stats = {
    status: 'Online',
    grafana: 'Online',
    totalLogs: '18.2 MB',
    sources: ['API Gateway', 'Auth Service', 'Worker', 'SQL Service'],
  };

  const mockLogs = [
    '[INFO] API Gateway started on port 4000',
    '[INFO] Auth Token verified for user: 3b12d...',
    '[ERROR] Worker failed encoding job #1438',
    '[WARN] SQL query took 205ms (long)',
    '[INFO] Redis cache hit: /api/data'
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Logging Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Service Status</h2>
            <ul className="text-sm mt-2 space-y-1 text-gray-300">
              <li>Loki: <span className="text-green-400 font-bold">{stats.status}</span></li>
              <li>Grafana: <span className="text-green-400 font-bold">{stats.grafana}</span></li>
              <li>Total Log Volume: <strong>{stats.totalLogs}</strong></li>
            </ul>
          </div>

          {/* Log Sources */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Log Sources</h2>
            <ul className="text-sm mt-2 text-gray-300 list-disc list-inside">
              {stats.sources.map((src) => (
                <li key={src}>{src}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mock Tail */}
        <div className="bg-gray-900 border border-gray-700 rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Live Log Tail (Simulated)</h2>
          <div className="font-mono text-sm space-y-1 text-gray-300">
            {mockLogs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>

        <LogChart />
      </div>
    </Layout>
  );
}
