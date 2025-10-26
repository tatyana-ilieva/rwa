'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Building, 
  DollarSign, 
  TrendingUp, 
  Shield,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Lock,
  Globe
} from 'lucide-react'

export default function RWATransparency() {
  const [selectedAsset, setSelectedAsset] = useState('treasury')

  const rwaAssets = [
    {
      id: 'treasury',
      name: 'US Treasury Bonds',
      type: 'Government',
      value: 45000000,
      yield: 4.2,
      maturity: '10Y',
      rating: 'AAA',
      color: 'from-green-500 to-emerald-600',
      icon: Building,
      description: 'High-quality US government debt securities'
    },
    {
      id: 'corporate',
      name: 'Corporate Bonds',
      type: 'Corporate',
      value: 25000000,
      yield: 6.8,
      maturity: '5Y',
      rating: 'AA',
      color: 'from-blue-500 to-cyan-600',
      icon: DollarSign,
      description: 'Investment-grade corporate debt'
    },
    {
      id: 'municipal',
      name: 'Municipal Bonds',
      type: 'Municipal',
      value: 15000000,
      yield: 3.9,
      maturity: '7Y',
      rating: 'AA+',
      color: 'from-purple-500 to-pink-600',
      icon: Shield,
      description: 'Tax-exempt municipal securities'
    },
    {
      id: 'highyield',
      name: 'High Yield Bonds',
      type: 'High Yield',
      value: 10000000,
      yield: 8.2,
      maturity: '3Y',
      rating: 'BB',
      color: 'from-orange-500 to-red-600',
      icon: TrendingUp,
      description: 'Higher risk, higher return securities'
    }
  ]

  const auditLogs = [
    {
      timestamp: '2024-01-15 14:30:25',
      action: 'Asset Purchase',
      asset: 'US Treasury 10Y',
      amount: '$5,000,000',
      hash: '0x1234...5678',
      status: 'Confirmed'
    },
    {
      timestamp: '2024-01-15 12:15:10',
      action: 'Cash Flow Distribution',
      asset: 'Corporate Bonds',
      amount: '$125,000',
      hash: '0x2345...6789',
      status: 'Confirmed'
    },
    {
      timestamp: '2024-01-15 10:45:30',
      action: 'Asset Verification',
      asset: 'Municipal Bonds',
      amount: 'N/A',
      hash: '0x3456...7890',
      status: 'Verified'
    },
    {
      timestamp: '2024-01-14 16:20:45',
      action: 'Yield Payment',
      asset: 'High Yield Bonds',
      amount: '$85,000',
      hash: '0x4567...8901',
      status: 'Confirmed'
    }
  ]

  const complianceMetrics = [
    { metric: 'Total Assets', value: '$95,000,000', status: 'Verified' },
    { metric: 'Average Yield', value: '5.8%', status: 'Current' },
    { metric: 'Credit Rating', value: 'AA+', status: 'Stable' },
    { metric: 'Maturity Profile', value: '6.2 Years', status: 'Balanced' },
    { metric: 'Diversification', value: '85%', status: 'Excellent' },
    { metric: 'Liquidity', value: '92%', status: 'High' }
  ]

  const selectedAssetData = rwaAssets.find(asset => asset.id === selectedAsset)

  return (
    <div className="glass-effect rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">RWA Transparency Panel</h2>
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

      {/* Asset Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {rwaAssets.map((asset, index) => (
          <motion.button
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => setSelectedAsset(asset.id)}
            className={`p-6 rounded-2xl transition-all duration-300 ${
              selectedAsset === asset.id
                ? 'ring-2 ring-blue-500 bg-blue-500/10'
                : 'bg-gray-800/50 hover:bg-gray-800/70'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${asset.color} rounded-xl flex items-center justify-center`}>
                <asset.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{asset.name}</h3>
                <p className="text-gray-400 text-sm">{asset.type}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Value:</span>
                <span className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Yield:</span>
                <span className="text-green-400 font-semibold">{asset.yield}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Rating:</span>
                <span className="text-blue-400 font-semibold">{asset.rating}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Asset Details */}
      {selectedAssetData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Asset Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedAssetData.color} rounded-xl flex items-center justify-center`}>
                  <selectedAssetData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedAssetData.name}</h4>
                  <p className="text-gray-400">{selectedAssetData.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Total Value</div>
                  <div className="text-2xl font-bold text-white">${(selectedAssetData.value / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Current Yield</div>
                  <div className="text-2xl font-bold text-green-400">{selectedAssetData.yield}%</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Maturity</div>
                  <div className="text-lg font-bold text-white">{selectedAssetData.maturity}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Credit Rating</div>
                  <div className="text-lg font-bold text-blue-400">{selectedAssetData.rating}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Monthly Return', value: '+2.3%', color: 'text-green-400' },
                { label: 'YTD Return', value: '+8.7%', color: 'text-green-400' },
                { label: 'Volatility', value: '3.2%', color: 'text-blue-400' },
                { label: 'Sharpe Ratio', value: '1.85', color: 'text-purple-400' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <span className="text-gray-300">{metric.label}</span>
                  <span className={`font-semibold ${metric.color}`}>{metric.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Compliance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-800/50 rounded-2xl p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-6">Compliance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-4 bg-gray-700/50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{metric.metric}</span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs">{metric.status}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Audit Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gray-800/50 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Audit Logs</h3>
        
        <div className="space-y-4">
          {auditLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                
                <div>
                  <div className="text-white font-semibold">{log.action}</div>
                  <div className="text-gray-400 text-sm">{log.asset}</div>
                  <div className="text-gray-500 text-xs">{log.timestamp}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white font-semibold">{log.amount}</div>
                  <div className="text-gray-400 text-sm">{log.hash}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-semibold">{log.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
