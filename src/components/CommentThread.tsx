
import React from 'react';
import { Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CommentThreadProps {
  comments: Comment[];
  activeCommentId: string | null;
  onSelectComment: (id: string) => void;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comments, activeCommentId, onSelectComment }) => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold py-4 px-4">Comments ({comments.length})</h2>
      <Separator />
      <ScrollArea className="flex-1">
        {comments.length > 0 ? (
          <div className="divide-y">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${comment.id === activeCommentId ? 'bg-gray-100' : ''}`}
                onClick={() => onSelectComment(comment.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{comment.author}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No comments yet. Click on the image to add a comment.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default CommentThread;
