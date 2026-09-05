import portfolioData from '../../data/portfolio.json';

export type Portfolio = typeof portfolioData;
export type Profile = Portfolio['profile'];
export type Experience = Portfolio['experience'][number];
export type Project = Portfolio['projects'][number];
export type TimelineEntry = Portfolio['timeline'][number];
export type Education = Portfolio['education'][number];
export type Certification = Portfolio['certifications'][number];
export type Product = Portfolio['products'][number];
export type Skills = Portfolio['skills'];

// Años de experiencia calculados desde careerStartYear: no hay que tocarlos cada año.
// El año se toma en la zona de Paraguay (America/Asuncion), no en el TZ de la máquina de build.
export function getYearsOfExperience(): number {
  const asuncionYear = Number(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Asuncion', year: 'numeric' }).format(new Date())
  );
  return asuncionYear - portfolioData.profile.careerStartYear;
}

export function getPortfolio(): Portfolio {
  const years = getYearsOfExperience();
  return {
    ...portfolioData,
    profile: {
      ...portfolioData.profile,
      yearsOfExperience: years,
      summary: portfolioData.profile.summary.replace('{years}', String(years)),
    },
  };
}

export function getProfile(): Profile {
  return getPortfolio().profile;
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
