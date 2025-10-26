'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  BarChart3,
  RefreshCw,
  Download
} from 'lucide-react'

export default function YieldTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const yieldData = {
    currentAPY: 12.5,
    seniorAPY: 8.5,
    juniorAPY: 15.2,
    totalYield: 8450,
    monthlyYield: 1250,
    projectedAnnual: 15200
  }

  const yieldHistory = [
    { date: '2024-01-01', senior: 8.2, junior: 14.8, total: 11.5 },
    { date: '2024-01-02', senior: 8.3, junior: 15.1, total: 11.7 },
    { date: '2024-01-03', senior: 8.5, junior: 15.4, total: 12.0 },
    { date: '2024-01-04', senior: 8.4, junior: 15.2, total: 11.8 },
    { date: '2024-01-05', senior: 8.6, junior: 15.6, total: 12.1 },
    { date: '2024-01-06', senior: 8.5, junior: 15.3, total: 11.9 },
    { date: '2024-01-07', senior: 8.7, junior: 15.8, total: 12.3 }
  ]

  const yieldProjections = [
    { period: '1 Month', senior: 8.5, junior: 15.2, total: 11.9 },
    { period: '3 Months', senior: 8.7, junior: 15.5, total: 12.1 },
    { period: '6 Months', senior: 8.9, junior: 15.8, total: 12.4 },
    { period: '1 Year', senior: 9.1, junior: 16.2, total: 12.7 }
  ]

  return (
    <div className="space-y-8">
      {/* Yield Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Current APY',
            value: `${yieldData.currentAPY}%`,
            change: '+2.3%',
            icon: TrendingUp,
            color: 'text-green-400',
            bgColor: 'bg-green-500/20'
          },
          {
            title: 'Total Yield',
            value: `$${yieldData.totalYield.toLocaleString()}`,
            change: '+15.2%',
            icon: DollarSign,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/20'
          },
          {
            title: 'Monthly Yield',
            value: `$${yieldData.monthlyYield.toLocaleString()}`,
            change: '+8.7%',
            icon: Calendar,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20'
          },
          {
            title: 'Projected Annual',
            value: `$${yieldData.projectedAnnual.toLocaleString()}`,
            change: '+12.1%',
            icon: Target,
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/20'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mb-4`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            
            <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
            <div className="text-gray-400 text-sm mb-2">{metric.title}</div>
            <div className={`text-sm font-semibold ${metric.color}`}>{metric.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Yield Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Yield Performance</h3>
          <div className="flex space-x-2">
            {['1d', '7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-6">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Interactive Yield Chart</p>
            <p className="text-gray-500">Real-time APY tracking and projections</p>
          </div>
        </div>

        {/* Yield Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <div className="text-2xl font-bold text-green-400 mb-2">{yieldData.seniorAPY}%</div>
            <div className="text-gray-400">Senior Tier APY</div>
          </div>
          <div className="text-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400 mb-2">{yieldData.juniorAPY}%</div>
            <div className="text-gray-400">Junior Tier APY</div>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400 mb-2">{yieldData.currentAPY}%</div>
            <div className="text-gray-400">Weighted Average</div>
          </div>
        </div>
      </motion.div>

      {/* Yield Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Yield Projections</h3>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          <div className="space-y-4">
            {yieldProjections.map((projection, index) => (
              <motion.div
                key={projection.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="text-white font-semibold">{projection.period}</div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">{projection.senior}%</div>
                    <div className="text-gray-400 text-xs">Senior</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-semibold">{projection.junior}%</div>
                    <div className="text-gray-400 text-xs">Junior</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">{projection.total}%</div>
                    <div className="text-gray-400 text-xs">Total</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Yield History</h3>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Download className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          <div className="space-y-3">
            {yieldHistory.slice(-5).map((entry, index) => (
              <motion.div
                key={entry.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="text-gray-400 text-sm">{entry.date}</div>
                <div className="flex space-x-4">
                  <span className="text-green-400 text-sm">{entry.senior}%</span>
                  <span className="text-orange-400 text-sm">{entry.junior}%</span>
                  <span className="text-blue-400 text-sm font-semibold">{entry.total}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
