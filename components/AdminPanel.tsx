'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  X,
  Shield,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Lock,
  Eye,
  Zap
} from 'lucide-react'

export default function AdminPanel() {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTranche, setSelectedTranche] = useState(null)
  const [newTranche, setNewTranche] = useState({
    name: '',
    description: '',
    seniorRatio: 60,
    juniorRatio: 40,
    minInvestment: 1000,
    maxInvestment: 100000,
    lockPeriod: 12,
    apy: 12.5
  })

  const existingTranches = [
    {
      id: 1,
      name: 'Conservative Senior',
      description: 'Low risk, stable returns',
      seniorRatio: 70,
      juniorRatio: 30,
      minInvestment: 5000,
      maxInvestment: 500000,
      lockPeriod: 12,
      apy: 8.5,
      status: 'Active',
      totalValue: 25000000,
      participants: 1250
    },
    {
      id: 2,
      name: 'Growth Junior',
      description: 'Higher risk, higher returns',
      seniorRatio: 50,
      juniorRatio: 50,
      minInvestment: 1000,
      maxInvestment: 100000,
      lockPeriod: 24,
      apy: 15.2,
      status: 'Active',
      totalValue: 18000000,
      participants: 890
    },
    {
      id: 3,
      name: 'Balanced Mix',
      description: 'Moderate risk profile',
      seniorRatio: 60,
      juniorRatio: 40,
      minInvestment: 2000,
      maxInvestment: 200000,
      lockPeriod: 18,
      apy: 11.8,
      status: 'Draft',
      totalValue: 0,
      participants: 0
    }
  ]

  const createTranche = () => {
    // Simulate tranche creation
    console.log('Creating new tranche:', newTranche)
    setIsCreating(false)
    setNewTranche({
      name: '',
      description: '',
      seniorRatio: 60,
      juniorRatio: 40,
      minInvestment: 1000,
      maxInvestment: 100000,
      lockPeriod: 12,
      apy: 12.5
    })
  }

  return (
    <div className="glass-effect rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Tranche Management</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Tranche</span>
        </button>
      </div>

      {/* Existing Tranches */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-bold text-white">Existing Tranches</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {existingTranches.map((tranche, index) => (
            <motion.div
              key={tranche.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{tranche.name}</h4>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{tranche.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Senior/Junior:</span>
                  <span className="text-white">{tranche.seniorRatio}/{tranche.juniorRatio}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">APY:</span>
                  <span className="text-green-400 font-semibold">{tranche.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value:</span>
                  <span className="text-white">${(tranche.totalValue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Participants:</span>
                  <span className="text-white">{tranche.participants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    tranche.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {tranche.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create New Tranche Modal */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Tranche</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Tranche Name</label>
                  <input
                    type="text"
                    value={newTranche.name}
                    onChange={(e) => setNewTranche({...newTranche, name: e.target.value})}
                    placeholder="Enter tranche name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Expected APY (%)</label>
                  <input
                    type="number"
                    value={newTranche.apy}
                    onChange={(e) => setNewTranche({...newTranche, apy: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <textarea
                  value={newTranche.description}
                  onChange={(e) => setNewTranche({...newTranche, description: e.target.value})}
                  placeholder="Describe the tranche characteristics"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Senior Ratio (%)</label>
                  <input
                    type="range"
                    min="40"
                    max="80"
                    value={newTranche.seniorRatio}
                    onChange={(e) => setNewTranche({...newTranche, seniorRatio: Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-white font-semibold text-center mt-2">{newTranche.seniorRatio}%</div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Junior Ratio (%)</label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={newTranche.juniorRatio}
                    onChange={(e) => setNewTranche({...newTranche, juniorRatio: Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-white font-semibold text-center mt-2">{newTranche.juniorRatio}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Min Investment ($)</label>
                  <input
                    type="number"
                    value={newTranche.minInvestment}
                    onChange={(e) => setNewTranche({...newTranche, minInvestment: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Max Investment ($)</label>
                  <input
                    type="number"
                    value={newTranche.maxInvestment}
                    onChange={(e) => setNewTranche({...newTranche, maxInvestment: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Lock Period (months)</label>
                  <input
                    type="number"
                    value={newTranche.lockPeriod}
                    onChange={(e) => setNewTranche({...newTranche, lockPeriod: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Tranche Preview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-500/10 rounded-xl">
                    <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">Senior Tier</div>
                    <div className="text-blue-400">{newTranche.seniorRatio}%</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-xl">
                    <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">Junior Tier</div>
                    <div className="text-orange-400">{newTranche.juniorRatio}%</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createTranche}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Create Tranche</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-800/50 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Tranche Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Tranches', value: '3', icon: BarChart3, color: 'text-blue-400' },
            { label: 'Total Value', value: '$43M', icon: DollarSign, color: 'text-green-400' },
            { label: 'Active Users', value: '2,140', icon: Eye, color: 'text-purple-400' },
            { label: 'Avg APY', value: '11.8%', icon: TrendingUp, color: 'text-orange-400' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center p-4 bg-gray-700/50 rounded-xl"
            >
              <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
