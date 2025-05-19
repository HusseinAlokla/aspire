export type MediaItem = {
  id: number;
  title: string;
  creator: string;
  releaseDate: string;
  genre: string;
  status: "wishlist" | "owned" | "currently using" | "completed";
};
