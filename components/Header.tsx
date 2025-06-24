"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isConnected: boolean
  balance: string
  walletAddress: string
  onConnectWallet: () => void
  onDisconnect: () => void
}

export function Header({ isConnected, balance, walletAddress, onConnectWallet, onDisconnect }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-8 max-w-[1600px] mx-40 pb-12">
              <Image src="/icons/logo.png" alt="Logo" width={72} height={72} />
      
      {isConnected ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="bg-gradient-to-br from-[#3737A4] to-[#0C0C4F] bg-clip-text text-transparent text-sm font-medium"> {balance}</span>
          </div>
          <Button onClick={onDisconnect} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full">
            {walletAddress}
          </Button>
        </div>
      ) : (
        <Button onClick={onConnectWallet} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full">
          Connect Wallet
        </Button>
      )}
    </header>
  )
}
