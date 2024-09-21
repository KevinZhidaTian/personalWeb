interface projectExp {
  [projectName: string]: {
    role?: string;
    details?: string[];
  };
}

export type JobExperience = {
  startMonth: string;
  startYear: string;
  isPresent?: boolean;
  finishMonth?: string;
  finishYear?: string;
  company: string;
  careerLevel?: string;
  project: projectExp | string[];
};

export type imgData = {
  img: string;
  title?: string;
};
