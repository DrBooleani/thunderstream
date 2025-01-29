export interface Video {
  key: string;
  site: string;
}

export interface VideoDTO {
  results: Video[];
  id: string;
}