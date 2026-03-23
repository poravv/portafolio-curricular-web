import portfolioData from '../../data/portfolio.json';

export type Portfolio = typeof portfolioData;
export type Profile = Portfolio['profile'];
export type Experience = Portfolio['experience'][number];
export type Project = Portfolio['projects'][number];
export type TimelineEntry = Portfolio['timeline'][number];
export type Education = Portfolio['education'][number];
export type Product = Portfolio['products'][number];
export type Skills = Portfolio['skills'];

export function getPortfolio(): Portfolio {
  return portfolioData;
}

export function getProfile(): Profile {
  return portfolioData.profile;
}

export function getExperience(): Experience[] {
  return portfolioData.experience;
}

export function getProjects(): Project[] {
  return portfolioData.projects;
}

export function getProjectsByTier(tier: number): Project[] {
  return portfolioData.projects.filter((p: any) => p.tier === tier);
}

export function getTimeline(): TimelineEntry[] {
  return [...portfolioData.timeline].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEducation(): Education[] {
  return portfolioData.education;
}

export function getProducts(): Product[] {
  return portfolioData.products;
}

export function getSkills(): Skills {
  return portfolioData.skills;
}
