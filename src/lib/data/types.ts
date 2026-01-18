export type Experience = {
  id: string;
  type: "professional" | "freelance" | "internship" | "volunteer" | "education";
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  employmentType: "full-time" | "part-time" | "contract" | "freelance";
  startDate: string;
  endDate: string | "present";
  description: string;
  highlights: string[];
  technologies?: string[];
  links?: {
    title: string;
    url: string;
  }[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    companyUrl?: string;
    linkedInUrl?: string;
  };
};

export type GitHubRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
  createdAt: string;
  fork: boolean;
  archived: boolean;
};

export type SpotifyTrack = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
};

export type RecentTrack = {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  playedAt: string;
  context?: {
    type: "playlist" | "album" | "artist" | "show";
    name?: string;
    url: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  readingTime: number;
};
