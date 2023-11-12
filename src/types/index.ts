export type RouteProps = {
  params: {
    slug: string;
    [key: string]: string | undefined;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};
