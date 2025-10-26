'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Lock, 
  Activity,
  TrendingUp,
  Users,
  Smartphone,
  CheckCircle
} from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Soroban Smart Contracts',
      description: 'Advanced contract-level clearing and distribution logic with automated risk management',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Risk Isolation',
      description: 'Junior tier absorbs losses first, protecting Senior investors with priority cash flow',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Automated Distribution',
      description: 'Smart contract-based cash flow allocation with transparent, auditable processes',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'RWA Tokenization',
      description: 'US Treasuries and real-world assets tokenized on Stellar for seamless DeFi integration',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Lock,
      title: 'Compliance Ready',
      description: 'Built-in compliance features with audit trails and regulatory reporting capabilities',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Live portfolio tracking, yield monitoring, and risk assessment with DEFINDEX integration',
      color: 'from-teal-500 to-green-500'
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Optimized Returns',
      description: 'Choose between stable Senior returns or higher Junior yields based on your risk appetite'
    },
    {
      icon: Users,
      title: 'Institutional Grade',
      description: 'Professional-grade infrastructure suitable for both retail and institutional investors'
    },
    {
      icon: Smartphone,
      title: 'User Friendly',
      description: 'Intuitive interface with advanced analytics and portfolio management tools'
    },
    {
      icon: CheckCircle,
      title: 'Audit Ready',
      description: 'Transparent, auditable smart contracts with comprehensive compliance reporting'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Advanced Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on Stellar with Soroban smart contracts, our platform offers institutional-grade 
            RWA-backed structured products with cutting-edge DeFi capabilities.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Our Platform</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Soroban Integration */}
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Soroban Integration</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                'Smart contract-based cash flow distribution',
                'Automated risk management protocols',
                'Transparent audit trails',
                'Gas-efficient operations',
                'Cross-chain compatibility'
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RWA Tokenization */}
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">RWA Tokenization</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                'US Treasury bond tokenization',
                'Real-world asset integration',
                'Compliance and regulatory adherence',
                'Liquidity pool optimization',
                'Yield farming opportunities'
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
