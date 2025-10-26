'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/contexts/WalletContext'
import { Menu, X, Zap, Wallet } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected, publicKey, connect, disconnect } = useWallet()

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Stellar RWA</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Soroban', href: '/soroban' },
              { name: 'Admin', href: '/admin' }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Wallet Status */}
          {isConnected ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-3"
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-semibold">
                  {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Disconnect
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={connect}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </motion.button>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-700"
          >
            <div className="flex flex-col space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Soroban', href: '/soroban' },
                { name: 'Admin', href: '/admin' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {!isConnected ? (
                <button
                  onClick={() => {
                    connect()
                    setIsOpen(false)
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full w-full"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center justify-between px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                  <span className="text-green-400 text-sm font-semibold">
                    {publicKey?.slice(0, 8)}...{publicKey?.slice(-6)}
                  </span>
                  <button
                    onClick={() => {
                      disconnect()
                      setIsOpen(false)
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
