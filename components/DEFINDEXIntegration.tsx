'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Eye,
  Download
} from 'lucide-react'

export default function DEFINDEXIntegration() {
  const [selectedMetric, setSelectedMetric] = useState('yield')
  const [timeframe, setTimeframe] = useState('7d')

  const metrics = [
    {
      id: 'yield',
      title: 'Yield Performance',
      value: '12.5%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'volume',
      title: 'Trading Volume',
      value: '$2.4M',
      change: '+15.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'risk',
      title: 'Risk Score',
      value: 'Low',
      change: '-0.5%',
      trend: 'down',
      icon: Activity,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'liquidity',
      title: 'Liquidity Pool',
      value: '$45.2M',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const marketData = [
    { time: '00:00', senior: 8.2, junior: 14.8, market: 9.1 },
    { time: '04:00', senior: 8.3, junior: 15.1, market: 9.3 },
    { time: '08:00', senior: 8.5, junior: 15.4, market: 9.5 },
    { time: '12:00', senior: 8.4, junior: 15.2, market: 9.4 },
    { time: '16:00', senior: 8.6, junior: 15.6, market: 9.7 },
    { time: '20:00', senior: 8.5, junior: 15.3, market: 9.5 }
  ]

  return (
    <section id="analytics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DEFINDEX Analytics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time market insights, yield tracking, and risk assessment powered by DEFINDEX 
            integration with advanced portfolio analytics.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-effect rounded-2xl p-6 ${
                selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
              } cursor-pointer hover:scale-105 transition-all duration-300`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">{metric.change}</span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Yield Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Yield Performance</h3>
              <div className="flex space-x-2">
                {['1d', '7d', '30d'].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                      timeframe === period
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setTimeframe(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-400">Interactive Chart</p>
                <p className="text-sm text-gray-500">Real-time yield tracking</p>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">8.5%</div>
                <div className="text-sm text-gray-400">Senior APY</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">15.2%</div>
                <div className="text-sm text-gray-400">Junior APY</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">9.7%</div>
                <div className="text-sm text-gray-400">Market Avg</div>
              </div>
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Risk Assessment</h3>
            
            <div className="space-y-6">
              {/* Risk Metrics */}
              {[
                { label: 'Credit Risk', value: 85, color: 'bg-green-500' },
                { label: 'Liquidity Risk', value: 92, color: 'bg-blue-500' },
                { label: 'Market Risk', value: 78, color: 'bg-yellow-500' },
                { label: 'Operational Risk', value: 88, color: 'bg-purple-500' }
              ].map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Overall Risk: Low</span>
              </div>
              <p className="text-gray-400 text-sm">
                Portfolio maintains strong risk metrics with diversified exposure
              </p>
            </div>
          </motion.div>
        </div>

        {/* Market Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Market Data</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <RefreshCw className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Eye className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Time</th>
                  <th className="text-left py-3 px-4 text-gray-400">Senior Yield</th>
                  <th className="text-left py-3 px-4 text-gray-400">Junior Yield</th>
                  <th className="text-left py-3 px-4 text-gray-400">Market Avg</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((row, index) => (
                  <motion.tr
                    key={row.time}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{row.time}</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">{row.senior}%</td>
                    <td className="py-3 px-4 text-orange-400 font-semibold">{row.junior}%</td>
                    <td className="py-3 px-4 text-blue-400 font-semibold">{row.market}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
