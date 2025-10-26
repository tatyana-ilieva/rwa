'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react'

export default function TransactionHistory() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    {
      id: 'tx-001',
      type: 'Investment',
      asset: 'Senior Tier Bonds',
      amount: 25000,
      status: 'Completed',
      timestamp: '2024-01-15 14:30:25',
      hash: '0x1234...5678',
      icon: ArrowDownLeft,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'tx-002',
      type: 'Yield Payment',
      asset: 'Junior Tier Bonds',
      amount: 1250,
      status: 'Completed',
      timestamp: '2024-01-15 12:15:10',
      hash: '0x2345...6789',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 'tx-003',
      type: 'Investment',
      asset: 'Junior Tier Bonds',
      amount: 15000,
      status: 'Pending',
      timestamp: '2024-01-15 10:45:30',
      hash: '0x3456...7890',
      icon: ArrowDownLeft,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      id: 'tx-004',
      type: 'Yield Payment',
      asset: 'Senior Tier Bonds',
      amount: 850,
      status: 'Completed',
      timestamp: '2024-01-14 16:20:45',
      hash: '0x4567...8901',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 'tx-005',
      type: 'Withdrawal',
      asset: 'Senior Tier Bonds',
      amount: 5000,
      status: 'Failed',
      timestamp: '2024-01-14 09:15:20',
      hash: '0x5678...9012',
      icon: ArrowUpRight,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Transactions' },
    { id: 'investment', label: 'Investments' },
    { id: 'yield', label: 'Yield Payments' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'pending', label: 'Pending' }
  ]

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'all' || 
      (filter === 'investment' && tx.type === 'Investment') ||
      (filter === 'yield' && tx.type === 'Yield Payment') ||
      (filter === 'withdrawal' && tx.type === 'Withdrawal') ||
      (filter === 'pending' && tx.status === 'Pending')
    
    const matchesSearch = searchTerm === '' || 
      tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'Failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Transaction History</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Actions */}
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Filter className="w-4 h-4 text-blue-400" />
              </button>
              <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === filterOption.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${transaction.bgColor} rounded-xl flex items-center justify-center`}>
                  <transaction.icon className={`w-6 h-6 ${transaction.color}`} />
                </div>
                
                <div>
                  <div className="text-white font-semibold">{transaction.type}</div>
                  <div className="text-gray-400 text-sm">{transaction.asset}</div>
                  <div className="text-gray-500 text-xs">{transaction.timestamp}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'Investment' || transaction.type === 'Withdrawal'
                      ? transaction.type === 'Investment' ? 'text-blue-400' : 'text-red-400'
                      : 'text-green-400'
                  }`}>
                    {transaction.type === 'Investment' || transaction.type === 'Withdrawal' ? '-' : '+'}
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(transaction.status)}
                    <span className={`text-sm ${
                      transaction.status === 'Completed' ? 'text-green-400' :
                      transaction.status === 'Pending' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800"
        >
          <div className="text-gray-400 text-sm">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
