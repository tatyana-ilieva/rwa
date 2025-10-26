'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, UserCheck, UserX, Mail, Shield, TrendingUp, AlertCircle } from 'lucide-react'

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const users = [
    {
      id: 1,
      address: 'GDEM...BTLM3Y',
      fullAddress: 'GDEM2VJKPEGKGSPMNWFZQ4QQHU5JS43JENZAZC2O2R7BA5W7G5BTLM3Y',
      status: 'verified',
      tier: 'Senior',
      investment: '$45,000',
      yield: '+$3,825',
      joinedDate: '2024-01-15',
      riskScore: 85
    },
    {
      id: 2,
      address: 'GABC...XYZ123',
      fullAddress: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRS',
      status: 'verified',
      tier: 'Junior',
      investment: '$22,500',
      yield: '+$3,420',
      joinedDate: '2024-02-20',
      riskScore: 72
    },
    {
      id: 3,
      address: 'GXYZ...ABC789',
      fullAddress: 'GXYZ9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFG',
      status: 'pending',
      tier: 'Senior',
      investment: '$12,000',
      yield: '+$1,020',
      joinedDate: '2024-03-10',
      riskScore: 91
    },
    {
      id: 4,
      address: 'GSTU...DEF456',
      fullAddress: 'GSTUV456789ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHI',
      status: 'verified',
      tier: 'Junior',
      investment: '$67,000',
      yield: '+$10,184',
      joinedDate: '2024-01-05',
      riskScore: 68
    },
    {
      id: 5,
      address: 'GQRS...GHI012',
      fullAddress: 'GQRS012345ABCDEFGHIJKLMNOPQRSTUVWXYZ6789ABCDEFGHIJKLMNO',
      status: 'suspended',
      tier: 'Senior',
      investment: '$8,500',
      yield: '+$722',
      joinedDate: '2024-02-28',
      riskScore: 45
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = [
    {
      label: 'Total Users',
      value: '2,140',
      change: '+12.5%',
      positive: true,
      icon: UserCheck
    },
    {
      label: 'Verified',
      value: '1,856',
      change: '+8.3%',
      positive: true,
      icon: Shield
    },
    {
      label: 'Pending',
      value: '142',
      change: '+5.2%',
      positive: true,
      icon: AlertCircle
    },
    {
      label: 'Total Invested',
      value: '$43.2M',
      change: '+15.7%',
      positive: true,
      icon: TrendingUp
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-blue-400" />
              <span className={`text-sm font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 md:flex-initial px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>

            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Download className="w-5 h-5" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-effect rounded-2xl p-6 overflow-x-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-6">User Directory</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 py-3 px-4">User</th>
              <th className="text-left text-gray-400 py-3 px-4">Status</th>
              <th className="text-left text-gray-400 py-3 px-4">Tier</th>
              <th className="text-left text-gray-400 py-3 px-4">Investment</th>
              <th className="text-left text-gray-400 py-3 px-4">Yield</th>
              <th className="text-left text-gray-400 py-3 px-4">Risk Score</th>
              <th className="text-left text-gray-400 py-3 px-4">Joined</th>
              <th className="text-left text-gray-400 py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.address.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{user.address}</div>
                      <div className="text-gray-400 text-xs">{user.fullAddress.slice(0, 20)}...</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-white font-semibold ${
                    user.tier === 'Senior' ? 'text-blue-400' : 'text-orange-400'
                  }`}>
                    {user.tier}
                  </span>
                </td>
                <td className="py-4 px-4 text-white font-semibold">{user.investment}</td>
                <td className="py-4 px-4 text-green-400 font-semibold">{user.yield}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2 w-20">
                      <div
                        className={`h-2 rounded-full ${
                          user.riskScore >= 80 ? 'bg-green-500' :
                          user.riskScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${user.riskScore}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${getRiskScoreColor(user.riskScore)}`}>
                      {user.riskScore}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-400">{user.joinedDate}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    {user.status === 'verified' ? (
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                        <UserX className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No users found matching your criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
