import { Box } from "@mui/material";
import * as React from "react";
import { CustomTabPanel } from "./CustomTabPanel";
import "../css/cv.css";
import { JobExperience } from "../types/types";
import { requestHandler } from "../utils/requestHandler";
import getConfig from "../utils/getConfig";
import axios from "axios";

interface JobExperienceProps {
  id: number | String;
  event: JobExperience;
}

interface cvProps {
  value: number;
  index: number;
  experience: JobExperience[];
}

const ExperienceBox = (props: JobExperienceProps) => {
  return (
    <li className="timeline-event">
      <label className="timeline-event-icon"></label>
      <div className="timeline-event-copy">
        <p className="timeline-event-thumbnail">
          {props.event.startMonth} {props.event.startYear} -{" "}
          {props.event.isPresent
            ? "Present"
            : `${props.event.finishMonth} ${props.event.finishYear}`}
        </p>
        <h3>{props.event.company}</h3>
        <h4>{props.event.careerLevel}</h4>
        {props.event.project &&
          Object.entries(props.event.project).map(
            ([project, content], index) => {
              return (
                  <div key={index}>
                    <strong>{project}</strong>
                    <br />
                    {content.role ? <p>{content.role}</p> : <></>}
                    {content.details &&
                      content.details.map((detail: string, index) => <p key={index}>{detail}</p>)}
                  </div>
              );
            }
          )}
      </div>
    </li>
  );
};

export const CV = (props: cvProps) => {
  return (
    <CustomTabPanel value={props.value} index={props.index}>
      <Box
        sx={{
          width: "60vw",
        }}
      >
        <ul className="timeline">
          {props.experience &&
            props.experience.map((event, index) => {
              return <ExperienceBox key={index} id={index} event={event} />;
            })}
        </ul>
      </Box>
    </CustomTabPanel>
  );
};
