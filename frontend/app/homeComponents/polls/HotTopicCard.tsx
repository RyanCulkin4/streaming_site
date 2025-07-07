"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { countTotalComments, getPercentage } from "@/lib/utils/utils";
import { UserPollsType } from "@shared-types/*";

interface PollCardProps {
  poll: UserPollsType;
  userVote?: number;
  onVote: (pollId: string, optionId: number) => void;
}

export default function HotTopicCard({ poll, userVote, onVote }: PollCardProps) {
  const hasVoted = userVote !== undefined;

  return (
    <Card className="bg-gradient-to-br from-indigo-950 to-purple-900 border-pink-500 text-white mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-2">
              <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">HOT TOPIC</span>
              <span className="text-gray-300 text-sm">{poll.polldata.createdAt}</span>
            </div>
            <CardTitle className="text-2xl">{poll.polldata.question}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {poll.polldata.options.map(option => {
          const percentage = getPercentage(option.votes, poll.polldata.totalVotes);
          const isSelected = userVote === option.id;

          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-lg ${isSelected ? "text-pink-400 font-bold" : "text-gray-200"}`}>{option.text}</span>
                <span className="text-lg font-medium">{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className={`h-3 ${isSelected ? "bg-purple-900" : "bg-indigo-900"}`}
              />
              {!hasVoted && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 hover:bg-pink-600/20 hover:text-pink-400 border-purple-800"
                  onClick={() => onVote(poll.polldata.id, option.id)}
                >
                  Vote
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-purple-800 pt-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={poll.OP.authorpfp || "/placeholder.svg"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-300">
            {poll.OP.authorUser}
            {poll.OP.authorId.startsWith("admin") && (
              <span className="ml-1 text-xs bg-purple-700 text-white px-1.5 py-0.5 rounded">Admin</span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <button className="flex items-center space-x-1 hover:text-white">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{countTotalComments(poll.polldata.comments)}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-white">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
