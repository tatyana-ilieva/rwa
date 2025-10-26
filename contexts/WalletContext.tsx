 'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Networks } from '@stellar/stellar-sdk'
import {
  requestAccess,
  isConnected as checkIsConnected,
  getAddress,
  signTransaction as freighterSignTransaction
} from '@stellar/freighter-api'
import {
  tokenHelpers,
  blendPoolHelpers,
  submitSignedTransaction,
  parseTokenAmount,
  formatTokenAmount
} from '@/utils/contractHelpers'
import { BLEND_CONTRACTS, TOKEN_CONTRACTS } from '@/config/contracts'

const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org'
const DEBUG = process.env.NEXT_PUBLIC_WALLET_DEBUG === '1'

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
  getTokenBalance: (tokenAddress: string) => Promise<string>
  supplyToPool: (tokenAddress: string, amount: string) => Promise<string>
  withdrawFromPool: (tokenAddress: string, amount: string) => Promise<string>
  borrowFromPool: (tokenAddress: string, amount: string) => Promise<string>
  repayToPool: (tokenAddress: string, amount: string) => Promise<string>
  getPoolPosition: () => Promise<any>
  isLoading: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) throw new Error('useWallet must be used within a WalletProvider')
  return context
}

interface WalletProviderProps { children: ReactNode }

async function submitSignedXDR(signedXDR: string) {
  const res = await fetch(`${HORIZON_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ tx: signedXDR }).toString()
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Horizon submit error: ${res.status} ${txt}`)
  }
  return res.json()
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [balance, setBalance] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { checkConnection() }, [])

  const checkConnection = async () => {
    try {
      const resp = await checkIsConnected()
      if (DEBUG) console.log('[Wallet] isConnected ->', resp)
      if (resp.error || !resp.isConnected) return
      const addressResp = await getAddress()
      if (addressResp.error) return
      setPublicKey(addressResp.address)
      setIsConnected(true)
      await getAccountBalance()
    } catch (err) { if (DEBUG) console.error('[Wallet] checkConnection error', err) }
  }

  const connect = async () => {
    try {
      setIsLoading(true); setError(null)
      const resp = await requestAccess()
      if ((resp as any).error) throw new Error((resp as any).error?.message || 'Failed to connect')
      setPublicKey((resp as any).address || null)
      setIsConnected(true)
      await getAccountBalance()
    } catch (err: any) { setError(err?.message || 'Failed to connect'); throw err } finally { setIsLoading(false) }
  }

  const disconnect = () => { setIsConnected(false); setPublicKey(null); setBalance('0'); setError(null) }

  const getAccountBalance = async (): Promise<string> => {
    if (!publicKey) return '0'
    try {
      const res = await fetch(`${HORIZON_URL}/accounts/${publicKey}`)
      if (!res.ok) return '0'
      const data = await res.json()
      const xlm = data.balances?.find((b: any) => b.asset_type === 'native')
      const value = xlm?.balance || '0'
      setBalance(value)
      return value
    } catch (err) { if (DEBUG) console.error('[Wallet] getAccountBalance error', err); return '0' }
  }

  const signTransactionInternal = async (transactionXDR: string): Promise<string> => {
    try {
      const response = await freighterSignTransaction(transactionXDR, { networkPassphrase: Networks.TESTNET })
      if (DEBUG) console.log('[Wallet] freighter sign ->', response)
      return (response as any).signedTxXdr || (response as any).signedTransaction || ''
    } catch (err) { if (DEBUG) console.error('[Wallet] freighter sign error ->', err); throw err }
  }

  const getTokenBalance = async (tokenAddress: string): Promise<string> => {
    if (!publicKey) return '0'
    try { const b = await tokenHelpers.getBalance(tokenAddress, publicKey); return formatTokenAmount(b) } catch (err) { if (DEBUG) console.error(err); return '0' }
  }

  const supplyToPool = async (tokenAddress: string, amount: string): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try { setIsLoading(true); setError(null); const amountParsed = parseTokenAmount(amount); const pool = BLEND_CONTRACTS.testnetV2Pool; const tx = await blendPoolHelpers.supply(pool, publicKey, tokenAddress, amountParsed); const signedXDR = await signTransactionInternal(tx.toXDR()); const res = await submitSignedTransaction(signedXDR); await getAccountBalance(); return res.hash } catch (err: any) { setError(err?.message || 'Failed to supply to pool'); throw err } finally { setIsLoading(false) }
  }

  const withdrawFromPool = async (tokenAddress: string, amount: string): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try { setIsLoading(true); setError(null); const amountParsed = parseTokenAmount(amount); const pool = BLEND_CONTRACTS.testnetV2Pool; const tx = await blendPoolHelpers.withdraw(pool, publicKey, tokenAddress, amountParsed); const signedXDR = await signTransactionInternal(tx.toXDR()); const res = await submitSignedTransaction(signedXDR); await getAccountBalance(); return res.hash } catch (err: any) { setError(err?.message || 'Failed to withdraw from pool'); throw err } finally { setIsLoading(false) }
  }

  const borrowFromPool = async (tokenAddress: string, amount: string): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try { setIsLoading(true); setError(null); const amountParsed = parseTokenAmount(amount); const pool = BLEND_CONTRACTS.testnetV2Pool; const tx = await blendPoolHelpers.borrow(pool, publicKey, tokenAddress, amountParsed); const signedXDR = await signTransactionInternal(tx.toXDR()); const res = await submitSignedTransaction(signedXDR); await getAccountBalance(); return res.hash } catch (err: any) { setError(err?.message || 'Failed to borrow from pool'); throw err } finally { setIsLoading(false) }
  }

  const repayToPool = async (tokenAddress: string, amount: string): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try { setIsLoading(true); setError(null); const amountParsed = parseTokenAmount(amount); const pool = BLEND_CONTRACTS.testnetV2Pool; const tx = await blendPoolHelpers.repay(pool, publicKey, tokenAddress, amountParsed); const signedXDR = await signTransactionInternal(tx.toXDR()); const res = await submitSignedTransaction(signedXDR); await getAccountBalance(); return res.hash } catch (err: any) { setError(err?.message || 'Failed to repay to pool'); throw err } finally { setIsLoading(false) }
  }

  const getPoolPosition = async (): Promise<any> => {
    if (!publicKey) return null
    try { const pool = BLEND_CONTRACTS.testnetV2Pool; return await blendPoolHelpers.getPosition(pool, publicKey) } catch (err) { if (DEBUG) console.error(err); return null }
  }

  // Implement tranche-related functions using existing pool supply flow for demo purposes.
  // Note: Proper tranche minting may require admin-only contract calls; this uses supplyToPool
  // to move RWA tokens to the pool and acts as an investment for the demo.
  const createTrancheTokens = async (amount: number, _trancheType: 'senior' | 'junior'): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try {
      setIsLoading(true); setError(null)
      // treat `amount` as decimal units (e.g., 1000 -> "1000")
      const hash = await supplyToPool(TOKEN_CONTRACTS.RWA_UST, String(amount))
      return hash
    } catch (err: any) {
      setError(err?.message || 'Failed to create tranche tokens')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const investInTranche = async (amount: number, _trancheType: 'senior' | 'junior'): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected')
    try {
      setIsLoading(true); setError(null)
      const hash = await supplyToPool(TOKEN_CONTRACTS.RWA_UST, String(amount))
      return hash
    } catch (err: any) {
      setError(err?.message || 'Failed to invest in tranche')
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
    getTokenBalance,
    supplyToPool,
    withdrawFromPool,
    borrowFromPool,
    repayToPool,
    getPoolPosition,
    isLoading,
    error
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}
