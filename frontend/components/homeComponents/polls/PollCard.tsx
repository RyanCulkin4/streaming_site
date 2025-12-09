"use client"

import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UserPollsType } from "@/types"

interface PollCardProps {
  poll: UserPollsType
  userVote?: number
  onVote: (pollId: string, optionId: number) => void
}

export default function PollCard({ poll, userVote, onVote }: PollCardProps) {
  const { polldata } = poll

  return (
    <Card className="group bg-gradient-to-br from-purple-950/40 to-purple-900/30 border border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Badge variant="outline" className="text-xs bg-purple-500/20 border-purple-400/40 text-purple-300">
            {polldata.category}
          </Badge>
        </div>
        <CardTitle className="text-base text-gray-100 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {polldata.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {polldata.options.map((option) => {
          const percentage = polldata.totalVotes > 0 ? (option.votes / polldata.totalVotes) * 100 : 0
          const isSelected = userVote === option.id

          return (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              className={`w-full h-auto py-3 px-4 justify-start relative overflow-hidden transition-all duration-300 ${
                isSelected
                  ? "border-purple-400 bg-purple-500/30 shadow-md shadow-purple-500/20"
                  : "border-purple-500/30 bg-purple-950/30 hover:border-purple-400/50 hover:bg-purple-500/20"
              }`}
              onClick={() => onVote(polldata.id, option.id)}
              disabled={!!userVote}
            >
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 transition-all duration-500"
                style={{ width: userVote ? `${percentage}%` : "0%" }}
              />

              <span className="relative z-10 flex-1 text-left text-gray-200 text-sm font-medium truncate">
                {option.text}
              </span>

              {userVote && (
                <span className="relative z-10 text-sm font-bold text-purple-300">{percentage.toFixed(0)}%</span>
              )}
            </Button>
          )
        })}

        <div className="flex items-center justify-between pt-2 text-xs text-gray-400 border-t border-purple-500/20">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-purple-400" />
            <span>{polldata.totalVotes.toLocaleString()}</span>
          </div>
          {polldata.endDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-pink-400" />
              <span>{polldata.endDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}