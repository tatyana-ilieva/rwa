'use client'

import { motion } from 'framer-motion'
import { 
  Bell, 
  Settings, 
  User, 
  Wallet,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="glass-effect border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">RWA Portfolio Management</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$127,450</div>
              <div className="text-sm text-gray-400">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+12.5%</div>
              <div className="text-sm text-gray-400">24h Change</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">8.7%</div>
              <div className="text-sm text-gray-400">APY</div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center space-x-4"
          >
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              <Wallet className="w-4 h-4" />
              <span>Connect</span>
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
