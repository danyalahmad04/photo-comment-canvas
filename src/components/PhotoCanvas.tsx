
import React, { useState, useRef } from 'react';
import CommentMarker from './CommentMarker';
import { Comment, PhotoWithComments } from '@/types';
import AddCommentForm from './AddCommentForm';

interface PhotoCanvasProps {
  photo: PhotoWithComments;
  activeCommentId: string | null;
  onCommentClick: (id: string) => void;
  onAddComment: (x: number, y: number, text: string, author: string) => void;
}

const PhotoCanvas: React.FC<PhotoCanvasProps> = ({ 
  photo, 
  activeCommentId, 
  onCommentClick, 
  onAddComment 
}) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleImageClick = (e: React.MouseEvent) => {
    if (isAddingComment) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setClickPosition({ x, y });
      setIsAddingComment(true);
    }
  };
  
  const handleAddComment = (text: string, author: string) => {
    onAddComment(clickPosition.x, clickPosition.y, text, author);
    setIsAddingComment(false);
  };
  
  const handleCancelAdd = () => {
    setIsAddingComment(false);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-crosshair"
      onClick={handleImageClick}
    >
      <img 
        src={photo.url}
        alt={photo.title}
        className="max-w-full max-h-full object-contain"
      />
      
      {photo.comments.map((comment) => (
        <CommentMarker 
          key={comment.id}
          comment={comment} 
          onClick={(e) => {
            e.stopPropagation();
            onCommentClick(comment.id);
          }}
          isActive={comment.id === activeCommentId}
        />
      ))}
      
      {isAddingComment && (
        <AddCommentForm 
          position={clickPosition}
          onSubmit={handleAddComment}
          onCancel={handleCancelAdd}
        />
      )}
    </div>
  );
};

export default PhotoCanvas;
