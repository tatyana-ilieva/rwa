'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
  Horizon
} from '@stellar/stellar-sdk'
import {
  requestAccess,
  isConnected,
  getAddress,
  signTransaction
} from '@stellar/freighter-api'

interface WalletContextType {
  isConnected: boolean
  publicKey: string | null
  balance: string
  connect: () => Promise<void>
  disconnect: () => void
  signTransaction: (transactionXDR: string) => Promise<string>
  createTrancheTokens: (amount: number, trancheType: 'senior' | 'junior') => Promise<string>
  investInTranche: (amount: number, trancheType: 'senior' | 'junior') => Promise<string>
  getAccountBalance: () => Promise<string>
  isLoading: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [balance, setBalance] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const response = await isConnected()

      if (response.error) {
        console.log('Freighter error:', response.error)
        return
      }

      if (response.isConnected) {
        const addressResponse = await getAddress()

        if (addressResponse.error) {
          console.log('Failed to get address:', addressResponse.error)
          return
        }

        const key = addressResponse.address
        setPublicKey(key)
        setIsConnected(true)

        // Fetch balance with the key directly
        if (key) {
          const server = new Horizon.Server('https://horizon-testnet.stellar.org')
          try {
            const account = await server.loadAccount(key)
            const xlmBalance = account.balances.find(
              (balance: any) => balance.asset_type === 'native'
            )
            setBalance(xlmBalance?.balance || '0')
          } catch (err) {
            console.log('Account not found on network:', err)
            setBalance('0')
          }
        }
      }
    } catch (err) {
      console.log('Wallet not connected:', err)
    }
  }

  const connect = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Request access to the wallet
      const response = await requestAccess()

      if (response.error) {
        throw new Error(response.error.message || 'Failed to connect to Freighter')
      }

      const key = response.address
      setPublicKey(key)
      setIsConnected(true)

      // Fetch balance with the key directly
      if (key) {
        const server = new Horizon.Server('https://horizon-testnet.stellar.org')
        try {
          const account = await server.loadAccount(key)
          const xlmBalance = account.balances.find(
            (balance: any) => balance.asset_type === 'native'
          )
          setBalance(xlmBalance?.balance || '0')
        } catch (err) {
          console.log('Account not found on network:', err)
          setBalance('0')
        }
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to connect wallet'
      setError(errorMessage)
      console.error('Wallet connection error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setPublicKey(null)
    setBalance('0')
    setError(null)
  }

  const getAccountBalance = async (): Promise<string> => {
    if (!publicKey) return '0'

    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org')
      const account = await server.loadAccount(publicKey)
      const xlmBalance = account.balances.find(
        (balance: any) => balance.asset_type === 'native'
      )
      const balanceValue = xlmBalance?.balance || '0'
      setBalance(balanceValue)
      return balanceValue
    } catch (err) {
      console.error('Failed to fetch balance:', err)
      return '0'
    }
  }

  const signTransactionInternal = async (transactionXDR: string): Promise<string> => {
    try {
      const response = await signTransaction(transactionXDR, {
        networkPassphrase: Networks.TESTNET
      })

      if (response.error) {
        throw new Error(response.error.message || 'Failed to sign transaction')
      }

      return response.signedTxXdr
    } catch (err: any) {
      console.error('Failed to sign transaction:', err)
      throw new Error(err?.message || 'Failed to sign transaction')
    }
  }

  const createTrancheTokens = async (amount: number, trancheType: 'senior' | 'junior') => {
    if (!publicKey) throw new Error('Wallet not connected')

    try {
      setIsLoading(true)

      const server = new Horizon.Server('https://horizon-testnet.stellar.org')

      // Build transaction
      const account = await server.loadAccount(publicKey)
      const transaction = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(
          Operation.payment({
            destination: publicKey,
            asset: Asset.native(),
            amount: amount.toString()
          })
        )
        .addMemo(Memo.text(`Mint ${trancheType} tranche tokens`))
        .setTimeout(30)
        .build()

      // Sign and submit transaction
      const signedXDR = await signTransactionInternal(transaction.toXDR())
      const signedTx = TransactionBuilder.fromXDR(signedXDR, Networks.TESTNET)
      const result = await server.submitTransaction(signedTx as any)

      await getAccountBalance()
      return result.hash
    } catch (err) {
      setError('Failed to create tranche tokens')
      console.error('Mint error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const investInTranche = async (amount: number, trancheType: 'senior' | 'junior') => {
    if (!publicKey) throw new Error('Wallet not connected')

    try {
      setIsLoading(true)

      const server = new Horizon.Server('https://horizon-testnet.stellar.org')

      // Build investment transaction
      const account = await server.loadAccount(publicKey)
      const transaction = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(
          Operation.payment({
            destination: 'GDEM2VJKPEGKGSPMNWFZQ4QQHU5JS43JENZAZC2O2R7BA5W7G5BTLM3Y', // Pool address
            asset: Asset.native(),
            amount: amount.toString()
          })
        )
        .addMemo(Memo.text(`Invest in ${trancheType} tranche`))
        .setTimeout(30)
        .build()

      // Sign and submit transaction
      const signedXDR = await signTransactionInternal(transaction.toXDR())
      const signedTx = TransactionBuilder.fromXDR(signedXDR, Networks.TESTNET)
      const result = await server.submitTransaction(signedTx as any)

      await getAccountBalance()
      return result.hash
    } catch (err) {
      setError('Failed to invest in tranche')
      console.error('Investment error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value: WalletContextType = {
    isConnected,
    publicKey,
    balance,
    connect,
    disconnect,
    signTransaction: signTransactionInternal,
    createTrancheTokens,
    investInTranche,
    getAccountBalance,
    isLoading,
    error
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}
