'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SorobanHeader from '@/components/SorobanHeader'
import SorobanContract from '@/components/SorobanContract'
import ContractDeployment from '@/components/ContractDeployment'
import ContractInteraction from '@/components/ContractInteraction'

export default function SorobanPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🔍' },
    { id: 'deployment', label: 'Deployment', icon: '🚀' },
    { id: 'interaction', label: 'Interaction', icon: '⚡' },
    { id: 'monitoring', label: 'Monitoring', icon: '📊' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SorobanHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 bg-gray-800/50 rounded-2xl p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && <SorobanContract />}
          {activeTab === 'deployment' && <ContractDeployment />}
          {activeTab === 'interaction' && <ContractInteraction />}
          {activeTab === 'monitoring' && <SorobanContract />}
        </motion.div>
      </div>
    </div>
  )
}
