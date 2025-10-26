# Backend Contract Integration Guide

This document explains how the Stellar/Soroban smart contracts have been integrated into the frontend application.

## Overview

The application now connects to deployed Soroban smart contracts on Stellar Testnet, including:
- Token contracts (RWA_UST, USDC, XLM, BLND, wETH, wBTC)
- Blend Protocol contracts (lending pools, backstop, etc.)

## Files Added

### 1. Contract Configuration ([config/contracts.ts](config/contracts.ts))

Contains all contract addresses and network configuration:

```typescript
export const TOKEN_CONTRACTS = {
  XLM: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  BLND: 'CAG5ROT3YECQJ7UOQLRE2XDP2IBYUGNFZYX3344IT2WYIO4DDEDWSMJY',
  USDC: 'CCTS5IK6Y6G7KBSX6ELCK7WXKCBJZ3JDCKBHDXWA3XO2CA5VDXOMALCB',
  wETH: 'CCLTXT3BUCI5URJUQ3BL3CGFDZRQWA6NV3SMPJHWNCI7MQEZTVG5ZOOB',
  wBTC: 'CDTM4O4VBFCVHZPTRWYAGC6I34NGR2I4IYQWUUA77NGW3HSQA3YBK7MN',
  RWA_UST: 'CCA2BWGKIB7TU5VWHZSRDSGQPSIROSHGE4RUXOW4S6RMGU4DK5EXO7BN'
}

export const BLEND_CONTRACTS = {
  testnetV2Pool: 'CD24SABPPEFJHQ4D5UEVAV52SUYHDERKKBNWX2PUGVPSJ6NCOEJVBLTQ',
  backstopV2: 'CBZUX663L2O2JD7QXVYTSL55RPWOP2RBIFFAFKET3FTB3K3MPENG3M2J',
  // ... more contracts
}
```

### 2. Contract Helper Utilities ([utils/contractHelpers.ts](utils/contractHelpers.ts))

Provides helper functions for interacting with contracts:

**Token Operations:**
- `tokenHelpers.getBalance(tokenAddress, accountAddress)` - Get token balance
- `tokenHelpers.transfer(tokenAddress, from, to, amount)` - Transfer tokens
- `tokenHelpers.approve(tokenAddress, owner, spender, amount, expiration)` - Approve spending

**Blend Pool Operations:**
- `blendPoolHelpers.supply(poolAddress, from, tokenAddress, amount)` - Supply to pool
- `blendPoolHelpers.withdraw(poolAddress, from, tokenAddress, amount)` - Withdraw from pool
- `blendPoolHelpers.borrow(poolAddress, from, tokenAddress, amount)` - Borrow from pool
- `blendPoolHelpers.repay(poolAddress, from, tokenAddress, amount)` - Repay to pool
- `blendPoolHelpers.getPosition(poolAddress, userAddress)` - Get user position

**Utility Functions:**
- `formatTokenAmount(amount, decimals)` - Format token amounts for display
- `parseTokenAmount(amount, decimals)` - Parse user input to contract format
- `submitSignedTransaction(signedXDR)` - Submit signed transactions

### 3. Updated Wallet Context ([contexts/WalletContext.tsx](contexts/WalletContext.tsx))

Extended with new methods:
- `getTokenBalance(tokenAddress)` - Get balance of any token
- `supplyToPool(tokenAddress, amount)` - Supply tokens to Blend pool
- `withdrawFromPool(tokenAddress, amount)` - Withdraw from Blend pool
- `borrowFromPool(tokenAddress, amount)` - Borrow from Blend pool
- `repayToPool(tokenAddress, amount)` - Repay borrowed tokens
- `getPoolPosition()` - Get current pool position

### 4. Example Component ([components/BlendPoolInteraction.tsx](components/BlendPoolInteraction.tsx))

A complete UI component demonstrating all pool interactions:
- Token selection
- Balance checking
- Supply/Withdraw/Borrow/Repay actions
- Position viewing
- Transaction status

## Usage Examples

### 1. Get Token Balance

```typescript
import { useWallet } from '@/contexts/WalletContext'
import { TOKEN_CONTRACTS } from '@/config/contracts'

function MyComponent() {
  const { getTokenBalance } = useWallet()

  const checkBalance = async () => {
    const balance = await getTokenBalance(TOKEN_CONTRACTS.USDC)
    console.log('USDC Balance:', balance)
  }
}
```

### 2. Supply to Pool

```typescript
import { useWallet } from '@/contexts/WalletContext'
import { TOKEN_CONTRACTS } from '@/config/contracts'

function SupplyComponent() {
  const { supplyToPool } = useWallet()

  const supply = async () => {
    try {
      // Supply 100 USDC to the pool
      const txHash = await supplyToPool(TOKEN_CONTRACTS.USDC, '100')
      console.log('Transaction hash:', txHash)
    } catch (error) {
      console.error('Supply failed:', error)
    }
  }
}
```

### 3. Borrow from Pool

```typescript
import { useWallet } from '@/contexts/WalletContext'
import { TOKEN_CONTRACTS } from '@/config/contracts'

function BorrowComponent() {
  const { borrowFromPool } = useWallet()

  const borrow = async () => {
    try {
      // Borrow 50 USDC from the pool
      const txHash = await borrowFromPool(TOKEN_CONTRACTS.USDC, '50')
      console.log('Transaction hash:', txHash)
    } catch (error) {
      console.error('Borrow failed:', error)
    }
  }
}
```

### 4. Get Pool Position

```typescript
import { useWallet } from '@/contexts/WalletContext'

function PositionComponent() {
  const { getPoolPosition } = useWallet()

  const checkPosition = async () => {
    const position = await getPoolPosition()
    console.log('Pool position:', position)
  }
}
```

## Network Configuration

The application is configured for **Stellar Testnet**:
- Horizon URL: `https://horizon-testnet.stellar.org`
- Soroban RPC: `https://soroban-testnet.stellar.org`
- Network Passphrase: `Test SDF Network ; September 2015`

## Important Notes

1. **Token Decimals**: Most Stellar tokens use 7 decimals. The helper functions handle conversion automatically.

2. **Transaction Signing**: All transactions require user approval via Freighter wallet.

3. **Gas Fees**: Transactions on Stellar are very low cost, but users need a small amount of XLM for fees.

4. **Error Handling**: Always wrap contract calls in try-catch blocks as transactions can fail for various reasons (insufficient balance, network issues, etc.).

5. **Loading States**: Use the `isLoading` state from WalletContext to show loading indicators during transactions.

## Contract Addresses Reference

### Main Pool
- **Testnet V2 Pool**: `CD24SABPPEFJHQ4D5UEVAV52SUYHDERKKBNWX2PUGVPSJ6NCOEJVBLTQ`

### Tokens
- **RWA_UST**: `CCA2BWGKIB7TU5VWHZSRDSGQPSIROSHGE4RUXOW4S6RMGU4DK5EXO7BN`
- **USDC**: `CCTS5IK6Y6G7KBSX6ELCK7WXKCBJZ3JDCKBHDXWA3XO2CA5VDXOMALCB`
- **XLM**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- **BLND**: `CAG5ROT3YECQJ7UOQLRE2XDP2IBYUGNFZYX3344IT2WYIO4DDEDWSMJY`
- **wETH**: `CCLTXT3BUCI5URJUQ3BL3CGFDZRQWA6NV3SMPJHWNCI7MQEZTVG5ZOOB`
- **wBTC**: `CDTM4O4VBFCVHZPTRWYAGC6I34NGR2I4IYQWUUA77NGW3HSQA3YBK7MN`

## Testing

To test the integration:

1. Make sure you have Freighter wallet installed
2. Switch to Stellar Testnet in Freighter
3. Get testnet XLM from the faucet: https://friendbot.stellar.org
4. Import the `BlendPoolInteraction` component into your app
5. Try the different operations (supply, withdraw, borrow, repay)

## Next Steps

- Add more advanced pool features (liquidations, flash loans, etc.)
- Implement transaction history tracking
- Add APY/APR calculations and display
- Create dashboard showing all user positions across pools
- Add notifications for successful/failed transactions

## Support

For issues or questions:
- Check the Stellar documentation: https://developers.stellar.org
- Blend Protocol docs: https://docs.blend.capital
- Soroban smart contracts: https://soroban.stellar.org
