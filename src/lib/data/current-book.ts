export type CurrentBook = {
  title: string;
  author: string;
  synopsis?: string;
  coverId?: number;
  url: string;
};

// Update this when the book marked `leser` in the vault changes.
// Confirm the Open Library work and cover before replacing these details.
export const currentBook: CurrentBook | null = {
  title: "The Phoenix Project",
  author: "Gene Kim, Kevin Behr, and George Spafford",
  synopsis:
    "An IT manager tackles a troubled project in a novel about DevOps, bottlenecks, and how work flows through a business.",
  coverId: 9151976,
  url: "https://openlibrary.org/works/OL16806686W",
};
