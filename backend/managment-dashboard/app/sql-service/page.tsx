'use client';

import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';

// Load the chart without SSR
const SqlLineChart = dynamic(() => import('@/components/sqlLineChart'), { ssr: false });

export default function SQLServicePage() {
  const stats = {
    status: 'Online',
    dbName: 'sql_web_server',
    totalSize: '2.3 GB',
    activeConnections: 21,
    maxConnections: 100,
    uptime: '3 days, 14 hours',
    avgQueryTime: '12.7 ms',
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">SQL Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <p className="text-green-400 font-bold">{stats.status}</p>
            <p className="text-sm text-gray-400">Database: <span className="font-mono">{stats.dbName}</span></p>
          </div>

          {/* Storage */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Storage Usage</h2>
            <p className="text-xl font-bold">{stats.totalSize}</p>
            <p className="text-sm text-gray-400">Total across all tables</p>
          </div>

          {/* Connections */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Connections</h2>
            <p>{stats.activeConnections} / {stats.maxConnections} active</p>
            <p className="text-sm text-gray-400">Uptime: {stats.uptime}</p>
          </div>

          {/* Query Time */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Performance</h2>
            <p>Average Query Time: <span className="font-bold">{stats.avgQueryTime}</span></p>
            <p className="text-sm text-gray-400">Powered by Prisma / PostgreSQL</p>
          </div>
        </div>

        {/* Line Chart Section */}
        <SqlLineChart />
      </div>
    </Layout>
  );
}
