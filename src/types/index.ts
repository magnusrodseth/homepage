export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  keywords: string[];
  ogImage: string;
  github: string;
  linkedIn: string;
  email: string;
};

export type RouteProps = {
  params: {
    slug: string;
    [key: string]: string | undefined;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
