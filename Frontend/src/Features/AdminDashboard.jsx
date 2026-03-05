import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import UserStatsCard from '../components/UserStatsCard';
import TradeTable from '../components/TradeTable';
import FilterBar from '../components/FilterBar';
import Card from '../components/Card';

const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'week',
    status: 'all',
  });

  // Sample data - replace with actual API calls
  const stats = [
    {
      title: 'Total Trades',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Total Profit',
      value: '$45,678',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+5.4%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: "Today's Trades",
      value: '23',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const topUsers = [
    { id: 1, name: 'John Doe', trades: 150, profit: '$12,345', status: 'active' },
    { id: 2, name: 'Jane Smith', trades: 142, profit: '$11,890', status: 'active' },
    { id: 3, name: 'Mike Wilson', trades: 138, profit: '$10,567', status: 'active' }
  ];

  const recentTrades = [
    { id: 1, user: 'John Doe', pair: 'EUR/USD', type: 'Buy', amount: '$1,000', profit: '+$125', status: 'completed' },
    { id: 2, user: 'Jane Smith', pair: 'GBP/USD', type: 'Sell', amount: '$2,500', profit: '+$340', status: 'completed' },
    { id: 3, user: 'Mike Wilson', pair: 'USD/JPY', type: 'Buy', amount: '$1,800', profit: '-$45', status: 'completed' },
    { id: 4, user: 'Sarah Johnson', pair: 'AUD/USD', type: 'Sell', amount: '$950', profit: '+$89', status: 'pending' },
    { id: 5, user: 'Tom Brown', pair: 'EUR/GBP', type: 'Buy', amount: '$3,200', profit: '+$420', status: 'completed' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users, trades, and analytics</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div>
        {/* Top Users */}
        <Card title="Top Performing Users">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUsers.map((user) => (
              <div key={user.id}>
                <UserStatsCard user={user} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Win Rate">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-green-600">68.5%</div>
            <p className="text-gray-600 mt-2">Overall Success Rate</p>
          </div>
        </Card>
        <Card title="Average Trade">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-blue-600">$1,847</div>
            <p className="text-gray-600 mt-2">Per Transaction</p>
          </div>
        </Card>
        <Card title="Total Volume">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-purple-600">$2.3M</div>
            <p className="text-gray-600 mt-2">This Month</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
