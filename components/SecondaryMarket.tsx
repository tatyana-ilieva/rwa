'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  ArrowUp,
  ArrowDown,
  Eye,
  RefreshCw,
  Zap,
  Shield,
  AlertTriangle,
  Activity
} from 'lucide-react'

export default function SecondaryMarket() {
  const [selectedTab, setSelectedTab] = useState('buy')
  const [selectedTranche, setSelectedTranche] = useState('senior')

  const trancheTokens = [
    {
      id: 'senior',
      name: 'Senior Tier Tokens',
      symbol: 'SRN',
      price: 1.25,
      change: 2.3,
      volume: 125000,
      marketCap: 2500000,
      color: 'from-blue-500 to-cyan-600',
      icon: Shield,
      description: 'Priority cash flow tokens'
    },
    {
      id: 'junior',
      name: 'Junior Tier Tokens',
      symbol: 'JRN',
      price: 0.85,
      change: -1.2,
      volume: 89000,
      marketCap: 1800000,
      color: 'from-orange-500 to-red-600',
      icon: AlertTriangle,
      description: 'Higher risk, higher yield tokens'
    }
  ]

  const orderBook = {
    senior: {
      bids: [
        { price: 1.24, amount: 1000, total: 1240 },
        { price: 1.23, amount: 2500, total: 3075 },
        { price: 1.22, amount: 1500, total: 1830 },
        { price: 1.21, amount: 3000, total: 3630 }
      ],
      asks: [
        { price: 1.26, amount: 2000, total: 2520 },
        { price: 1.27, amount: 1800, total: 2286 },
        { price: 1.28, amount: 1200, total: 1536 },
        { price: 1.29, amount: 2500, total: 3225 }
      ]
    },
    junior: {
      bids: [
        { price: 0.84, amount: 2000, total: 1680 },
        { price: 0.83, amount: 3000, total: 2490 },
        { price: 0.82, amount: 1500, total: 1230 },
        { price: 0.81, amount: 4000, total: 3240 }
      ],
      asks: [
        { price: 0.86, amount: 1800, total: 1548 },
        { price: 0.87, amount: 2200, total: 1914 },
        { price: 0.88, amount: 1600, total: 1408 },
        { price: 0.89, amount: 2800, total: 2492 }
      ]
    }
  }

  const recentTrades = [
    { time: '14:30:25', price: 1.25, amount: 500, type: 'buy' },
    { time: '14:29:18', price: 1.24, amount: 750, type: 'sell' },
    { time: '14:28:42', price: 1.26, amount: 300, type: 'buy' },
    { time: '14:27:15', price: 1.23, amount: 1200, type: 'sell' },
    { time: '14:26:33', price: 1.25, amount: 800, type: 'buy' }
  ]

  const currentTranche = trancheTokens.find(t => t.id === selectedTranche)
  const currentOrderBook = orderBook[selectedTranche as keyof typeof orderBook]

  return (
    <div className="glass-effect rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Secondary Market Trading</h2>
        <div className="flex space-x-2">
          <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
            <RefreshCw className="w-4 h-4 text-blue-400" />
          </button>
          <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
            <Eye className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Token Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {trancheTokens.map((token, index) => (
          <motion.button
            key={token.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => setSelectedTranche(token.id)}
            className={`p-6 rounded-2xl transition-all duration-300 ${
              selectedTranche === token.id
                ? 'ring-2 ring-blue-500 bg-blue-500/10'
                : 'bg-gray-800/50 hover:bg-gray-800/70'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${token.color} rounded-xl flex items-center justify-center`}>
                <token.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{token.name}</h3>
                <p className="text-gray-400 text-sm">{token.symbol}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm">Price</div>
                <div className="text-2xl font-bold text-white">${token.price}</div>
                <div className={`text-sm flex items-center space-x-1 ${
                  token.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{Math.abs(token.change)}%</span>
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Volume</div>
                <div className="text-lg font-bold text-white">${(token.volume / 1000).toFixed(0)}K</div>
                <div className="text-gray-400 text-sm">24h</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Book */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Order Book - {currentTranche?.name}</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Bids */}
              <div>
                <h4 className="text-green-400 font-semibold mb-3">Bids (Buy Orders)</h4>
                <div className="space-y-2">
                  {currentOrderBook.bids.map((bid, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg"
                    >
                      <span className="text-green-400 font-semibold">${bid.price}</span>
                      <span className="text-white">{bid.amount.toLocaleString()}</span>
                      <span className="text-gray-400">${bid.total.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <h4 className="text-red-400 font-semibold mb-3">Asks (Sell Orders)</h4>
                <div className="space-y-2">
                  {currentOrderBook.asks.map((ask, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg"
                    >
                      <span className="text-red-400 font-semibold">${ask.price}</span>
                      <span className="text-white">{ask.amount.toLocaleString()}</span>
                      <span className="text-gray-400">${ask.total.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Trades</h3>
            
            <div className="space-y-2">
              {recentTrades.map((trade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <span className="text-gray-400 text-sm">{trade.time}</span>
                  <span className="text-white font-semibold">${trade.price}</span>
                  <span className="text-white">{trade.amount.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.type === 'buy' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trading Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Buy/Sell Tabs */}
          <div className="flex bg-gray-800/50 rounded-xl p-1">
            <button
              onClick={() => setSelectedTab('buy')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                selectedTab === 'buy'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedTab('sell')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                selectedTab === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Trading Form */}
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              {selectedTab === 'buy' ? 'Buy' : 'Sell'} {currentTranche?.symbol} Tokens
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Price per Token</label>
                <input
                  type="number"
                  defaultValue={currentTranche?.price}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Total Value:</span>
                  <span className="text-white font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fees:</span>
                  <span className="text-gray-400">$0.00</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Total Cost:</span>
                    <span className="text-white font-semibold">$0.00</span>
                  </div>
                </div>
              </div>
              
              <button className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                selectedTab === 'buy'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              } text-white transition-all duration-200`}>
                <Zap className="w-4 h-4" />
                <span>{selectedTab === 'buy' ? 'Buy' : 'Sell'} Tokens</span>
              </button>
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Portfolio</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Senior Tokens:</span>
                <span className="text-white font-semibold">1,250 SRN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Junior Tokens:</span>
                <span className="text-white font-semibold">800 JRN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Value:</span>
                <span className="text-green-400 font-semibold">$2,125.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">24h Change:</span>
                <span className="text-green-400 font-semibold">+$45.30</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
