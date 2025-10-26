'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Target } from 'lucide-react'

export default function TrancheAnalytics() {
  const performanceData = [
    { month: 'Jan', senior: 8.2, junior: 14.8, market: 6.5 },
    { month: 'Feb', senior: 8.5, junior: 15.2, market: 6.8 },
    { month: 'Mar', senior: 8.3, junior: 14.5, market: 6.2 },
    { month: 'Apr', senior: 8.7, junior: 15.8, market: 7.1 },
    { month: 'May', senior: 8.4, junior: 15.1, market: 6.7 },
    { month: 'Jun', senior: 8.9, junior: 16.2, market: 7.5 }
  ]

  const allocationData = [
    { name: 'Senior Tier', value: 68, color: '#3b82f6' },
    { name: 'Junior Tier', value: 32, color: '#f97316' }
  ]

  const volumeData = [
    { day: 'Mon', volume: 2.4 },
    { day: 'Tue', volume: 3.2 },
    { day: 'Wed', volume: 2.8 },
    { day: 'Thu', volume: 4.1 },
    { day: 'Fri', volume: 3.5 },
    { day: 'Sat', volume: 2.1 },
    { day: 'Sun', volume: 1.8 }
  ]

  const metrics = [
    {
      title: 'Total Value Locked',
      value: '$43.2M',
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Active Investors',
      value: '2,140',
      change: '+8.3%',
      positive: true,
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Avg APY',
      value: '11.8%',
      change: '+0.7%',
      positive: true,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Trading Volume (24h)',
      value: '$2.8M',
      change: '-3.2%',
      positive: false,
      icon: Activity,
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                metric.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm mb-1">{metric.title}</div>
            <div className="text-3xl font-bold text-white">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Tranche Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Legend />
            <Line type="monotone" dataKey="senior" stroke="#3b82f6" strokeWidth={2} name="Senior APY" />
            <Line type="monotone" dataKey="junior" stroke="#f97316" strokeWidth={2} name="Junior APY" />
            <Line type="monotone" dataKey="market" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Market Avg" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Allocation Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Capital Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trading Volume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Trading Volume (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Bar dataKey="volume" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tranche Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass-effect rounded-2xl p-6 overflow-x-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Tranche Details</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 py-3">Tranche</th>
              <th className="text-left text-gray-400 py-3">TVL</th>
              <th className="text-left text-gray-400 py-3">APY</th>
              <th className="text-left text-gray-400 py-3">Investors</th>
              <th className="text-left text-gray-400 py-3">Min Investment</th>
              <th className="text-left text-gray-400 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg"></div>
                  <div>
                    <div className="text-white font-semibold">Senior Tier</div>
                    <div className="text-gray-400 text-sm">Low Risk</div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-white">$29.4M</td>
              <td className="py-4 text-green-400 font-semibold">8.5%</td>
              <td className="py-4 text-white">1,456</td>
              <td className="py-4 text-white">$1,000</td>
              <td className="py-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg"></div>
                  <div>
                    <div className="text-white font-semibold">Junior Tier</div>
                    <div className="text-gray-400 text-sm">High Risk</div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-white">$13.8M</td>
              <td className="py-4 text-green-400 font-semibold">15.2%</td>
              <td className="py-4 text-white">684</td>
              <td className="py-4 text-white">$500</td>
              <td className="py-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
