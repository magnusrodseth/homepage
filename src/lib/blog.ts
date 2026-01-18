export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const posts: BlogPost[] = [
  {
    slug: "vibe-maxxing",
    title: "Slik maksimerer du agentiske arbeidsflyter",
    description:
      "Hvordan systematisk optimalisere arbeidsflyten for å maksimere kvaliteten på AI-generert kode og minimere tiden du bruker på manuell tasting.",
    date: "2025-11-18",
  },
];

export function getBlogPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
