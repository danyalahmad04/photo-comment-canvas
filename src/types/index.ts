
export interface Comment {
  id: string;
  x: number;  // x-coordinate on the image
  y: number;  // y-coordinate on the image
  text: string;
  author: string;
  timestamp: string;
}

export interface PhotoWithComments {
  id: string;
  url: string;
  title: string;
  comments: Comment[];
}
