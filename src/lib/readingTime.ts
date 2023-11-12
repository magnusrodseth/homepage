export const readingTimeInMinutes = (text: string) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
};

export const formatReadingTime = (minutes: number) => {
  return `${minutes} min read`;
};
