export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type VideoAsset = {
  mp4: string;
  webm?: string;
  poster: string;
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  client: string;
  description: string;
  overview: string;
  challenge: string;
  approach: string;
  creativeDirection: string;
  designSystem: string;
  applications: string;
  outcome: string;
  coverImage: string;
  gallery: GalleryItem[];
  services: string[];
  featured: boolean;
  accent: string;
  video?: VideoAsset;
};
