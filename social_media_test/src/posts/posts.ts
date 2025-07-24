import type { Photo } from "../photos/photos";

export interface Post {
  id?: number;
  title: string;
  post_text: string;
  scheduled_date: string;
  photos?: Photo[];
}
