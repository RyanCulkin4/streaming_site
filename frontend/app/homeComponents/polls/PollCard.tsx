"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function PollCard({ poll, userVote, onVote }: PollCardProps) {
  const hasVoted = userVote !== undefined;

  return (
    <Card className="bg-indigo-950/50 border-purple-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{poll.polldata.question}</CardTitle>
        <CardDescription className="text-gray-300 flex justify-between text-xs">
          <span>{poll.polldata.totalVotes.toLocaleString()} votes</span>
          <span>{poll.polldata.createdAt}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 py-2">
        {poll.polldata.options.map(option => {
          const percentage = getPercentage(option.votes, poll.polldata.totalVotes);
          const isSelected = userVote === option.id;

          return (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className={`text-xs ${isSelected ? "text-pink-400 font-bold" : "text-gray-200"}`}>
                  {option.text}
                </span>
                <span className="text-xs font-medium">{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${isSelected ? "bg-purple-900" : "bg-indigo-900"}`}
              />
              {!hasVoted && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-xs hover:bg-pink-600/20 hover:text-pink-400 h-6 px-2"
                  onClick={() => onVote(poll.polldata.id, option.id)}
                >
                  Vote
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-purple-800 pt-3 pb-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={poll.OP.authorpfp || "/placeholder.svg"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-300">
            {poll.OP.authorUser}
            {poll.OP.authorId.startsWith("admin") && (
              <span className="ml-1 text-xs bg-purple-700 text-white px-1 py-0.5 rounded text-[10px]">Admin</span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-gray-400">
          <button className="flex items-center space-x-1 hover:text-white">
            <MessageSquare className="h-3 w-3" />
            <span className="text-[10px]">{countTotalComments(poll.polldata.comments)}</span>
          </button>
          <button className="flex items-center hover:text-white">
            <Share2 className="h-3 w-3" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
