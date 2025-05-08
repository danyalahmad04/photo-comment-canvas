
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AddCommentFormProps {
  onSubmit: (text: string, author: string) => void;
  onCancel: () => void;
  position: { x: number, y: number };
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ onSubmit, onCancel, position }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && author.trim()) {
      onSubmit(text, author);
      setText('');
      setAuthor('');
    }
  };
  
  return (
    <div 
      className="absolute z-30"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Card className="w-64 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Add Comment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            <div>
              <Input 
                placeholder="Your name" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                required
              />
            </div>
            <div>
              <Textarea 
                placeholder="Write your comment..." 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                required
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <Button variant="outline" size="sm" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Add Comment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddCommentForm;
