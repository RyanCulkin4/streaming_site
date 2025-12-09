"use client"

import { Flame, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UserPollsType } from "@/types"

interface HotTopicCardProps {
  poll: UserPollsType
  userVote?: number
  onVote: (pollId: string, optionId: number) => void
}

export default function HotTopicCard({ poll, userVote, onVote }: HotTopicCardProps) {
  const { polldata } = poll

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse" />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <Flame className="h-6 w-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Hot Topic</h3>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                {polldata.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <h4 className="text-xl font-semibold text-gray-100 leading-relaxed">{polldata.question}</h4>

        <div className="space-y-3">
          {polldata.options.map((option) => {
            const percentage = polldata.totalVotes > 0 ? (option.votes / polldata.totalVotes) * 100 : 0
            const isSelected = userVote === option.id

            return (
              <Button
                key={option.id}
                variant="outline"
                className={`w-full h-auto py-4 px-5 justify-start relative overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "border-2 border-purple-400 bg-purple-500/30 shadow-lg shadow-purple-500/30"
                    : "border-purple-500/30 bg-purple-950/30 hover:border-purple-400/50 hover:bg-purple-500/20"
                } ${!userVote && "hover:scale-[1.02]"}`}
                onClick={() => onVote(polldata.id, option.id)}
                disabled={!!userVote}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 transition-all duration-700 ease-out"
                  style={{ width: userVote ? `${percentage}%` : "0%" }}
                />

                <span className="relative z-10 flex-1 text-left text-white font-medium text-base">{option.text}</span>

                {userVote && (
                  <span className="relative z-10 text-lg font-bold text-purple-300">{percentage.toFixed(1)}%</span>
                )}
              </Button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 border-t border-purple-500/20">
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium">{polldata.totalVotes.toLocaleString()} votes</span>
          </div>
          <div className="w-px h-4 bg-purple-500/30" />
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="h-4 w-4 text-pink-400" />
            <span className="text-sm">Ends {polldata.endDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
