import type { Request, Response } from "express";
import type { JobExperience } from "../types/types.ts";

export default (_req: Request, res: Response) => {
  const getExperience: JobExperience[] = [
    {
      start_month: "November",
      start_year: "2022",
      company: "Accenture",
      career_level: "Analyst",
      project: {
        "F1 TV": {
          role: "Backend Developer",
          details: [
            "A key contributor to the development and maintenance of the server-side of F1 TV applications.",
          ],
        },
      },
    },
    {
      start_month: "September",
      start_year: "2022",
      finish_month: "February",
      finish_year: "2023",
      company: "BarPop",
      career_level: "Bartender",
      project: ["Serving alcohol to clients"],
    },
    {
      start_month: "April",
      start_year: "2021",
      finish_month: "September",
      finish_year: "2021",
      company: "University of Nottingham",
      career_level: "Student",
      project: {
        "GAN-Based Augmentation for varied plant dataset": {
          details: [
            "Explored the performance of StartGAN2 on complex plant images by transforming wheat images into different domains in the Global Wheat Dataset.",
          ],
        },
        "Data Modelling and Analysis of SDSS DR14 dataset": {
          details: [
            "Applied data analysis, pre-processing, data mining and data classification to a slightly modified version of a real-world dataset. a slightly modified version of a real-world dataset. The dataset consists of over 10,000 observations of space taken by the SDSS. I managed to extract knowledge from the dataset and predict new results.",
          ],
        },
      },
    },
    {
      start_month: "May",
      start_year: "2021",
      finish_month: "June",
      finish_year: "2021",
      company: "Hubei Minzu University",
      career_level: "Student",
      project: {
        "Target Detection Web Application": {
          details: [
            "Implimented an image classification web application. Used RCNN as deep learning model and deployed the trained model to a backend server based on Flask",
          ],
        },
      },
    },
  ];

  res.send({ events: getExperience });
};
