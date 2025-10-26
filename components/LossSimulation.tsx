'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  TrendingUp,
  DollarSign,
  BarChart3,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

export default function LossSimulation() {
  const [scenario, setScenario] = useState('normal')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const scenarios = {
    normal: {
      name: 'Normal Operations',
      description: 'Standard cash flow with no losses',
      seniorFlow: 60000,
      juniorFlow: 40000,
      totalFlow: 100000,
      losses: 0,
      color: 'from-green-500 to-emerald-600'
    },
    minor: {
      name: 'Minor Losses',
      description: 'Small defaults affecting Junior tier',
      seniorFlow: 60000,
      juniorFlow: 35000,
      totalFlow: 95000,
      losses: 5000,
      color: 'from-yellow-500 to-orange-600'
    },
    moderate: {
      name: 'Moderate Losses',
      description: 'Significant defaults, Junior absorbs most losses',
      seniorFlow: 60000,
      juniorFlow: 20000,
      totalFlow: 80000,
      losses: 20000,
      color: 'from-orange-500 to-red-600'
    },
    severe: {
      name: 'Severe Losses',
      description: 'Major defaults, both tiers affected',
      seniorFlow: 50000,
      juniorFlow: 0,
      totalFlow: 50000,
      losses: 50000,
      color: 'from-red-500 to-red-700'
    }
  }

  const currentScenario = scenarios[scenario as keyof typeof scenarios]

  const simulationSteps = [
    { step: 0, title: 'Initial State', description: 'Cash flow enters the pool' },
    { step: 1, title: 'Loss Detection', description: 'Defaults are identified' },
    { step: 2, title: 'Junior Absorption', description: 'Junior tier absorbs losses first' },
    { step: 3, title: 'Senior Protection', description: 'Senior tier remains protected' },
    { step: 4, title: 'Final Distribution', description: 'Remaining cash flow distributed' }
  ]

  const playSimulation = () => {
    setIsPlaying(true)
    let step = 0
    const interval = setInterval(() => {
      setCurrentStep(step)
      step++
      if (step >= simulationSteps.length) {
        clearInterval(interval)
        setIsPlaying(false)
        setCurrentStep(0)
      }
    }, 1500)
  }

  const resetSimulation = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <div className="glass-effect rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Loss Absorption Simulation</h2>
        <div className="flex space-x-3">
          <button
            onClick={playSimulation}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span>Play Simulation</span>
          </button>
          <button
            onClick={resetSimulation}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <motion.button
            key={key}
            onClick={() => setScenario(key)}
            className={`p-4 rounded-xl transition-all duration-300 ${
              scenario === currentScenario
                ? 'ring-2 ring-blue-500 bg-blue-500/10'
                : 'bg-gray-800/50 hover:bg-gray-800/70'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${scenario.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                {key === 'normal' && <TrendingUp className="w-6 h-6 text-white" />}
                {key === 'minor' && <AlertTriangle className="w-6 h-6 text-white" />}
                {key === 'moderate' && <TrendingDown className="w-6 h-6 text-white" />}
                {key === 'severe' && <BarChart3 className="w-6 h-6 text-white" />}
              </div>
              <h3 className="text-white font-semibold mb-1">{scenario.name}</h3>
              <p className="text-gray-400 text-xs">{scenario.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Simulation Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cash Flow Visualization */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Cash Flow Distribution</h3>
          
          {/* Total Cash Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Total Cash Flow</h4>
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">${currentScenario.totalFlow.toLocaleString()}</div>
            <div className="text-green-200 text-sm">Available for Distribution</div>
          </motion.div>

          {/* Losses */}
          {currentScenario.losses > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Losses</h4>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">${currentScenario.losses.toLocaleString()}</div>
              <div className="text-red-200 text-sm">Absorbed by Junior Tier</div>
            </motion.div>
          )}

          {/* Senior Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-white" />
                <h4 className="text-lg font-bold text-white">Senior Tier</h4>
              </div>
              <div className="text-green-200 text-sm">Protected</div>
            </div>
            <div className="text-3xl font-bold text-white">${currentScenario.seniorFlow.toLocaleString()}</div>
            <div className="text-blue-200 text-sm">Priority Distribution</div>
          </motion.div>

          {/* Junior Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h4 className="text-lg font-bold text-white">Junior Tier</h4>
              </div>
              <div className="text-red-200 text-sm">Absorbs Loss</div>
            </div>
            <div className="text-3xl font-bold text-white">${currentScenario.juniorFlow.toLocaleString()}</div>
            <div className="text-orange-200 text-sm">After Loss Absorption</div>
          </motion.div>
        </div>

        {/* Simulation Steps */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Simulation Steps</h3>
          
          <div className="space-y-4">
            {simulationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  currentStep >= step.step
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : 'bg-gray-800/50 border border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.step
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step.step + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Risk Metrics */}
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Risk Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Senior Protection:</span>
                <span className="text-green-400 font-semibold">
                  {currentScenario.seniorFlow === 60000 ? '100%' : 'Partial'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Junior Loss:</span>
                <span className="text-red-400 font-semibold">
                  {Math.round((currentScenario.losses / 40000) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recovery Rate:</span>
                <span className="text-blue-400 font-semibold">
                  {Math.round(((currentScenario.seniorFlow + currentScenario.juniorFlow) / 100000) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
