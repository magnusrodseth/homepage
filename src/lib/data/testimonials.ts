import { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "katherine-barrios",
    quote:
      "Magnus is not only technically skilled, but also has a strong commercial understanding - a rare and highly valuable combination. He completely modernized our analytics tool without being asked. Detail-oriented, forward-thinking, and an excellent team player.",
    author: {
      name: "Katherine Barrios",
      role: "CEO",
      company: "Tiny Studios",
      companyUrl: "https://thetinystudios.com",
    },
  },
  {
    id: "anders-rodem",
    quote:
      "Magnus is technically strong with specialized expertise in full-stack web development and complex IT systems. He demonstrates the ability to precisely estimate project scope. He takes initiative to improve things every day, both through internal processes and social efforts.",
    author: {
      name: "Anders Rodem",
      role: "CEO",
      company: "Junior Consulting",
      companyUrl: "https://juniorconsulting.no",
    },
  },
  {
    id: "amalie-jensen",
    quote:
      "Magnus is a skilled and self-driven developer, always engaged and proactive. It has been a joy to work with him. The responsibility and trust he has been given has been well deserved.",
    author: {
      name: "Amalie Damsgaard Jensen",
      role: "Chief Marketing Officer",
      company: "Noora",
      companyUrl: "https://noora.com",
    },
  },
];

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}
