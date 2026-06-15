import type { Experience } from "./types";

export type { Experience };

export const experiences: Experience[] = [
  {
    id: "capra-gjensidige-2025",
    type: "professional",
    company: "Capra Consulting",
    companyUrl: "https://capraconsulting.no",
    role: "Full-stack Developer",
    location: "Oslo, Norway",
    employmentType: "full-time",
    startDate: "2025-12",
    endDate: "present",
    description:
      "As a consultant from Capra, building 'Hei, huset!' for Gjensidige Forsikring: a conversational AI assistant that lets homeowners 'talk to their house' and get personalized maintenance plans and advice from their own property documents and structured housing data. I am also a technical driver for the team's AI-first way of working and a contributor to Gjensidige's group-wide AI strategy.",
    highlights: [
      "Built backend agent orchestration with LangGraph and LangChain against Azure OpenAI, including planning and update tools",
      "Implemented streaming extraction of property condition reports, with RAG indexing on PostgreSQL + pgvector, FastAPI, Celery, and Redis",
      "Drove the team's AI-first workflow: AGENTS.md living docs, domain-specific agent skills, and an agent-agnostic MCP setup (Figma, Piwik Pro, Context7, MLflow)",
      "Mapped Gjensidige's AI/ML landscape across 3,500+ repositories to give leadership a decision basis for where AI delivers value",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Azure OpenAI",
      "RAG",
      "pgvector",
      "PostgreSQL",
      "React",
      "TypeScript",
      "MLflow",
      "Kubernetes (AKS)",
      "ArgoCD",
    ],
  },
  {
    id: "eden-stack-2026",
    type: "freelance",
    company: "Eden Stack",
    companyUrl: "https://eden-stack.com",
    role: "Founder & Sole Developer",
    location: "Remote",
    employmentType: "freelance",
    startDate: "2026-02",
    endDate: "present",
    description:
      "Eden Stack is a production-ready, full-stack monorepo template for AI-native SaaS that I build and sell to indie hackers and small teams. It offers end-to-end type safety from database to native mobile, designed so AI agents can extend the codebase safely and predictably.",
    highlights: [
      "Monorepo combining TanStack Start (web), Elysia (embedded API via Eden Treaty), and Expo (native mobile), fully typesafe end to end",
      "Neon PostgreSQL with Drizzle ORM, Cloudflare R2 storage, Better Auth (email/OTP, Google OAuth, multi-tenant orgs), and Stripe billing with durable Inngest webhooks",
      "AI layer: Vercel AI SDK (streaming chat, tool calling, approval flows), Inngest AgentKit for multi-agent systems, a RAG pipeline, and Exa for web search and deep research",
      "Ships 30+ custom Claude skills and MCP servers that encode architectural patterns so agents stay consistent",
    ],
    technologies: [
      "TypeScript",
      "Bun",
      "TanStack Start",
      "Elysia",
      "Expo",
      "Neon PostgreSQL",
      "Drizzle ORM",
      "Better Auth",
      "Stripe",
      "Inngest",
      "Vercel AI SDK",
      "Exa",
      "MCP",
    ],
    links: [
      {
        title: "Eden Stack",
        url: "https://eden-stack.com",
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
    id: "mcp-server-2025",
    type: "freelance",
    company: "Open source",
    role: "Creator",
    location: "Remote",
    employmentType: "freelance",
    startDate: "2025-07",
    endDate: "2025-07",
    description:
      "An MCP server, published as an npm package, that gives AI assistants direct access to shadcn/ui documentation, dependencies, and implementation examples. It removes manual doc copying and reduces the risk of using outdated components.",
    highlights: [
      "Implemented over JSON-RPC with the Model Context Protocol and Zod-validated tools",
      "Published to npm for use directly inside developers' IDEs",
    ],
    technologies: ["MCP", "TypeScript", "Node.js", "JSON-RPC", "Zod", "npm"],
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
    endDate: "2025-11",
    description:
      "As a consultant from Capra Consulting, worked largely independently on the continued development of the Tiny Studios SaaS platform, an all-in-one management solution for dance studios.",
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
    id: "reodor-2025",
    type: "freelance",
    company: "Reodor Studios",
    companyUrl: "https://reodorstudios.com",
    role: "Developer",
    location: "Remote",
    employmentType: "contract",
    startDate: "2025-10",
    endDate: "2025-11",
    description:
      "Built a reusable, production-grade agentic AI chatbot template ('Create Reodor App') that cut new AI projects' time from concept to production from days to hours, plus an n8n and MCP platform that democratized advanced workflow automation for non-technical staff.",
    highlights: [
      "Agentic chatbot template on Next.js and Supabase using the Vercel AI SDK and Anthropic Claude, with tool calling for natural-language CRUD on PostgreSQL",
      "Designed a confirmation and planning system that requires user approval before critical operations",
      "Self-hosted n8n on Railway with a custom MCP server, letting Claude generate workflows from natural language",
      "Designed and ran an AI-adoption course for Reodor's tech and design teams",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Vercel AI SDK",
      "Claude",
      "Supabase",
      "PostgreSQL",
      "n8n",
      "MCP",
      "Railway",
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
    technologies: [
      "Next.js",
      "tRPC",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "PostGIS",
      "Python",
      "Azure",
    ],
  },
  {
    id: "privatmegleren-2023",
    type: "professional",
    company: "Privatmegleren AI",
    role: "Tech Lead & Software Architect",
    location: "Oslo, Norway",
    employmentType: "part-time",
    startDate: "2023-04",
    endDate: "2024-02",
    description:
      "Technical lead for a SaaS platform that uses generative AI to automate the creation of complete property sales documents for one of Norway's leading real-estate brokerages, freeing brokers for higher-value work.",
    highlights: [
      "Defined the technical architecture: Next.js on edge runtime with web streaming and OpenAI language models",
      "Built a vector database with RAG for efficient information retrieval, plus Stripe subscription billing under strict regulatory requirements",
      "Led technical development in a small two-developer startup team",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "GPT",
      "RAG",
      "Embeddings",
      "Edge Runtime",
      "Supabase",
      "PostgreSQL",
      "Stripe",
    ],
  },
  {
    id: "gpt-feeder-2023",
    type: "freelance",
    company: "Open source",
    role: "Creator",
    location: "Remote",
    employmentType: "freelance",
    startDate: "2023-03",
    endDate: "2023-04",
    description:
      "A command-line tool written in Rust that makes it easy to feed local code context to large language models. Released as open source with 6,000+ downloads (as of April 2025) and published to crates.io.",
    highlights: [
      "Robust CLI in Rust, published to the crates.io package registry",
      "6,000+ downloads and a warm reception in the developer community",
    ],
    technologies: ["Rust", "CLI", "Cargo", "clap", "Open source"],
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
    technologies: [
      "React",
      "TypeScript",
      "Chakra UI",
      "Leaflet",
      "Mapbox",
      "AWS",
      "AWS AppConfig",
      "Kotlin",
      "Micronaut",
    ],
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
    id: "jc-consultant-2022",
    type: "professional",
    company: "Junior Consulting",
    companyUrl: "https://juniorconsulting.no",
    role: "Project Lead & Developer",
    location: "Trondheim, Norway",
    employmentType: "part-time",
    startDate: "2022-02",
    endDate: "2024-08",
    description:
      "Led multiple teams building web and mobile applications for clients, including Effisense (sensor-based waste management), Lista (a home-renovation mobile app), NTVA, and Flytlandskap. Gained experience in project management, team coordination, and customer relationships.",
    highlights: [
      "Led multiple development teams for web and mobile applications",
      "Managed project delivery and client relationships",
      "Coordinated cross-functional teams across several client engagements",
    ],
    technologies: [
      "TypeScript",
      "React",
      "React Native",
      "Next.js",
      "tRPC",
      "PostgreSQL",
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
      "Exercise tutoring for first year students in IT2805 Web Technologies. Also built webtek-grader, a CLI that automates unpacking, validation, and optional LLM-based assessment of student submissions.",
    highlights: [
      "Tutored first-year students in HTML, CSS, and JavaScript",
      "Built a CLI tool that streamlined grading and was adopted by other teaching assistants",
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
