
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPhotos } from '@/services/photoService';
import { PhotoWithComments } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Gallery = () => {
  const [photos, setPhotos] = useState<PhotoWithComments[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getAllPhotos();
        setPhotos(data);
      } catch (error) {
        toast({
          title: "Error loading photos",
          description: "There was a problem loading the photo gallery.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [toast]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardFooter className="px-4 py-3 border-t">
                <Skeleton className="h-6 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Photo Comment Canvas</h1>
        <p className="text-muted-foreground mt-2">
          Click on a photo to view and add comments
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link to={`/photo/${photo.id}`} key={photo.id}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t flex justify-between">
                <h3 className="font-medium truncate">{photo.title}</h3>
                <div className="flex items-center text-gray-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{photo.comments.length}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
