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

/** Short display name: first given name + first surname ("Andrés Vera"). */
export function getShortName(fullName: string): string {
  const [first, , surname] = fullName.split(' ');
  return surname ? `${first} ${surname}` : fullName;
}

export type ProjectRelation =
  | { kind: 'client'; label: string }
  | { kind: 'employer'; label: string }
  | { kind: 'own'; label: string };

/**
 * Who the project was built for, derived from experience so the JSON stays the single source:
 * a client listed under an experience entry, work done at an employer named in the description,
 * or otherwise an own project.
 */
export function getProjectRelation(project: Project): ProjectRelation {
  const clientNames = portfolioData.experience.flatMap((e) => e.clients?.map((c) => c.name) ?? []);
  if (clientNames.includes(project.name)) return { kind: 'client', label: 'Cliente' };

  const employer = portfolioData.experience.find(
    (e) => !e.clients && project.description.includes(e.company)
  );
  if (employer) return { kind: 'employer', label: employer.company };

  return { kind: 'own', label: 'Proyecto propio' };
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
