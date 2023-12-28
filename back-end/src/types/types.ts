export type JobExperience = {
    startMonth: string;
    startYear: string;
    isPresent?: boolean;
    finishMonth?: string;
    finishYear?: string;
    company: string;
    careerLevel: string;
    project: {
      [projectName: string]: {
        role?: string;
        details?: string[];
      };
    };
  };

export type imgData = {
    img: string;
    title?: string;
}