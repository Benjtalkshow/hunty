"use client"

import { ReactNode, useState, useEffect } from "react"
import { get_hunt_leaderboard } from "@/lib/contracts/hunt"
import Medal from "@/components/icons/Medal"

interface LeaderboardEntry {
  position: number
  name: string
  points: number
  icon: ReactNode
}

interface LeaderboardTableProps {
  data?: LeaderboardEntry[]
  huntId?: number
}

const truncateAddress = (address: string) => {
  if (!address) return ""
  if (address.length <= 10) return address
  return `${address.slice(0, 5)}...${address.slice(-3)}`
}

export function LeaderboardTable({ data: initialData, huntId }: LeaderboardTableProps) {
  const [data, setData] = useState<LeaderboardEntry[]>(initialData || []);
  const containerClass = "rounded-none max-w-2xl mx-auto";

  useEffect(() => {
    if (huntId === undefined) return;

    const fetchData = async () => {
      try {
        const scores = await get_hunt_leaderboard(huntId);

        // Sort by points descending
        scores.sort((a, b) => b.points - a.points);

        const entries: LeaderboardEntry[] = scores.map((score, index) => {
          const position = index + 1;
          const displayName = score.name || truncateAddress(score.walletAddress);
          let icon = <Medal />;
          if (position <= 3) {
            icon = <Medal position={position} />;
          }

          return {
            position,
            name: displayName,
            points: score.points,
            icon
          };
        });

        setData(entries);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchData();

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [huntId]);

  return (
    <div className={containerClass}>
      <table className="w-full rounded-none border-l border-[#808080] border-collapse relative">
        <thead>
          <tr className="bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] text-white">
            <th className="px-4 py-2 text-center border border-r-2 border-white">Position</th>
            <th className="px-4 py-2 text-left border border-r-2 border-white">Display Name / Wallet Address</th>
            <th className="px-4 py-2 text-center">Points Won</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const isTop3 = entry.position <= 3;
            // Highlight top 3 players
            const rowClass = isTop3 ? "bg-[#f0f4ff] font-bold" : "bg-white";

            return (
              <tr key={index} className={rowClass}>
                <td className="px-4 py-2 flex items-center justify-center gap-2 text-center border-r-2 border-[#808080] border-b-2 ">
                  <span>{entry.icon}</span>
                  <span className="text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.position}</span>
                </td>
                <td className="px-4 py-2 border-r-2 border-[#808080] border-b-2 text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.name}</td>
                <td className="px-4 py-2 text-center border border-b-2 border-[#808080] text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
