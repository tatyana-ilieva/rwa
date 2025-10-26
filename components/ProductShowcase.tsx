'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Lock, 
  ArrowRight,
  Star,
  Activity,
  BarChart3
} from 'lucide-react'

export default function ProductShowcase() {
  const [selectedTier, setSelectedTier] = useState<'senior' | 'junior'>('senior')

  const products = [
    {
      id: 'senior',
      name: 'Senior Tier',
      description: 'Priority cash flow with lower risk',
      apy: '8.5%',
      risk: 'Low',
      color: 'from-green-500 to-emerald-600',
      features: [
        'First priority cash flow',
        'Lower risk exposure',
        'Stable returns',
        'US Treasury backed'
      ],
      icon: Shield
    },
    {
      id: 'junior',
      name: 'Junior Tier',
      description: 'Higher yield with increased risk',
      apy: '15.2%',
      risk: 'High',
      color: 'from-orange-500 to-red-600',
      features: [
        'Higher yield potential',
        'Absorbs losses first',
        'Variable returns',
        'RWA tokenized assets'
      ],
      icon: TrendingUp
    }
  ]

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tiered Bond Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your risk profile with our sophisticated tiered bond structure. 
            Senior tier offers stability, while Junior tier provides higher yields.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-3xl p-8 ${
                selectedTier === product.id 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : 'hover:scale-105'
              } transition-all duration-300 cursor-pointer`}
              onClick={() => setSelectedTier(product.id as 'senior' | 'junior')}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10`}></div>
              
              {/* Glass Effect */}
              <div className="relative z-10 glass-effect rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center`}>
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                      <p className="text-gray-400">{product.description}</p>
                    </div>
                  </div>
                  
                  {selectedTier === product.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* APY Display */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white mb-2">{product.apy}</div>
                  <div className="text-gray-400">Expected APY</div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Risk Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400">Risk Level:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.risk === 'Low' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {product.risk} Risk
                  </span>
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 bg-gradient-to-r ${product.color} text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Invest in {product.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">How Tiered Bonds Work</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Asset Tokenization',
                description: 'US Treasuries and RWA assets are tokenized on Stellar',
                icon: Lock
              },
              {
                step: '2',
                title: 'Tier Allocation',
                description: 'Cash flows are distributed with Senior priority',
                icon: BarChart3
              },
              {
                step: '3',
                title: 'Risk Management',
                description: 'Junior tier absorbs losses, protecting Senior investors',
                icon: Shield
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">Step {step.step}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
