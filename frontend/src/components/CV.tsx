import { Box } from "@mui/material";
import { CustomTabPanel } from "./CustomTabPanel.tsx";
import "../css/cv.css";
import type { JobExperienceResponse } from "../types/types.ts";

interface CvProps {
  device: string;
  value: number;
  index: number;
  experience: JobExperienceResponse[];
}

export const CV = (props: CvProps) => {
  const { device, value, index, experience } = props;
  const groupedExperience = experience
    .sort((a, b) => {
      if (a.is_present && !b.is_present) return -99;
      if (!a.is_present && b.is_present) return 99;
      return b.start_year - a.start_year;
    })
    .reduce((acc: Record<string, JobExperienceResponse[]>, curr) => {
      const key = `${curr.experience_id}-${curr.company}-${curr.career_level}-${curr.start_year}-${curr.start_month}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
  return (
    <CustomTabPanel value={value} index={index}>
      <Box
        sx={{
          width: "60vw",
        }}
      >
        <ul className={`timeline ${device}`}>
          {groupedExperience &&
            Object.values(groupedExperience).map((experiences, index) => {
              const {
                start_month,
                start_year,
                is_present,
                finish_month,
                finish_year,
                company,
                career_level,
              } = experiences[0];
              return (
                <li className="timeline-event" key={index}>
                  <label className={`timeline-event-icon ${device}`}></label>
                  <div className={`timeline-event-copy ${device}`}>
                    <p className="timeline-event-thumbnail">
                      {start_month} {start_year} -{" "}
                      {is_present
                        ? "Present"
                        : `${finish_month} ${finish_year}`}
                    </p>
                    <h3>{company}</h3>
                    {career_level && <h4>{career_level}</h4>}
                    {experiences.map((experience, index) => {
                      const { project_name, project_role, project_details } =
                        experience;
                      return (
                        <div key={index}>
                          {project_name && <strong>{project_name}</strong>}
                          {project_name && <br />}
                          {project_role && <p>{project_role}</p>}
                          {project_details.map((entry, index) => {
                            return (
                              <div key={index}>
                                <p key={index}>{entry}</p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
        </ul>
      </Box>
    </CustomTabPanel>
  );
};
