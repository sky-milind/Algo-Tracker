import React from 'react'
import { useState } from 'react';
import { Shield, Users, TrendingUp, DollarSign } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';

const ManageSuperAdmin = () => {


    const [admins] = useState([
        { id: 1, name: 'Admin User 1', email: 'admin1@example.com', users: 45, status: 'active', created: '2024-01-15' },
        { id: 2, name: 'Admin User 2', email: 'admin2@example.com', users: 38, status: 'active', created: '2024-02-10' },
        { id: 3, name: 'Admin User 3', email: 'admin3@example.com', users: 52, status: 'inactive', created: '2024-01-20' },
        { id: 4, name: 'Admin User 4', email: 'admin4@example.com', users: 29, status: 'active', created: '2024-03-01' }
    ]);

    // Sample stats - replace with actual API calls
    const stats = [
        {
            title: 'Total Admins',
            value: '12',
            change: '+2 this month',
            trend: 'up',
            icon: Shield,
            color: 'blue'
        },
        {
            title: 'Active Admins',
            value: '10',
            change: '83.3%',
            trend: 'up',
            icon: Users,
            color: 'green'
        },
        {
            title: 'Total Users',
            value: '456',
            change: '+34 this week',
            trend: 'up',
            icon: Users,
            color: 'purple'
        },
        {
            title: 'System Revenue',
            value: '$123,456',
            change: '+18.2%',
            trend: 'up',
            icon: DollarSign,
            color: 'orange'
        }
    ];

    const recentActivities = [
        { id: 1, admin: 'Admin User 1', action: 'Created new user', time: '2 hours ago' },
        { id: 2, admin: 'Admin User 2', action: 'Updated trade settings', time: '4 hours ago' },
        { id: 3, admin: 'Admin User 3', action: 'Reviewed analytics', time: '6 hours ago' },
        { id: 4, admin: 'Admin User 1', action: 'Modified user permissions', time: '8 hours ago' }
    ];
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="p-2">
                    <h1 className="text-2xl font-bold">Manage Admins</h1>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Admin
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Admins List */}
                <Card title="Admin Accounts" className="lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{admin.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{admin.email}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{admin.users}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${admin.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {admin.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                            <button className="text-red-600 hover:text-red-800">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Recent Activities */}
                <Card title="Recent Activities" className="lg:col-span-1">
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="border-l-2 border-blue-500 pl-4 py-2">
                                <p className="text-sm font-medium text-gray-900">{activity.admin}</p>
                                <p className="text-sm text-gray-600">{activity.action}</p>
                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card title="Quick Actions">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Shield className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium">Manage Admins</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Users className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-sm font-medium">View All Users</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                        <p className="text-sm font-medium">Analytics</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
                        <p className="text-sm font-medium">Revenue Report</p>
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default ManageSuperAdmin
