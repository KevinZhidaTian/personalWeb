import { Request, Response } from "express";
import { JobExperience } from "../types/types";

export default async (req: Request, res: Response) => {
  const getExperience: JobExperience[] = [
    {
      startMonth: "November",
      startYear: "2022",
      isPresent: true,
      company: "Accenture",
      careerLevel: "Analyst",
      project: {
        "F1 TV": {
          role: "Backend Developer",
          details: [
            "A key contributor to the development and maintenance of the server-side of F1TV applications.",
          ],
        },
      },
    },
    {
        startMonth: "April",
        startYear: "2021",
        finishMonth: "September",
        finishYear: "2021",
        company: "University of Nottingham",
        careerLevel: "Student",
        project: {
          "GAN-Based Augmentation for varied plant dataset": {
            details: [
              "Explored the performance of StartGAN2 on complex plant images by transforming wheat images into different domains in the Global Wheat Dataset.",
            ],
          },
          "Data Modelling and Analysis of SDSS DR14 dataset": {
            details: [`Applied data analysis, pre-processing, data mining and data classification
            to a slightly modified version of a real-world dataset. The dataset consists
            of over 10,000 observations of space taken by the SDSS. I managed to
            extract knowledge from the dataset and predict new results.`],
          }
        },
      },
      {
        startMonth: "May",
        startYear: "2021",
        finishMonth: "June",
        finishYear: "2021",
        company: "Hubei Minzu University",
        careerLevel: "Student",
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
