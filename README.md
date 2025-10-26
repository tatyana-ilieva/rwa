# Stellar RWA - Tiered Bond Platform

> RWA-backed structured products with automated waterfall distribution on Stellar

**[🎥 Demo Video](#) | [🚀 Live Demo](#) | [📜 Smart Contract](#)**

---

## What It Does

A platform for investing in Real World Asset (RWA) backed bonds with two risk tiers:
- **Senior Tier**: Lower risk, steady returns (8.5% APY)
- **Junior Tier**: Higher risk, higher returns (15.2% APY)

When losses occur, Junior investors absorb them first, protecting Senior investors. This is standard in traditional finance but now on-chain with full transparency.

## Screenshots

### Landing Page
![Landing Page](#)

### Waterfall Distribution (The Key Feature!)
![Waterfall](#)
*Interactive simulation showing how cash flows are distributed and losses absorbed*

### Investment Flow
![Investment](#)

### Portfolio Dashboard
![Dashboard](#)

## How It Works

### Smart Contract Logic

The platform uses Soroban smart contracts on Stellar to handle:

1. **Token Minting**: Creates Senior (SRN) and Junior (JRN) tokens representing bond positions
2. **Cash Flow Distribution**: Automatically distributes returns with Senior priority
3. **Loss Absorption**: Junior tier takes losses first, protecting Senior investors

**Contract Address**: `[Contract ID here]`
**Block Explorer**: `[Stellar Expert link here]`

### Key Features

**Interactive Waterfall Diagram**: Move sliders to see real-time cash flow distribution and loss scenarios

**Loss Simulation**: Four scenarios (Normal, Minor, Moderate, Severe) that show step-by-step how losses affect each tier

**Freighter Wallet Integration**: Connect wallet, invest in tiers, mint tokens, and track portfolio - all on Stellar testnet

**Secondary Market**: Trade tier tokens with order book and price feeds

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Stellar (Soroban smart contracts)
- **Wallet**: Freighter API
- **Charts**: Recharts
- **Animations**: Framer Motion

## Project Structure

```
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Portfolio dashboard
│   ├── admin/             # Admin panel
│   └── soroban/           # Contract interaction
├── components/            # React components
│   ├── WalletConnection   # Freighter integration
│   ├── WaterfallDiagram   # Cash flow visualization
│   ├── LossSimulation     # Interactive loss scenarios
│   └── SecondaryMarket    # Trading interface
└── contexts/
    └── WalletContext      # Wallet state management
```

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What Makes This Special

Most DeFi platforms have simple lending/borrowing. This brings **structured finance** from TradFi to crypto:

- **Risk Tranching**: Different risk/return profiles
- **Waterfall Distribution**: Priority-based payouts
- **RWA Backing**: Real assets (US Treasuries) as collateral
- **Full Transparency**: All on-chain, auditable

Traditional structured products are complex and opaque. We make them simple and transparent.

## Demo Video

[📹 Watch Full Walkthrough](#)

In this video I show:
- How the waterfall works
- Connecting Freighter wallet
- Investing in tiers
- Real transactions on testnet
- Portfolio tracking
- Code structure walkthrough

## Live Demo

**Try it yourself**: [https://stellar-rwa.vercel.app](#)

Need testnet XLM? Use the [Stellar Laboratory Faucet](https://laboratory.stellar.org/#account-creator?network=test)

## Future Plans

- Multi-asset pools (corporate bonds, real estate)
- Automated rebalancing
- Governance for tier parameters
- Cross-chain bridges

---

Built for [Stellar Hackathon Name] | [Your Name] | 2025
