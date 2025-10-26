'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Zap, 
  Shield, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Download,
  Play,
  Pause,
  Settings
} from 'lucide-react'

export default function SorobanIntegration() {
  const [selectedContract, setSelectedContract] = useState('cashflow')
  const [isConnected, setIsConnected] = useState(false)

  const contracts = [
    {
      id: 'cashflow',
      name: 'Cash Flow Distribution',
      description: 'Automated cash flow allocation between Senior and Junior tiers',
      status: 'Active',
      gasUsed: '2,450',
      transactions: '1,247',
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'risk',
      name: 'Risk Management',
      description: 'Risk isolation and loss absorption mechanisms',
      status: 'Active',
      gasUsed: '1,890',
      transactions: '892',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 'compliance',
      name: 'Compliance Engine',
      description: 'Regulatory compliance and audit trail management',
      status: 'Active',
      gasUsed: '3,120',
      transactions: '2,156',
      icon: CheckCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const contractMethods = [
    {
      name: 'distributeCashFlow',
      description: 'Distribute incoming cash flows to Senior/Junior tiers',
      parameters: ['amount', 'seniorRatio', 'juniorRatio'],
      gasEstimate: '45,000',
      status: 'Ready'
    },
    {
      name: 'absorbLosses',
      description: 'Junior tier absorbs losses before Senior tier',
      parameters: ['lossAmount', 'juniorBalance'],
      gasEstimate: '32,000',
      status: 'Ready'
    },
    {
      name: 'updateRiskMetrics',
      description: 'Update real-time risk assessment metrics',
      parameters: ['marketData', 'riskFactors'],
      gasEstimate: '28,000',
      status: 'Ready'
    },
    {
      name: 'executeCompliance',
      description: 'Execute compliance checks and reporting',
      parameters: ['transactionData', 'regulatoryRules'],
      gasEstimate: '55,000',
      status: 'Ready'
    }
  ]

  const recentTransactions = [
    {
      hash: '0x1234...5678',
      method: 'distributeCashFlow',
      gasUsed: '42,150',
      status: 'Success',
      timestamp: '2 minutes ago',
      value: '$25,000'
    },
    {
      hash: '0x2345...6789',
      method: 'absorbLosses',
      gasUsed: '28,750',
      status: 'Success',
      timestamp: '15 minutes ago',
      value: '$1,250'
    },
    {
      hash: '0x3456...7890',
      method: 'updateRiskMetrics',
      gasUsed: '25,300',
      status: 'Success',
      timestamp: '1 hour ago',
      value: 'N/A'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Contract Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {contracts.map((contract, index) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
              selectedContract === contract.id ? 'ring-2 ring-blue-500' : 'hover:scale-105'
            }`}
            onClick={() => setSelectedContract(contract.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${contract.bgColor} rounded-xl flex items-center justify-center`}>
                <contract.icon className={`w-6 h-6 ${contract.color}`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-semibold">{contract.status}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{contract.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{contract.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-xs">Gas Used</div>
                <div className="text-white font-semibold">{contract.gasUsed}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">Transactions</div>
                <div className="text-white font-semibold">{contract.transactions}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contract Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Contract Methods</h3>
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

        <div className="space-y-4">
          {contractMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                
                <div>
                  <div className="text-white font-semibold">{method.name}</div>
                  <div className="text-gray-400 text-sm">{method.description}</div>
                  <div className="text-gray-500 text-xs">
                    Parameters: {method.parameters.join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Gas Estimate</div>
                  <div className="text-white font-semibold">{method.gasEstimate}</div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Execute</span>
                  </button>
                  <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Recent Contract Transactions</h3>
        
        <div className="space-y-4">
          {recentTransactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                
                <div>
                  <div className="text-white font-semibold">{tx.method}</div>
                  <div className="text-gray-400 text-sm">{tx.hash}</div>
                  <div className="text-gray-500 text-xs">{tx.timestamp}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Gas Used</div>
                  <div className="text-white font-semibold">{tx.gasUsed}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Value</div>
                  <div className="text-white font-semibold">{tx.value}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-semibold">{tx.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contract Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Contract Status</h3>
          
          <div className="space-y-4">
            {[
              { metric: 'Total Gas Used', value: '7,460', status: 'Normal' },
              { metric: 'Success Rate', value: '99.8%', status: 'Excellent' },
              { metric: 'Average Gas Cost', value: '0.002 XLM', status: 'Low' },
              { metric: 'Uptime', value: '99.9%', status: 'Excellent' }
            ].map((item, index) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <span className="text-gray-300">{item.metric}</span>
                <div className="text-right">
                  <div className="text-white font-semibold">{item.value}</div>
                  <div className={`text-xs ${
                    item.status === 'Excellent' || item.status === 'Normal' || item.status === 'Low'
                      ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Smart Contract Features</h3>
          
          <div className="space-y-4">
            {[
              {
                feature: 'Automated Cash Flow',
                description: 'Smart distribution based on tier priorities',
                status: 'Active',
                color: 'text-green-400'
              },
              {
                feature: 'Risk Isolation',
                description: 'Junior tier loss absorption mechanisms',
                status: 'Active',
                color: 'text-green-400'
              },
              {
                feature: 'Compliance Engine',
                description: 'Real-time regulatory compliance checks',
                status: 'Active',
                color: 'text-green-400'
              },
              {
                feature: 'Audit Trails',
                description: 'Comprehensive transaction logging',
                status: 'Active',
                color: 'text-green-400'
              }
            ].map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{item.feature}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.status}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
