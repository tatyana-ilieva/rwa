'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Activity,
  Lock,
  Eye,
  Download
} from 'lucide-react'

export default function RiskAssessment() {
  const riskMetrics = [
    {
      category: 'Credit Risk',
      score: 85,
      status: 'Low',
      description: 'High-quality underlying assets with strong credit ratings',
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      icon: Shield
    },
    {
      category: 'Liquidity Risk',
      score: 92,
      status: 'Very Low',
      description: 'Strong liquidity pool with active trading volume',
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      icon: Activity
    },
    {
      category: 'Market Risk',
      score: 78,
      status: 'Medium',
      description: 'Moderate exposure to market volatility',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
      icon: TrendingUp
    },
    {
      category: 'Operational Risk',
      score: 88,
      status: 'Low',
      description: 'Robust smart contract infrastructure',
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      icon: Lock
    }
  ]

  const riskFactors = [
    {
      factor: 'Interest Rate Sensitivity',
      impact: 'Medium',
      mitigation: 'Diversified maturity structure',
      status: 'Monitored'
    },
    {
      factor: 'Counterparty Risk',
      impact: 'Low',
      mitigation: 'Multi-signature requirements',
      status: 'Controlled'
    },
    {
      factor: 'Regulatory Changes',
      impact: 'Medium',
      mitigation: 'Compliance framework',
      status: 'Tracked'
    },
    {
      factor: 'Technology Risk',
      impact: 'Low',
      mitigation: 'Audited smart contracts',
      status: 'Secured'
    }
  ]

  const stressTests = [
    {
      scenario: 'Market Crash (-30%)',
      seniorImpact: '-5%',
      juniorImpact: '-25%',
      overallImpact: '-12%',
      color: 'text-red-400'
    },
    {
      scenario: 'Interest Rate Rise (+2%)',
      seniorImpact: '-3%',
      juniorImpact: '-8%',
      overallImpact: '-5%',
      color: 'text-orange-400'
    },
    {
      scenario: 'Liquidity Crisis',
      seniorImpact: '-2%',
      juniorImpact: '-15%',
      overallImpact: '-7%',
      color: 'text-yellow-400'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Risk Metrics</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Eye className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {riskMetrics.map((metric, index) => (
              <motion.div
                key={metric.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="text-white font-semibold">{metric.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${metric.color}`}>{metric.status}</span>
                    <span className="text-white font-bold">{metric.score}%</span>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 rounded-full ${metric.bgColor}`}
                  />
                </div>

                <p className="text-gray-400 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Risk Factors</h3>
          
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{factor.factor}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    factor.impact === 'Low' ? 'bg-green-500/20 text-green-400' :
                    factor.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {factor.impact} Impact
                  </span>
                </div>
                
                <div className="text-gray-400 text-sm mb-2">{factor.mitigation}</div>
                <div className="text-blue-400 text-xs">{factor.status}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stress Testing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Stress Test Scenarios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stressTests.map((test, index) => (
            <motion.div
              key={test.scenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700"
            >
              <h4 className="text-lg font-semibold text-white mb-4">{test.scenario}</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Senior Impact:</span>
                  <span className="text-green-400 font-semibold">{test.seniorImpact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Junior Impact:</span>
                  <span className="text-orange-400 font-semibold">{test.juniorImpact}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-3">
                  <span className="text-white font-semibold">Overall Impact:</span>
                  <span className={`font-bold ${test.color}`}>{test.overallImpact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Risk Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Risk Summary</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Overall Risk: Low</span>
              </div>
              <p className="text-gray-400 text-sm">
                Portfolio maintains strong risk metrics with diversified exposure and robust risk management protocols.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Score:</span>
                <span className="text-green-400 font-semibold">85/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Level:</span>
                <span className="text-green-400 font-semibold">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated:</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Risk Monitoring</h3>
          
          <div className="space-y-4">
            {[
              { metric: 'VaR (95%)', value: '$2,450', status: 'Normal' },
              { metric: 'Max Drawdown', value: '3.2%', status: 'Low' },
              { metric: 'Sharpe Ratio', value: '1.85', status: 'Good' },
              { metric: 'Beta', value: '0.65', status: 'Stable' }
            ].map((item, index) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <span className="text-gray-300">{item.metric}</span>
                <div className="text-right">
                  <div className="text-white font-semibold">{item.value}</div>
                  <div className={`text-xs ${
                    item.status === 'Normal' || item.status === 'Good' || item.status === 'Stable' 
                      ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
