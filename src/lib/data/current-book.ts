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
  title: "The Spy and the Traitor",
  author: "Ben Macintyre",
  synopsis:
    "The true story of a KGB officer who secretly worked for British intelligence during the Cold War.",
  coverId: 8824555,
  url: "https://openlibrary.org/works/OL19749410W",
};
