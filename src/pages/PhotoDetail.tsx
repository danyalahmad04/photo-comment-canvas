
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPhotoById, addCommentToPhoto } from '@/services/photoService';
import { PhotoWithComments } from '@/types';
import PhotoCanvas from '@/components/PhotoCanvas';
import CommentThread from '@/components/CommentThread';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PhotoWithComments | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        if (id) {
          const photoData = await getPhotoById(id);
          if (photoData) {
            setPhoto(photoData);
          } else {
            toast({
              title: "Photo not found",
              description: "The requested photo could not be found.",
              variant: "destructive",
            });
            navigate('/');
          }
        }
      } catch (error) {
        toast({
          title: "Error loading photo",
          description: "There was a problem loading the photo.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id, navigate, toast]);

  const handleCommentClick = (commentId: string) => {
    setActiveCommentId(commentId === activeCommentId ? null : commentId);
  };

  const handleAddComment = async (x: number, y: number, text: string, author: string) => {
    try {
      if (!photo) return;

      const newComment = await addCommentToPhoto(photo.id, { x, y, text, author });
      
      setPhoto(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [...prev.comments, newComment],
        };
      });
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the photo.",
      });
      
      setActiveCommentId(newComment.id);
    } catch (error) {
      toast({
        title: "Error adding comment",
        description: "There was a problem adding your comment.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto h-[calc(100vh-3rem)]">
          <div className="mb-4">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
            <div className="md:col-span-2 bg-card rounded-lg h-full">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className="bg-card rounded-lg h-full">
              <Skeleton className="w-full h-12 rounded-t-lg" />
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto h-[calc(100vh-3rem)]">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{photo.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
          <div className="md:col-span-2 bg-card rounded-lg overflow-hidden shadow-sm h-full">
            <PhotoCanvas 
              photo={photo} 
              activeCommentId={activeCommentId} 
              onCommentClick={handleCommentClick}
              onAddComment={handleAddComment}
            />
          </div>
          <div className="bg-card rounded-lg shadow-sm overflow-hidden h-full">
            <CommentThread 
              comments={photo.comments}
              activeCommentId={activeCommentId}
              onSelectComment={handleCommentClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
