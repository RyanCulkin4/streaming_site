"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPollsType } from "@shared-types/*";

interface CreatePollDialogProps {
  newPoll: { question: string; options: string[] };
  setNewPoll: React.Dispatch<React.SetStateAction<{ question: string; options: string[] }>>;
  userPolls: UserPollsType[];
}

export default function CreatePollDialog({ newPoll, setNewPoll, userPolls }: CreatePollDialogProps) {
  const addOption = () => {
    if (newPoll.options.length >= 6) return;
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...newPoll.options];
    updated[index] = value;
    setNewPoll({ ...newPoll, options: updated });
  };

  const removeOption = (index: number) => {
    if (newPoll.options.length <= 2) return;
    const updated = [...newPoll.options];
    updated.splice(index, 1);
    setNewPoll({ ...newPoll, options: updated });
  };

  const createPoll = () => {
    if (!newPoll.question.trim() || newPoll.options.some(o => !o.trim())) return;

    const newPollObj = {
      polldata: {
        id: `${Date.now()}`,
        createdAt: "Just now",
        views: 0,
        question: newPoll.question,
        totalVotes: 0,
        options: newPoll.options.map((opt, idx) => ({ id: idx + 1, text: opt, votes: 0 })),
        comments: [],
      },
      OP: {
        authorId: "current-user",
        authorUser: "You",
        authorpfp: "/placeholder.svg?height=40&width=40",
      },
    };

    userPolls.splice(1, 0, newPollObj); // insert after hot topic

    setNewPoll({ question: "", options: ["", ""] });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pink-600 hover:bg-pink-700 whitespace-nowrap">
          Create Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-indigo-950 border-purple-800 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Poll</DialogTitle>
          <DialogDescription className="text-gray-300">
            Ask the community a question and provide options for them to vote on.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="What do you want to ask?"
              className="bg-indigo-900/50 border-purple-800 text-white"
              value={newPoll.question}
              onChange={e => setNewPoll({ ...newPoll, question: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Options</Label>
            {newPoll.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  className="bg-indigo-900/50 border-purple-800 text-white"
                  value={option}
                  onChange={e => updateOption(index, e.target.value)}
                />
                {newPoll.options.length > 2 && (
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => removeOption(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <Button variant="outline" size="sm" className="mt-2 border-purple-800 text-white hover:bg-purple-900/30" onClick={addOption}>
              Add Option
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={createPoll}>
            Create Poll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
