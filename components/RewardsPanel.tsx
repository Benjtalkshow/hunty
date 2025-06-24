"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus, X } from "lucide-react"

interface Reward {
  place: number
  amount: number
  icon: string
}

interface RewardsPanelProps {
  rewards: Reward[]
  onUpdateReward: (place: number, amount: number) => void
}

export function RewardsPanel({ rewards, onUpdateReward }: RewardsPanelProps) {
  return (
    <div className="space-y-6">
      {rewards.map((reward) => (
        <div key={reward.place} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{reward.icon}</span>
            <span className="font-semibold">{reward.place === 1 ? "1st" : "2nd"} Place</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onUpdateReward(reward.place, Math.max(0, reward.amount - 0.1))}
              className="w-6 h-6"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded">
              <span className="text-orange-500">💰</span>
              <span className="font-medium">{reward.amount}</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onUpdateReward(reward.place, reward.amount + 0.1)}
              className="w-6 h-6"
            >
              <Plus className="w-3 h-3" />
            </Button>
            <Button size="icon" variant="ghost" className="w-6 h-6 bg-red-500 text-white rounded-full ml-2">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}

      <Button className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full">
        Add Reward for Runner-up
      </Button>
    </div>
  )
}
