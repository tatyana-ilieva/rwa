'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  DollarSign,
  Globe,
  RefreshCw,
  Download,
  Eye,
  Filter
} from 'lucide-react'

export default function DEFINDEXAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState('yield')
  const [timeframe, setTimeframe] = useState('7d')

  const marketMetrics = [
    {
      title: 'Total Market Cap',
      value: '$2.4B',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Trading Volume',
      value: '$45.2M',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+12.3%',
      trend: 'up',
      icon: Globe,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Average APY',
      value: '12.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ]

  const yieldComparison = [
    { asset: 'Senior Tier', current: 8.5, previous: 8.2, change: 3.7 },
    { asset: 'Junior Tier', current: 15.2, previous: 14.8, change: 2.7 },
    { asset: 'Market Average', current: 12.5, previous: 12.1, change: 3.3 },
    { asset: 'Benchmark', current: 9.8, previous: 9.5, change: 3.2 }
  ]

  const topPerformers = [
    { name: 'US Treasury 10Y', yield: 4.2, change: '+0.3%', type: 'Government' },
    { name: 'Corporate Bonds', yield: 6.8, change: '+0.5%', type: 'Corporate' },
    { name: 'Municipal Bonds', yield: 3.9, change: '+0.2%', type: 'Municipal' },
    { name: 'High Yield', yield: 8.2, change: '+0.8%', type: 'High Yield' }
  ]

  const marketTrends = [
    { period: '1H', senior: 8.3, junior: 15.1, market: 11.7 },
    { period: '4H', senior: 8.4, junior: 15.3, market: 11.9 },
    { period: '1D', senior: 8.5, junior: 15.2, market: 11.8 },
    { period: '7D', senior: 8.6, junior: 15.5, market: 12.1 },
    { period: '30D', senior: 8.8, junior: 15.8, market: 12.3 }
  ]

  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`text-sm font-semibold ${metric.color}`}>
                {metric.change}
              </div>
            </div>
            
            <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
            <div className="text-gray-400 text-sm">{metric.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Yield Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Yield Comparison</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Filter className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {yieldComparison.map((item, index) => (
              <motion.div
                key={item.asset}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
              >
                <div>
                  <div className="text-white font-semibold">{item.asset}</div>
                  <div className="text-gray-400 text-sm">
                    Previous: {item.previous}% → Current: {item.current}%
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{item.current}%</div>
                  <div className="text-green-400 text-sm">+{item.change}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Trends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Market Trends</h3>
            <div className="flex space-x-2">
              {['1H', '4H', '1D', '7D', '30D'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    timeframe === period
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setTimeframe(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400">Interactive Market Chart</p>
              <p className="text-gray-500 text-sm">Real-time trend analysis</p>
            </div>
          </div>

          <div className="space-y-3">
            {marketTrends.slice(0, 3).map((trend, index) => (
              <motion.div
                key={trend.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <span className="text-gray-300">{trend.period}</span>
                <div className="flex space-x-4">
                  <span className="text-green-400 text-sm">{trend.senior}%</span>
                  <span className="text-orange-400 text-sm">{trend.junior}%</span>
                  <span className="text-blue-400 text-sm font-semibold">{trend.market}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Top Performing Assets</h3>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-4 h-4 text-blue-400" />
            </button>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Eye className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPerformers.map((performer, index) => (
            <motion.div
              key={performer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">{performer.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  performer.type === 'Government' ? 'bg-green-500/20 text-green-400' :
                  performer.type === 'Corporate' ? 'bg-blue-500/20 text-blue-400' :
                  performer.type === 'Municipal' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {performer.type}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">{performer.yield}%</div>
              <div className="text-green-400 text-sm font-semibold">{performer.change}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Market Insights</h3>
          
          <div className="space-y-4">
            {[
              {
                insight: 'Interest Rate Environment',
                description: 'Fed rates expected to remain stable, supporting bond yields',
                impact: 'Positive',
                color: 'text-green-400'
              },
              {
                insight: 'Credit Spreads',
                description: 'Corporate spreads tightening, indicating improved credit quality',
                impact: 'Positive',
                color: 'text-green-400'
              },
              {
                insight: 'Liquidity Conditions',
                description: 'Strong liquidity in secondary markets supporting price discovery',
                impact: 'Neutral',
                color: 'text-blue-400'
              }
            ].map((item, index) => (
              <motion.div
                key={item.insight}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{item.insight}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.impact}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">DEFINDEX Integration</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Real-time Data</span>
              </div>
              <p className="text-gray-400 text-sm">
                Live market data and analytics powered by DEFINDEX infrastructure
              </p>
            </div>

            <div className="space-y-3">
              {[
                { feature: 'Price Feeds', status: 'Active', color: 'text-green-400' },
                { feature: 'Yield Calculations', status: 'Active', color: 'text-green-400' },
                { feature: 'Risk Metrics', status: 'Active', color: 'text-green-400' },
                { feature: 'Market Analysis', status: 'Active', color: 'text-green-400' }
              ].map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <span className="text-gray-300">{item.feature}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.status}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
