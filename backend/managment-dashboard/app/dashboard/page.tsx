'use client';

import Layout from '../../components/Layout';

export default function DashboardPage() {
  const overview = {
    activeUsers: 4521,
    totalRequests: 98237,
    totalLogs: '18.4 MB',
    storageUsed: '822 GB',
    services: {
      api: 'Online',
      auth: 'Online',
      sql: 'Online',
      cache: 'Online',
      worker: 'Degraded',
      storage: 'Online',
      logging: 'Online'
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-400">Active Users</h2>
            <p className="text-2xl font-bold">{overview.activeUsers.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-400">Total Requests</h2>
            <p className="text-2xl font-bold">{overview.totalRequests.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-400">Storage Used</h2>
            <p className="text-2xl font-bold">{overview.storageUsed}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-400">Logs Collected</h2>
            <p className="text-2xl font-bold">{overview.totalLogs}</p>
          </div>
        </div>

        {/* Service status */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Service Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            {Object.entries(overview.services).map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between bg-gray-900 p-3 rounded border border-gray-700"
              >
                <span className="capitalize">{name.replace(/_/g, ' ')} Service</span>
                <span className={`font-bold ${status === 'Online' ? 'text-green-400' : status === 'Degraded' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
