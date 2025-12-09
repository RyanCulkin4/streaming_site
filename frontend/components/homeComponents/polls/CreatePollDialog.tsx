"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UserPollsType } from "@/types"

interface CreatePollDialogProps {
  newPoll: { question: string; options: string[] }
  setNewPoll: (poll: { question: string; options: string[] }) => void
  userPolls: UserPollsType[]
}

export default function CreatePollDialog({ newPoll, setNewPoll, userPolls }: CreatePollDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-violet-500">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Poll</DialogTitle>
          <DialogDescription className="text-gray-400">Ask the community what they think!</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="What's your question?"
              className="bg-gray-800 border-gray-700 text-white"
              value={newPoll.question}
              onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
            />
          </div>
          {newPoll.options.map((option, idx) => (
            <div key={idx}>
              <Label htmlFor={`option-${idx}`}>Option {idx + 1}</Label>
              <Input
                id={`option-${idx}`}
                placeholder={`Option ${idx + 1}`}
                className="bg-gray-800 border-gray-700 text-white"
                value={option}
                onChange={(e) => {
                  const updated = [...newPoll.options]
                  updated[idx] = e.target.value
                  setNewPoll({ ...newPoll, options: updated })
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ""] })}
          >
            Add Option
          </Button>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500">Create Poll</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
