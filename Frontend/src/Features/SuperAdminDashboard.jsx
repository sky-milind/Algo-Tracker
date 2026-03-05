import { useState } from 'react';
import StatCard from '../components/StatCard';
import TradeTable from '../components/TradeTable';
import UserStatsCard from '../components/UserStatsCard';
import FilterBar from '../components/FilterBar';
import Card from '../components/Card';

const SuperAdminDashboard = () => {
  // Mock data - Replace with actual API calls
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    pair: 'all',
    search: ''
  });

  const stats = {
    totalTrades: 1247,
    totalProfit: 145230.50,
    activeUsers: 89,
    todayTrades: 34
  };

  const topUsers = [
    {
      id: 1,
      name: 'John Trader',
      email: 'john@example.com',
      totalTrades: 156,
      winRate: 72,
      balance: 125000,
      totalPL: 45230
    },
    {
      id: 2,
      name: 'Sarah Forex',
      email: 'sarah@example.com',
      totalTrades: 203,
      winRate: 68,
      balance: 98000,
      totalPL: 32100
    },
    {
      id: 3,
      name: 'Mike Trading',
      email: 'mike@example.com',
      totalTrades: 178,
      winRate: 65,
      balance: 87500,
      totalPL: 28450
    }
  ];

  const recentTrades = [
    {
      id: 'TRD-001',
      user: 'John Trader',
      pair: 'EUR/USD',
      type: 'BUY',
      entryPrice: 1.0850,
      exitPrice: 1.0920,
      profitLoss: 750.00,
      status: 'Closed',
      date: '2026-02-28 14:30'
    },
    {
      id: 'TRD-002',
      user: 'Sarah Forex',
      pair: 'GBP/USD',
      type: 'SELL',
      entryPrice: 1.2650,
      exitPrice: 1.2580,
      profitLoss: 650.00,
      status: 'Closed',
      date: '2026-02-28 13:15'
    },
    {
      id: 'TRD-003',
      user: 'Mike Trading',
      pair: 'USD/JPY',
      type: 'BUY',
      entryPrice: 150.25,
      exitPrice: null,
      profitLoss: 0,
      status: 'Open',
      date: '2026-02-28 12:45'
    },
    {
      id: 'TRD-004',
      user: 'John Trader',
      pair: 'AUD/USD',
      type: 'SELL',
      entryPrice: 0.6520,
      exitPrice: 0.6480,
      profitLoss: -420.00,
      status: 'Closed',
      date: '2026-02-28 11:20'
    },
    {
      id: 'TRD-005',
      user: 'Sarah Forex',
      pair: 'EUR/USD',
      type: 'BUY',
      entryPrice: 1.0830,
      exitPrice: null,
      profitLoss: 0,
      status: 'Pending',
      date: '2026-02-28 10:00'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Implement filtering logic here
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Superadmin Overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Trades"
            value={stats.totalTrades.toLocaleString()}
            change="+12% from last month"
            changeType="positive"
          />
          <StatCard
            title="Total Profit"
            value={`$${stats.totalProfit.toLocaleString()}`}
            change="+8.5% from last month"
            changeType="positive"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            change="+5 new this week"
            changeType="positive"
          />
          <StatCard
            title="Today's Trades"
            value={stats.todayTrades}
            change="Live Monitoring"
            changeType="neutral"
          />
          <StatCard
            title="Total Deposits"
            value={stats.totalDeposits || 0}
            change=""
            changeType="neutral"
          />
          <StatCard
            title="Total Withdrawals"
            value={stats.totalWithdrawals || 0}
            change=""
            changeType="neutral"
          />
          <StatCard
            title="Total Volume (Lot Sizes)"
            value={stats.totalVolume || 0}
            // change="Live Monitoring"
            changeType="neutral"
          />
          <StatCard
            title="Total Commissions"
            value={stats.todayTrades}
            // change="Live Monitoring"
            changeType="neutral"
          />
        </div>

        {/* Top Traders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Traders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topUsers.map((user) => (
              <UserStatsCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Recent Trades Table */}
        <TradeTable trades={recentTrades} title="Recent Trading Activity" />

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card title="Market Summary" subtitle="Current trading pairs overview">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">EUR/USD</p>
                  <p className="text-sm text-gray-600">Most Traded</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">1.0865</p>
                  <p className="text-sm text-green-600">+0.12%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">GBP/USD</p>
                  <p className="text-sm text-gray-600">High Volume</p>
                </div>
                <div className="text-right">  
                  <p className="font-bold text-gray-900">1.2615</p>
                  <p className="text-sm text-red-600">-0.08%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">USD/JPY</p>
                  <p className="text-sm text-gray-600">Trending</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">150.35</p>
                  <p className="text-sm text-green-600">+0.25%</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Quick Actions" subtitle="Manage your trading platform">
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-left flex items-center justify-between">
                <span>View All Users</span>
                <span>→</span>
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors text-left flex items-center justify-between">
                <span>Manage Trades</span>
                <span>→</span>
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors text-left flex items-center justify-between">
                <span>Generate Reports</span>
                <span>→</span>
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors text-left flex items-center justify-between">
                <span>System Settings</span>
                <span>→</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
