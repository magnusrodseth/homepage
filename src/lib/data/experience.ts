import type { Experience } from "./types";

export type { Experience };

export const experiences: Experience[] = [
  {
    id: "capra-fullstack-2025",
    type: "professional",
    company: "Capra Consulting",
    companyUrl: "https://capraconsulting.no",
    role: "Full-stack Developer",
    location: "Oslo, Norway",
    employmentType: "full-time",
    startDate: "2025-06",
    endDate: "present",
    description:
      "Building scalable web applications for enterprise clients as a consultant. Focus on full-stack TypeScript development with React, Next.js, and cloud infrastructure on AWS.",
    highlights: [
      "Delivering full-stack development services for enterprise clients",
      "Working with modern web technologies and cloud infrastructure",
    ],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "AWS"],
  },
  {
    id: "capra-tinystudios-2025",
    type: "professional",
    company: "Capra Consulting",
    companyUrl: "https://capraconsulting.no",
    role: "Full-stack Developer",
    location: "Oslo, Norway",
    employmentType: "contract",
    startDate: "2025-05",
    endDate: "2025-07",
    description:
      "As a consultant from Capra Consulting, worked largely independently on the continued development of the Tiny Studios SaaS platform - an all-in-one management solution for dance studios.",
    highlights: [
      "Implemented a full-stack discount code feature, including integration with Dintero payment provider",
      "Improved front-end performance with client-side data fetching (SWR), enabling search, filtering, and pagination",
      "Developed a new 'Receptionist' user role with custom RBAC permissions in Supabase",
      "Led complete revamp of back-office dashboard with KPIs, charts, and drill-down analytics",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Zustand",
      "SWR",
      "Playwright",
    ],
    links: [
      {
        title: "Tiny Studios",
        url: "https://thetinystudios.com",
      },
    ],
  },
  {
    id: "capra-intern-2022",
    type: "internship",
    company: "Capra Consulting",
    companyUrl: "https://capraconsulting.no",
    role: "Summer Intern",
    location: "Oslo, Norway",
    employmentType: "contract",
    startDate: "2022-06",
    endDate: "2022-08",
    description:
      "Developed an advisor tool for Dr. Dropin with 2000+ monthly users for recommending consultations and therapists based on questionnaire answers.",
    highlights: [
      "Built advisor tool with 2000+ monthly users",
      "Integrated with Sanity CMS for content management",
      "Implemented analytics tracking with Google Analytics",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Google Analytics",
      "Sanity",
      "Docker",
    ],
    links: [
      {
        title: "Dr. Dropin Veileder",
        url: "https://drdropin.no/veileder",
      },
    ],
  },
  {
    id: "jc-board-2025",
    type: "professional",
    company: "Junior Consulting",
    companyUrl: "https://juniorconsulting.no",
    role: "Board Member",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2025-07",
    endDate: "present",
    description:
      "Contributing to the strategic direction and governance of Junior Consulting. Overseeing company performance, ensuring financial health, and upholding standards.",
    highlights: [
      "Participating in setting long-term goals and key decisions",
      "Contributing to strategic direction as a governance member",
      "Driving sustainable growth initiatives",
    ],
  },
  {
    id: "jc-partner-2024",
    type: "professional",
    company: "Junior Consulting",
    companyUrl: "https://juniorconsulting.no",
    role: "Partner and Head of Technology",
    location: "Trondheim, Norway",
    employmentType: "full-time",
    startDate: "2024-08",
    endDate: "2025-07",
    description:
      "Oversaw staffing of 53 active tech, strategy, and design consultants on external projects. Managed internal IT systems and led platform development with focus on efficiency and automation.",
    highlights: [
      "Oversaw staffing of 53 active consultants across tech, strategy, and design",
      "Led development of internal web platform with generative AI integrations",
      "Achieved 90% reduction in operational costs through strategic technology choices",
      "Key member of management team handling business development and project estimation",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "OpenAI API",
    ],
  },
  {
    id: "jc-consultant-2022",
    type: "professional",
    company: "Junior Consulting",
    companyUrl: "https://juniorconsulting.no",
    role: "Tech Consultant",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2022-02",
    endDate: "2024-08",
    description:
      "Successfully led multiple teams in developing web and mobile applications. Gained experience in project management, team coordination, and customer relationship management.",
    highlights: [
      "Led multiple development teams for web and mobile applications",
      "Managed project delivery and client relationships",
      "Coordinated cross-functional teams",
    ],
    technologies: ["TypeScript", "React", "React Native", "Node.js"],
  },
  {
    id: "noora-intern-2024",
    type: "internship",
    company: "Noora",
    companyUrl: "https://noora.com",
    role: "Summer Intern",
    location: "Oslo, Norway",
    employmentType: "contract",
    startDate: "2024-06",
    endDate: "2024-08",
    description:
      "Developed an MVP of a SaaS platform enabling landowners and corporations to capture carbon at scale.",
    highlights: [
      "Led development of carbon capture SaaS platform MVP",
      "Implemented PostGIS for geospatial forest area recommendations",
      "Built Python service for carbon income assessment calculations",
    ],
    technologies: ["Next.js", "PostgreSQL", "PostGIS", "Python"],
  },
  {
    id: "bekk-intern-2023",
    type: "internship",
    company: "Bekk",
    companyUrl: "https://bekk.no",
    role: "Summer Intern",
    location: "Oslo, Norway",
    employmentType: "contract",
    startDate: "2023-06",
    endDate: "2023-08",
    description:
      "Developed a real-time map of train coordinates for Vy, Norway's largest public transport company.",
    highlights: [
      "Built real-time train tracking map for Vy (Norway's largest transport company)",
      "Implemented notification system using AWS AppConfig",
      "Worked with Kotlin Micronaut backend services",
    ],
    technologies: ["React", "Kotlin", "Micronaut", "AWS AppConfig"],
  },
  {
    id: "systemsoft-2022",
    type: "freelance",
    company: "Systemsoft Holding AS",
    companyUrl: "https://systemsoft.no",
    role: "Full-stack Developer",
    location: "Asker, Norway",
    employmentType: "freelance",
    startDate: "2022-12",
    endDate: "2022-12",
    description:
      "Overhauled the official SystemSoft website from scratch with serverless architecture.",
    highlights: [
      "Complete website rebuild with modern stack",
      "Implemented serverless architecture reducing yearly costs by $300 USD",
      "Built CMS allowing employees to independently update company portfolio",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/magnusrodseth/systemsoft",
      },
    ],
  },
  {
    id: "revolve-2020",
    type: "volunteer",
    company: "Revolve NTNU",
    companyUrl: "https://revolve.no",
    role: "Software Engineer",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2020-08",
    endDate: "2021-06",
    description:
      "Developed full-stack applications for Norway's Formula Student racing team to improve racecar aerodynamics and analyze telemetry data.",
    highlights: [
      "Built Aerolyze - web app for downloading and analyzing aerodynamic simulation images from Azure",
      "Contributed to Analyze - desktop app for live telemetry visualization during testing",
      "Worked with Azure cloud services for data storage and retrieval",
    ],
    technologies: ["C#", "XAML", "Azure", "PostgreSQL", "SciChart"],
    links: [
      {
        title: "Revolve NTNU",
        url: "https://revolve.no",
      },
    ],
  },
  {
    id: "ntnu-ta-oop-2022",
    type: "education",
    company: "NTNU",
    companyUrl: "https://ntnu.no",
    role: "Student Assistant - Object-oriented Programming",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2022-01",
    endDate: "2022-06",
    description:
      "Exercise tutoring for first year students in DCST1007 Object-oriented Programming.",
    highlights: [
      "Tutored first-year students in JavaScript, React, and SQL",
      "Provided guidance on programming assignments and projects",
    ],
    technologies: ["JavaScript", "React", "SQL"],
  },
  {
    id: "ntnu-ta-web-2021",
    type: "education",
    company: "NTNU",
    companyUrl: "https://ntnu.no",
    role: "Student Assistant - Web Technologies",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2021-07",
    endDate: "2021-12",
    description:
      "Exercise tutoring for first year students in IT2805 Web Technologies.",
    highlights: [
      "Tutored first-year students in HTML, CSS, and JavaScript",
      "Assisted with web development fundamentals and best practices",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

export function getExperiencesByType(
  type: Experience["type"]
): Experience[] {
  return experiences.filter((exp) => exp.type === type);
}

export function getExperiencesByYear(): Record<string, Experience[]> {
  const byYear: Record<string, Experience[]> = {};

  for (const exp of experiences) {
    const year = exp.startDate.split("-")[0];
    if (!byYear[year]) {
      byYear[year] = [];
    }
    byYear[year].push(exp);
  }

  return byYear;
}

export function getAllExperiences(): Experience[] {
  return experiences.sort((a, b) => {
    const dateA = a.endDate === "present" ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === "present" ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });
}
