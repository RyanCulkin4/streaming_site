"use client";

import { use } from "react";
import { useState } from "react";
import {
  BarChart2, ChevronRight, PlusCircle, Search,
} from "lucide-react";

import type { UserPollsType, CommentsType } from "@shared-types/*";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HotTopicCard from "./polls/HotTopicCard";
import CreatePollDialog from "./polls/CreatePollDialog";
import PollCard from "./polls/PollCard";



interface UserPollsContentProps {
  userPollsPromise: Promise<UserPollsType[] | null>;
}

export default function UserPollsContent({ userPollsPromise }: UserPollsContentProps) {
  const userPolls = use(userPollsPromise);
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
  const [searchQuery, setSearchQuery] = useState("");

   if (!userPolls) {
    return <p className="p-4 text-red-400">Error loading site data.</p>;
  }

  const handleVote = (pollId: string, optionId: number) => {
    if (userVotes[pollId]) return;

    const updatedPolls = userPolls.map(poll =>
      poll.polldata.id === pollId
        ? {
            ...poll,
            polldata: {
              ...poll.polldata,
              options: poll.polldata.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              ),
              totalVotes: poll.polldata.totalVotes + 1,
            },
          }
        : poll
    );

    Object.assign(userPolls, updatedPolls); // mutate or use a setter if this is tracked state
    setUserVotes({ ...userVotes, [pollId]: optionId });
  };

  const hotTopicPoll = userPolls[0];
  const filteredPolls = userPolls
    .slice(1)
    .filter(p =>
      p.polldata.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
   <section
      id="polls"
      className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-b from-purple-950 to-indigo-950 min-h-screen snap-start snap-always flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="space-y-6 overflow-hidden">
          {hotTopicPoll && (
            <HotTopicCard
              poll={hotTopicPoll}
              userVote={userVotes[hotTopicPoll.polldata.id]}
              onVote={handleVote}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search polls..."
                className="pl-10 bg-indigo-950/50 border-purple-800 text-white"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <CreatePollDialog newPoll={newPoll} setNewPoll={setNewPoll} userPolls={userPolls} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-450px)] overflow-y-auto pr-1">
            {filteredPolls.map(poll => (
              <PollCard
                key={poll.polldata.id}
                poll={poll}
                userVote={userVotes[poll.polldata.id]}
                onVote={handleVote}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a href="#news" className="animate-bounce">
            <ChevronRight className="h-8 w-8 rotate-90 text-white/70 hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-center mb-14 mt-6">
      <BarChart2 className="h-8 w-8 text-pink-500 mr-3" />
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Community Polls
      </h2>
    </div>
  );
}
