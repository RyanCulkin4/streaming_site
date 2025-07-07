'use client';

import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';

// Load chart dynamically
const CacheChart = dynamic(() => import('@/components/CacheChart'), { ssr: false });

export default function CachePage() {
  const stats = {
    status: 'Connected',
    memory: '73 MB',
    hits: 23912,
    misses: 182,
    keys: 1873,
    evicted: 32,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cache Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Status</h2>
            <p className="text-green-400 font-bold">{stats.status}</p>
            <p className="text-sm text-gray-400">Redis is active</p>
          </div>

          {/* Memory */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Memory Usage</h2>
            <p className="text-xl font-bold">{stats.memory}</p>
            <p className="text-sm text-gray-400">Includes keys and cache value data</p>
          </div>

          {/* Hit/Miss */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Hits vs Misses</h2>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li>✅ Hits: <strong>{stats.hits}</strong></li>
              <li>❌ Misses: <strong className="text-red-400">{stats.misses}</strong></li>
              <li>🎯 Hit Rate: <strong>{((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1)}%</strong></li>
            </ul>
          </div>

          {/* Keyspace */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Keyspace</h2>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li>Total Keys: <strong>{stats.keys}</strong></li>
              <li>Evicted Keys: <strong className="text-red-400">{stats.evicted}</strong></li>
            </ul>
          </div>
        </div>

        {/* Line chart */}
        <CacheChart />
      </div>
    </Layout>
  );
}
