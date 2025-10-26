'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  ArrowUp,
  ArrowDown,
  Eye,
  Download
} from 'lucide-react'

export default function PortfolioOverview() {
  const portfolioData = {
    totalValue: 127450,
    totalChange: 12.5,
    seniorValue: 85000,
    juniorValue: 42450,
    seniorAPY: 8.5,
    juniorAPY: 15.2
  }

  const holdings = [
    {
      name: 'Senior Tier Bonds',
      value: 85000,
      change: 8.5,
      apy: 8.5,
      color: 'from-green-500 to-emerald-600',
      icon: TrendingUp
    },
    {
      name: 'Junior Tier Bonds',
      value: 42450,
      change: 15.2,
      apy: 15.2,
      color: 'from-orange-500 to-red-600',
      icon: TrendingDown
    }
  ]

  const recentActivity = [
    {
      type: 'Investment',
      asset: 'Senior Tier',
      amount: 15000,
      time: '2 hours ago',
      status: 'Completed'
    },
    {
      type: 'Yield',
      asset: 'Junior Tier',
      amount: 1250,
      time: '1 day ago',
      status: 'Received'
    },
    {
      type: 'Investment',
      asset: 'Senior Tier',
      amount: 25000,
      time: '3 days ago',
      status: 'Completed'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Portfolio Value</h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Eye className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          <div className="text-4xl font-bold text-white mb-2">
            ${portfolioData.totalValue.toLocaleString()}
          </div>
          
          <div className="flex items-center space-x-2 mb-6">
            <ArrowUp className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">+{portfolioData.totalChange}%</span>
            <span className="text-gray-400">24h</span>
          </div>

          {/* Holdings Breakdown */}
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <motion.div
                key={holding.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${holding.color} rounded-lg flex items-center justify-center`}>
                    <holding.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{holding.name}</div>
                    <div className="text-gray-400 text-sm">{holding.apy}% APY</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">${holding.value.toLocaleString()}</div>
                  <div className="text-green-400 text-sm">+{holding.change}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {[
            {
              title: 'Total Yield',
              value: '$8,450',
              change: '+12.3%',
              icon: DollarSign,
              color: 'text-green-400'
            },
            {
              title: 'Risk Score',
              value: 'Low',
              change: '-2.1%',
              icon: TrendingUp,
              color: 'text-blue-400'
            },
            {
              title: 'Active Positions',
              value: '12',
              change: '+2',
              icon: PieChart,
              color: 'text-purple-400'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className={`text-sm font-semibold ${stat.color}`}>{stat.change}</span>
              </div>
              
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'Investment' 
                    ? 'bg-blue-500/20' 
                    : 'bg-green-500/20'
                }`}>
                  {activity.type === 'Investment' ? (
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  ) : (
                    <DollarSign className="w-5 h-5 text-green-400" />
                  )}
                </div>
                
                <div>
                  <div className="text-white font-semibold">{activity.type} - {activity.asset}</div>
                  <div className="text-gray-400 text-sm">{activity.time}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-semibold">${activity.amount.toLocaleString()}</div>
                <div className={`text-sm ${
                  activity.status === 'Completed' ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {activity.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
