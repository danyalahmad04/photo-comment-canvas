
import { Comment, PhotoWithComments } from "@/types";

// Mock photo data with comments
const mockPhotos: PhotoWithComments[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Computer Hardware Close-up",
    comments: [
      {
        id: "c1",
        x: 150,
        y: 120,
        text: "This part of the circuit looks interesting!",
        author: "TechEnthusiast",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "c2",
        x: 320,
        y: 220,
        text: "The soldering here could be improved.",
        author: "CircuitPro",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      }
    ]
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "Person Using MacBook",
    comments: [
      {
        id: "c3",
        x: 250,
        y: 180,
        text: "Nice keyboard layout!",
        author: "DevDesigner",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      }
    ]
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Woman Using Laptop",
    comments: []
  }
];

// Function to get all photos
export const getAllPhotos = async (): Promise<PhotoWithComments[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockPhotos];
};

// Function to get a single photo by ID
export const getPhotoById = async (id: string): Promise<PhotoWithComments | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPhotos.find(photo => photo.id === id);
};

// Function to add a comment to a photo
export const addCommentToPhoto = async (
  photoId: string,
  comment: Omit<Comment, 'id' | 'timestamp'>
): Promise<Comment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const newComment: Comment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  
  const photoIndex = mockPhotos.findIndex(photo => photo.id === photoId);
  
  if (photoIndex !== -1) {
    mockPhotos[photoIndex].comments.push(newComment);
  }
  
  return newComment;
};
