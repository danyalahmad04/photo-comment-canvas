
import React from 'react';
import { Comment } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';

interface CommentMarkerProps {
  comment: Comment;
  onClick: () => void;
  isActive: boolean;
}

const CommentMarker: React.FC<CommentMarkerProps> = ({ comment, onClick, isActive }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute rounded-full border-2 ${
              isActive ? 'border-comment bg-comment text-white' : 'border-comment bg-white text-comment'
            } h-6 w-6 flex items-center justify-center cursor-pointer hover:bg-comment hover:text-white transition-colors`}
            style={{
              left: `${comment.x}px`,
              top: `${comment.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 20 : 10,
            }}
            onClick={onClick}
          >
            <span className="text-xs font-bold">{comment.id.slice(1, 2)}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-sm font-medium">{comment.author}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommentMarker;
