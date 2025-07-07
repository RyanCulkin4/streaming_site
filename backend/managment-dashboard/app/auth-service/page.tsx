'use client';

import Layout from '../../components/Layout';

export default function AuthServicePage() {
  const stats = {
    status: 'Online',
    jwtExpiry: '15 minutes',
    refreshTokens: true,
    activeSessions: 1427,
    lastLogin: '2 minutes ago',
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Auth Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <p className="text-green-400 font-bold">{stats.status}</p>
            <p className="text-sm text-gray-400 mt-1">Last checked: just now</p>
          </div>

          {/* JWT Config */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">JWT Settings</h2>
            <p>Expiry Time: <span className="font-bold">{stats.jwtExpiry}</span></p>
            <p>Refresh Tokens: <span className="font-bold">{stats.refreshTokens ? 'Enabled' : 'Disabled'}</span></p>
          </div>

          {/* Active Sessions */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
            <p className="text-2xl font-bold">{stats.activeSessions.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Last login: {stats.lastLogin}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
