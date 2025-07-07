'use client';

import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';

// Dynamically load the chart component (avoids SSR issues with recharts)
const PieChart = dynamic(() => import('../../components/PieChart'), { ssr: false });

export default function StoragePage() {
  const storageData = {
    total: 1000, // in GB
    categories: {
      'Movies': 400,
      'Anime': 250,
      'User Data': 100,
      'User Generated Content': 120,
      'Other': 50,
      'Free' : 80 // This will be calculated as total - sum of categories
    },
    dailyChange: 3.6 // in GB (could be negative too)
  };

  const pieChartData = Object.entries(storageData.categories).map(([label, value]) => ({
    name: label,
    value
  }));

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Storage Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Panel */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Storage Usage</h2>
          <PieChart data={pieChartData} />
        </div>

        {/* Summary Info Panel */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Storage</h2>
            <p className="text-2xl font-bold">{storageData.total} GB</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-4">Net Change (Last 24h)</h2>
            <p className={`text-xl font-bold ${storageData.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {storageData.dailyChange >= 0 ? '+' : ''}
              {storageData.dailyChange} GB
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
