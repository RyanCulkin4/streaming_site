'use client';

import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';

// Lazy load the line chart
const WorkerChart = dynamic(() => import('@/components/WorkerChart'), { ssr: false });

export default function WorkerPage() {
  const stats = {
    status: 'Online',
    queued: 43,
    processing: 5,
    completed: 3021,
    failed: 12,
    avgTime: '38.2 sec'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Worker Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <p className="text-green-400 font-bold">{stats.status}</p>
            <p className="text-sm text-gray-400">Service is healthy</p>
          </div>

          {/* Job Overview */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Job Stats</h2>
            <ul className="space-y-1">
              <li>📦 Queued: <strong>{stats.queued}</strong></li>
              <li>⚙️ Processing: <strong>{stats.processing}</strong></li>
              <li>✅ Completed: <strong>{stats.completed}</strong></li>
              <li>❌ Failed: <strong className="text-red-400">{stats.failed}</strong></li>
            </ul>
          </div>

          {/* Average Time */}
          <div className="bg-gray-800 p-4 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Performance</h2>
            <p>Average Job Time: <span className="font-bold">{stats.avgTime}</span></p>
            <p className="text-sm text-gray-400 mt-1">Includes encoding, compression, and uploads</p>
          </div>
        </div>

        {/* Worker Line Chart */}
        <WorkerChart />
      </div>
    </Layout>
  );
}
