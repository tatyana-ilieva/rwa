'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Upload, 
  Code, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Download,
  Eye,
  Settings
} from 'lucide-react'

export default function ContractDeployment() {
  const [deploymentStep, setDeploymentStep] = useState(1)
  const [isDeploying, setIsDeploying] = useState(false)

  const contracts = [
    {
      name: 'CashFlowDistribution',
      description: 'Automated cash flow allocation between tiers',
      status: 'Ready',
      size: '2.4 KB',
      gasEstimate: '45,000',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      name: 'RiskManagement',
      description: 'Risk isolation and loss absorption logic',
      status: 'Ready',
      size: '3.1 KB',
      gasEstimate: '52,000',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      name: 'ComplianceEngine',
      description: 'Regulatory compliance and audit trails',
      status: 'Ready',
      size: '4.2 KB',
      gasEstimate: '68,000',
      icon: AlertTriangle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const deploymentSteps = [
    {
      step: 1,
      title: 'Contract Upload',
      description: 'Upload and validate smart contract code',
      status: 'completed',
      icon: Upload
    },
    {
      step: 2,
      title: 'Configuration',
      description: 'Set contract parameters and initial state',
      status: 'completed',
      icon: Settings
    },
    {
      step: 3,
      title: 'Deployment',
      description: 'Deploy contracts to Stellar network',
      status: 'in-progress',
      icon: Play
    },
    {
      step: 4,
      title: 'Verification',
      description: 'Verify deployment and initialize contracts',
      status: 'pending',
      icon: CheckCircle
    }
  ]

  const deploymentLogs = [
    { timestamp: '14:30:25', message: 'Starting contract deployment...', type: 'info' },
    { timestamp: '14:30:26', message: 'Uploading CashFlowDistribution contract', type: 'success' },
    { timestamp: '14:30:28', message: 'Uploading RiskManagement contract', type: 'success' },
    { timestamp: '14:30:30', message: 'Uploading ComplianceEngine contract', type: 'success' },
    { timestamp: '14:30:32', message: 'Deploying contracts to network...', type: 'info' },
    { timestamp: '14:30:35', message: 'CashFlowDistribution deployed successfully', type: 'success' },
    { timestamp: '14:30:37', message: 'RiskManagement deployed successfully', type: 'success' },
    { timestamp: '14:30:40', message: 'ComplianceEngine deployed successfully', type: 'success' }
  ]

  return (
    <div className="space-y-8">
      {/* Deployment Progress */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Deployment Progress</h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-4 h-4 text-blue-400" />
            </button>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Download className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {deploymentSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                step.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' :
                step.status === 'in-progress' ? 'bg-blue-500/10 border border-blue-500/20' :
                'bg-gray-800/50 border border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-500/20' :
                  step.status === 'in-progress' ? 'bg-blue-500/20' :
                  'bg-gray-700'
                }`}>
                  <step.icon className={`w-4 h-4 ${
                    step.status === 'completed' ? 'text-green-400' :
                    step.status === 'in-progress' ? 'text-blue-400' :
                    'text-gray-400'
                  }`} />
                </div>
                <span className={`text-sm font-semibold ${
                  step.status === 'completed' ? 'text-green-400' :
                  step.status === 'in-progress' ? 'text-blue-400' :
                  'text-gray-400'
                }`}>
                  Step {step.step}
                </span>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contract List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {contracts.map((contract, index) => (
          <motion.div
            key={contract.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
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
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Size:</span>
                <span className="text-white text-sm">{contract.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Gas Estimate:</span>
                <span className="text-white text-sm">{contract.gasEstimate}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Deploy</span>
              </button>
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <Eye className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deployment Logs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Deployment Logs</h3>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-4 h-4 text-blue-400" />
            </button>
            <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Download className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-4 max-h-64 overflow-y-auto">
          <div className="space-y-2">
            {deploymentLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  log.type === 'success' ? 'bg-green-500/10' :
                  log.type === 'error' ? 'bg-red-500/10' :
                  'bg-blue-500/10'
                }`}
              >
                <span className="text-gray-400 text-sm font-mono">{log.timestamp}</span>
                <span className={`text-sm ${
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }`}>
                  {log.message}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Deployment Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Deployment Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Deployment Configuration</h4>
            <div className="space-y-3">
              {[
                { label: 'Network', value: 'Stellar Testnet', status: 'Connected' },
                { label: 'Gas Price', value: '0.00001 XLM', status: 'Optimal' },
                { label: 'Timeout', value: '30 seconds', status: 'Set' },
                { label: 'Retry Attempts', value: '3', status: 'Configured' }
              ].map((config, index) => (
                <motion.div
                  key={config.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <span className="text-gray-300">{config.label}</span>
                  <div className="text-right">
                    <div className="text-white font-semibold">{config.value}</div>
                    <div className="text-green-400 text-xs">{config.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Deployment Controls</h4>
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Deployment</span>
              </button>
              
              <button className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                <Pause className="w-5 h-5" />
                <span>Pause Deployment</span>
              </button>
              
              <button className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span>Reset Deployment</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
