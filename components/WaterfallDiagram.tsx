'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function WaterfallDiagram() {
  const [cashFlow, setCashFlow] = useState(100000)
  const [seniorAllocation, setSeniorAllocation] = useState(60)
  const [juniorAllocation, setJuniorAllocation] = useState(40)
  const [isAnimating, setIsAnimating] = useState(false)
  const [lossAmount, setLossAmount] = useState(0)

  const seniorAmount = (cashFlow * seniorAllocation / 100)
  const juniorAmount = (cashFlow * juniorAllocation / 100)
  const seniorAfterLoss = Math.max(0, seniorAmount - Math.max(0, lossAmount - juniorAmount))
  const juniorAfterLoss = Math.max(0, juniorAmount - lossAmount)

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const triggerAnimation = () => {
    setIsAnimating(true)
  }

  return (
    <div className="glass-effect rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Cash Flow Waterfall</h2>
        <button
          onClick={triggerAnimation}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <Zap className="w-4 h-4" />
          <span>Animate Flow</span>
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-4">
          <label className="text-white font-semibold">Total Cash Flow</label>
          <input
            type="range"
            min="50000"
            max="200000"
            value={cashFlow}
            onChange={(e) => setCashFlow(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-2xl font-bold text-white">${cashFlow.toLocaleString()}</div>
        </div>

        <div className="space-y-4">
          <label className="text-white font-semibold">Senior Allocation</label>
          <input
            type="range"
            min="40"
            max="80"
            value={seniorAllocation}
            onChange={(e) => setSeniorAllocation(Number(e.target.value))}
            className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-2xl font-bold text-blue-400">{seniorAllocation}%</div>
        </div>

        <div className="space-y-4">
          <label className="text-white font-semibold">Loss Simulation</label>
          <input
            type="range"
            min="0"
            max="50000"
            value={lossAmount}
            onChange={(e) => setLossAmount(Number(e.target.value))}
            className="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-2xl font-bold text-red-400">${lossAmount.toLocaleString()}</div>
        </div>
      </div>

      {/* Waterfall Visualization */}
      <div className="space-y-6">
        {/* Total Cash Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <DollarSign className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Total Cash Flow</h3>
            </div>
            <div className="text-4xl font-bold text-white">${cashFlow.toLocaleString()}</div>
            <div className="text-green-200">Available for Distribution</div>
          </div>
          
          {isAnimating && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            >
              <ArrowDown className="w-6 h-6 text-white animate-bounce" />
            </motion.div>
          )}
        </motion.div>

        {/* Distribution Arrow */}
        <div className="flex justify-center">
          <motion.div
            animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Senior and Junior Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Senior Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-bold text-white">Senior Tier</h3>
                </div>
                <div className="text-green-200 text-sm">Priority</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Allocation:</span>
                  <span className="text-white font-semibold">${seniorAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">After Loss:</span>
                  <span className={`font-semibold ${seniorAfterLoss > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${seniorAfterLoss.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Protection:</span>
                  <span className="text-green-400 font-semibold">
                    {seniorAfterLoss === seniorAmount ? 'Fully Protected' : 'Partially Protected'}
                  </span>
                </div>
              </div>

              {/* Protection Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(seniorAfterLoss / seniorAmount) * 100}%` }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Protection Level: {Math.round((seniorAfterLoss / seniorAmount) * 100)}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Junior Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-bold text-white">Junior Tier</h3>
                </div>
                <div className="text-red-200 text-sm">Absorbs Loss</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-orange-200">Allocation:</span>
                  <span className="text-white font-semibold">${juniorAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">After Loss:</span>
                  <span className={`font-semibold ${juniorAfterLoss > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${juniorAfterLoss.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Loss Absorbed:</span>
                  <span className="text-red-400 font-semibold">
                    ${Math.min(lossAmount, juniorAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Loss Absorption Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (lossAmount / juniorAmount) * 100)}%` }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Loss Absorption: {Math.round(Math.min(100, (lossAmount / juniorAmount) * 100))}%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-800/50 rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-white mb-4">Distribution Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">${(seniorAfterLoss + juniorAfterLoss).toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">${lossAmount.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Losses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round(((seniorAfterLoss + juniorAfterLoss) / cashFlow) * 100)}%
              </div>
              <div className="text-gray-400 text-sm">Recovery Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
