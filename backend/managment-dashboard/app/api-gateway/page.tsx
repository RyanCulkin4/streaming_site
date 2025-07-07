'use client';

import Layout from '../../components/Layout';

export default function ApiGatewayPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">API Gateway</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Status</h2>
            <p className="text-green-400 font-bold mt-2">Online</p>
            <p className="text-sm text-gray-400">All systems operating normally.</p>
          </div>

          {/* Request Stats */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Request Stats</h2>
            <p className="text-xl font-bold mt-2">📈 24,392 today</p>
            <p className="text-sm text-gray-400">Avg: 1,016/hour</p>
          </div>

          {/* Auth Integration */}
          <div className="bg-gray-800 p-4 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold">Auth Service Integration</h2>
            <p className="mt-2 text-gray-300">
              Token validation via JWT. All requests are routed through `auth_service` for session check.
            </p>
            <p className="text-sm text-gray-500 mt-1">Last token refresh: 2 mins ago</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
