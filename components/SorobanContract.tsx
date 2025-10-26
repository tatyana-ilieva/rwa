'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import toast from 'react-hot-toast'
import { 
  Zap, 
  Code, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Download,
  Settings,
  DollarSign
} from 'lucide-react'

export default function SorobanContract() {
  const { isConnected, publicKey, createTrancheTokens, investInTranche, isLoading } = useWallet()
  const [selectedContract, setSelectedContract] = useState('cashflow')
  const [isExecuting, setIsExecuting] = useState(false)
  const [contractResults, setContractResults] = useState<string[]>([])

  const contracts = [
    {
      id: 'cashflow',
      name: 'Cash Flow Distribution',
      description: 'Automated cash flow allocation between Senior and Junior tiers',
      status: 'Active',
      gasUsed: '2,450',
      transactions: '1,247',
      icon: DollarSign,
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
      icon: AlertTriangle,
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

  const executeContractMethod = async (methodName: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      setIsExecuting(true)
      
      // Simulate contract execution
      const result = `Contract method ${methodName} executed successfully`
      setContractResults(prev => [result, ...prev.slice(0, 4)])
      
      toast.success(`Contract method ${methodName} executed!`)
    } catch (err) {
      toast.error('Failed to execute contract method')
    } finally {
      setIsExecuting(false)
    }
  }

  const createTrancheContract = async (trancheType: 'senior' | 'junior', amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      setIsExecuting(true)
      const txHash = await createTrancheTokens(amount, trancheType)
      const result = `Tranche ${trancheType} created: ${txHash}`
      setContractResults(prev => [result, ...prev.slice(0, 4)])
      toast.success(`Tranche ${trancheType} created successfully!`)
    } catch (err) {
      toast.error('Failed to create tranche')
    } finally {
      setIsExecuting(false)
    }
  }

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

      {/* Contract Methods */}
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
                  <button 
                    onClick={() => executeContractMethod(method.name)}
                    disabled={isExecuting || !isConnected}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
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

      {/* Contract Results */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Contract Execution Results</h3>
        
        <div className="bg-gray-900/50 rounded-xl p-4 max-h-64 overflow-y-auto">
          {contractResults.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No contract executions yet. Execute a method to see results.
            </div>
          ) : (
            <div className="space-y-2">
              {contractResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-2 bg-green-500/10 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">{result}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => createTrancheContract('senior', 1000)}
            disabled={isExecuting || !isConnected}
            className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <h4 className="text-white font-semibold">Create Senior Tranche</h4>
            </div>
            <p className="text-gray-400 text-sm">Mint 1000 Senior tokens</p>
          </button>
          
          <button
            onClick={() => createTrancheContract('junior', 1000)}
            disabled={isExecuting || !isConnected}
            className="p-6 bg-orange-500/10 rounded-xl border border-orange-500/20 hover:bg-orange-500/20 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h4 className="text-white font-semibold">Create Junior Tranche</h4>
            </div>
            <p className="text-gray-400 text-sm">Mint 1000 Junior tokens</p>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
