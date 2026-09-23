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
  title: "Vicious",
  author: "V. E. Schwab",
  synopsis:
    "Two ambitious university friends pursue a dangerous theory about extraordinary abilities. A decade later, their rivalry has become a fight over revenge and power.",
  coverId: 7410937,
  url: "https://openlibrary.org/works/OL17332806W",
};
