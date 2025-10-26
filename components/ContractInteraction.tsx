'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Play, 
  Code, 
  CheckCircle, 
  AlertTriangle,
  Send,
  RefreshCw,
  Download,
  Eye,
  Settings,
  Zap
} from 'lucide-react'

export default function ContractInteraction() {
  const [selectedMethod, setSelectedMethod] = useState('distributeCashFlow')
  const [isExecuting, setIsExecuting] = useState(false)

  const contractMethods = [
    {
      name: 'distributeCashFlow',
      description: 'Distribute incoming cash flows to Senior/Junior tiers',
      parameters: [
        { name: 'amount', type: 'u128', value: '25000' },
        { name: 'seniorRatio', type: 'u32', value: '60' },
        { name: 'juniorRatio', type: 'u32', value: '40' }
      ],
      gasEstimate: '45,000',
      status: 'Ready',
      icon: Send,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      name: 'absorbLosses',
      description: 'Junior tier absorbs losses before Senior tier',
      parameters: [
        { name: 'lossAmount', type: 'u128', value: '1250' },
        { name: 'juniorBalance', type: 'u128', value: '42450' }
      ],
      gasEstimate: '32,000',
      status: 'Ready',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      name: 'updateRiskMetrics',
      description: 'Update real-time risk assessment metrics',
      parameters: [
        { name: 'marketData', type: 'Vec<u8>', value: '0x1234...' },
        { name: 'riskFactors', type: 'Vec<u8>', value: '0x5678...' }
      ],
      gasEstimate: '28,000',
      status: 'Ready',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      name: 'executeCompliance',
      description: 'Execute compliance checks and reporting',
      parameters: [
        { name: 'transactionData', type: 'Vec<u8>', value: '0xabcd...' },
        { name: 'regulatoryRules', type: 'Vec<u8>', value: '0xefgh...' }
      ],
      gasEstimate: '55,000',
      status: 'Ready',
      icon: Code,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const recentExecutions = [
    {
      hash: '0x1234...5678',
      method: 'distributeCashFlow',
      gasUsed: '42,150',
      status: 'Success',
      timestamp: '2 minutes ago',
      result: 'Cash flow distributed successfully'
    },
    {
      hash: '0x2345...6789',
      method: 'absorbLosses',
      gasUsed: '28,750',
      status: 'Success',
      timestamp: '15 minutes ago',
      result: 'Losses absorbed by Junior tier'
    },
    {
      hash: '0x3456...7890',
      method: 'updateRiskMetrics',
      gasUsed: '25,300',
      status: 'Success',
      timestamp: '1 hour ago',
      result: 'Risk metrics updated'
    }
  ]

  const selectedMethodData = contractMethods.find(method => method.name === selectedMethod)

  return (
    <div className="space-y-8">
      {/* Method Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Contract Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contractMethods.map((method, index) => (
            <motion.button
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedMethod(method.name)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedMethod === method.name
                  ? 'ring-2 ring-blue-500 bg-blue-500/10'
                  : 'bg-gray-800/50 hover:bg-gray-800/70'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 ${method.bgColor} rounded-lg flex items-center justify-center`}>
                  <method.icon className={`w-4 h-4 ${method.color}`} />
                </div>
                <span className="text-white font-semibold text-sm">{method.name}</span>
              </div>
              <p className="text-gray-400 text-xs mb-2">{method.description}</p>
              <div className="text-gray-500 text-xs">Gas: {method.gasEstimate}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Method Details */}
      {selectedMethodData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">{selectedMethodData.name}</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Eye className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          <p className="text-gray-400 mb-6">{selectedMethodData.description}</p>

          {/* Parameters */}
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-semibold text-white">Parameters</h4>
            {selectedMethodData.parameters.map((param, index) => (
              <motion.div
                key={param.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="w-20">
                  <div className="text-white font-semibold">{param.name}</div>
                  <div className="text-gray-400 text-sm">{param.type}</div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    defaultValue={param.value}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Execution */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
            <div>
              <div className="text-white font-semibold">Gas Estimate: {selectedMethodData.gasEstimate}</div>
              <div className="text-gray-400 text-sm">Status: {selectedMethodData.status}</div>
            </div>
            
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </button>
              <button 
                onClick={() => setIsExecuting(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Execute</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Executions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Recent Executions</h3>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-4 h-4 text-blue-400" />
            </button>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Download className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {recentExecutions.map((execution, index) => (
            <motion.div
              key={execution.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                
                <div>
                  <div className="text-white font-semibold">{execution.method}</div>
                  <div className="text-gray-400 text-sm">{execution.hash}</div>
                  <div className="text-gray-500 text-xs">{execution.timestamp}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Gas Used</div>
                  <div className="text-white font-semibold">{execution.gasUsed}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Result</div>
                  <div className="text-green-400 text-sm">{execution.result}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-semibold">{execution.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Execution Status */}
      {isExecuting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="glass-effect rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Executing Contract Method</h3>
            <p className="text-gray-400 mb-6">Please wait while the transaction is processed...</p>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              />
            </div>
            
            <div className="text-gray-400 text-sm">
              Estimated time: 15-30 seconds
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
