import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CommentsType } from "@shared-types/*";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPercentage(votes: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((votes / total) * 100);
}

export function countTotalComments(comments?: CommentsType[]): number {
  if (!comments || comments.length === 0) return 0;
  return comments.reduce((total, comment) => {
    let count = 1;
    if (comment.commentdata.replies && comment.commentdata.replies.length > 0) {
      count += countTotalComments(comment.commentdata.replies);
    }
    return total + count;
  }, 0);
}
