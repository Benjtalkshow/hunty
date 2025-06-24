"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface GameCardProps {
  title: string
  type: "crossbites" | "hunty"
  onClick?: () => void
}

export function GameCard({ title, type, onClick }: GameCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
      <div className="bg-purple-200 rounded-2xl p-4 mb-4">
        {type === "crossbites" ? (
          <div className="p-4">
            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                W
              </div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>

              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>

              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                G
              </div>
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                R
              </div>
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                E
              </div>
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center text-white font-bold">
                T
              </div>

              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>

              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl p-4 text-white">
            <div className="text-sm mb-2">What is the fastest bird?</div>
            <div className="text-xs mb-4 opacity-80">Choose the correct answer from the options below</div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=120&width=200"
                alt="Bird illustration"
                width={200}
                height={120}
                className="rounded-lg mx-auto"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full text-xs">
                PLAY NOW
              </Button>
              <div className="text-xs opacity-80">⏱️</div>
            </div>
          </div>
        )}
      </div>
      <Button
        onClick={onClick}
        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-full text-lg font-semibold"
      >
        {title}
      </Button>
    </div>
  )
}
