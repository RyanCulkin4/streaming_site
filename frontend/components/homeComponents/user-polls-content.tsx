"use client"

import { use } from "react"
import { useState } from "react"
import { Search, TrendingUp } from "lucide-react"

import type { UserPollsType } from "../../../shared/types"
import { Input } from "@/components/ui/input"
import HotTopicCard from "./polls/HotTopicCard"
import CreatePollDialog from "./polls/CreatePollDialog"
import PollCard from "./polls/PollCard"

interface UserPollsContentProps {
  userPollsPromise: Promise<UserPollsType[] | null>
}

export default function UserPollsContent({ userPollsPromise }: UserPollsContentProps) {
  const userPolls = use(userPollsPromise)
  const [userVotes, setUserVotes] = useState<Record<string, number>>({})
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] })
  const [searchQuery, setSearchQuery] = useState("")

  if (!userPolls) {
    return <p className="p-4 text-red-400">Error loading site data.</p>
  }

  const handleVote = (pollId: string, optionId: number) => {
    if (userVotes[pollId]) return

    const updatedPolls = userPolls.map((poll) =>
      poll.polldata.id === pollId
        ? {
            ...poll,
            polldata: {
              ...poll.polldata,
              options: poll.polldata.options.map((opt) =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt,
              ),
              totalVotes: poll.polldata.totalVotes + 1,
            },
          }
        : poll,
    )

    Object.assign(userPolls, updatedPolls)
    setUserVotes({ ...userVotes, [pollId]: optionId })
  }

  const hotTopicPoll = userPolls[0]
  const filteredPolls = userPolls
    .slice(1)
    .filter((p) => p.polldata.question.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <TrendingUp className="h-7 w-7 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Community Polls
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Share your opinion with the community</p>
        </div>

        <div className="space-y-8">
          {hotTopicPoll && (
            <HotTopicCard poll={hotTopicPoll} userVote={userVotes[hotTopicPoll.polldata.id]} onVote={handleVote} />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <Input
                placeholder="Search polls..."
                className="pl-12 h-12 bg-purple-950/30 border-purple-500/30 text-gray-200 placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CreatePollDialog newPoll={newPoll} setNewPoll={setNewPoll} userPolls={userPolls} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolls.map((poll) => (
              <PollCard key={poll.polldata.id} poll={poll} userVote={userVotes[poll.polldata.id]} onVote={handleVote} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
