import { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "katherine-barrios",
    quote:
      "Magnus er en utvikler som ikke bare er teknisk dyktig, men som også har en sterk kommersiell forståelse - en sjelden og svært verdifull kombinasjon.",
    fullQuote:
      "Magnus tar initiativ, forbedrer løsninger på egen hånd og forstår hva som er viktig for forretningen. Han moderniserte fullstendig vårt analyseverktøy uten oppfordring - en endring som ble svært godt mottatt av kundene. Han er enkel å samarbeide med, tar imot tilbakemeldinger konstruktivt og er grundig i planleggingsfasen. Detaljorientert, fremtidsrettet og effektiv i sin bruk av KI. Med en positiv holdning og en genuin nysgjerrighet, er han en svært god lagspiller.",
    author: {
      name: "Katherine Barrios",
      role: "Daglig leder",
      company: "Tiny Studios",
      companyUrl: "https://thetinystudios.com",
      email: "kb@thetinystudios.com",
    },
  },
  {
    id: "anders-rodem",
    quote:
      "Magnus er teknisk sterk og faglig dyktig, med spisskompetanse innen full-stack webutvikling og komplekse IT-systemer.",
    fullQuote:
      "Magnus viser evne til å presist estimere prosjektstørrelse - viktig i møte med kunder. Hans evne til samarbeid er en styrke. Han tar uoppfordret initiativ for å gjøre Junior Consulting litt bedre hver dag, både gjennom forbedringer i interne prosesser og gjennom sosial innsats.",
    author: {
      name: "Anders Rodem",
      role: "Daglig leder",
      company: "Junior Consulting",
      companyUrl: "https://juniorconsulting.no",
      email: "anders.rodem@juniorconsulting.no",
      phone: "+47 915 12 168",
    },
  },
  {
    id: "amalie-jensen",
    quote:
      "Magnus er en dyktig og selvgående utvikler, alltid påskrudd og initiativrik. Smilet og latteren sitter løst.",
    fullQuote:
      "Det har vært en fryd å jobbe med Magnus. Ansvaret og tilliten han har fått, har vært velfortjent.",
    author: {
      name: "Amalie Damsgaard Jensen",
      role: "Chief Marketing Officer",
      company: "Noora",
      companyUrl: "https://noora.com",
      email: "amalie@noora.com",
      phone: "+47 454 68 773",
    },
  },
  {
    id: "aasmund-haugse",
    quote:
      "Førstehånds erfaring med Magnus sitt tekniske arbeid og hvordan han samhandler både i team og eksternt hos kunde.",
    author: {
      name: "Åsmund Haugse",
      role: "Fadder & Mentor",
      company: "Capra Consulting",
      companyUrl: "https://capraconsulting.no",
      email: "ash@capraconsulting.no",
      phone: "+47 468 87 436",
    },
  },
];

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}
