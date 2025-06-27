'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false)

  // Red gradient for enabled (ON) state, Green for disabled (OFF) state
  const borderGradient = enabled
    ? 'bg-gradient-to-b from-[#A43751] to-[#4F0C14]' // Red
    : 'bg-gradient-to-b from-[#39A437] to-[#194F0C]' // Green

  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-20 h-10 rounded-2xl cursor-pointer p-0.5 transition-colors ${borderGradient} shadow-[inset_0_-6px_8px_#0909343D]`}
    >
      <div className="w-full h-full bg-white rounded-xl flex items-center">
        <motion.div
          animate={{ x: enabled ? 36 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
            enabled ? 'bg-[#800022]' : 'bg-white'
          }`}
        >
          {enabled ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="check-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#39A437" />
                  <stop offset="100%" stopColor="#194F0C" />
                </linearGradient>
              </defs>
              <path
                d="M5 13l4 4L19 7"
                stroke="url(#check-gradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.div>
      </div>
    </div>
  )
}