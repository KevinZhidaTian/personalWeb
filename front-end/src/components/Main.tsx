import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { backdropClasses, styled } from "@mui/material";
import { CV } from "./CV";
import { Portfolio } from "./Portfolio";
import { AboutMe } from "./AboutMe";
import { JobExperience } from "../types/types";
import { requestHandler } from "../utils/requestHandler";
import getConfig from "../utils/getConfig";
import axios from "axios";
import { title } from "process";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
interface StyledTabProps {
  label: string;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroudColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const getJobExperience = requestHandler((params) =>
  axios.get(`${params}/getExperience`)
);

const getPortfolio = requestHandler((params) =>
  axios.get(`${params}/getPortfolio`)
);
export const Main = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [experience, setExperience] = React.useState<JobExperience[]>([
    {
      startMonth: "",
      startYear: "",
      // isPresent: true,
      company: "",
      careerLevel: "",
      project: {
        "": {
          role: "",
          details: [""],
        },
      },
    },
  ]);
  const [imgData, setImgData] = React.useState([{ img: "", title: "" }]);

  React.useEffect(() => {
    (async () => {
      const { backendDomain } = await getConfig();

      const getExpResponse = await getJobExperience(backendDomain);
      const getPortfolioResponse = await getPortfolio(backendDomain);

      if (getExpResponse.code === "success") {
        setExperience(getExpResponse.data.events);
      }

      if (getPortfolioResponse.code === "success") {
        setImgData(getPortfolioResponse.data.imgData);
      }
    })();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="main"
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        zIndex: 13,
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "center",
        flexDirection: "column",
        flexWrap: "no-wrap",
        marginTop: "30px",
      }}
      ref={props.mainAncher}
    >
      <StyledTabs value={value} onChange={handleChange} sx={{ zIndex: 13 }}>
        <StyledTab
          label="CV"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(0)}
        />
        <StyledTab
          label="Portfolio"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(1)}
        />
        <StyledTab
          label="About Me"
          sx={{
            color: "rgb(124 124 124)",
          }}
          {...a11yProps(2)}
        />
      </StyledTabs>
      <CV value={value} index={0} experience={experience} />
      <Portfolio value={value} index={1} imgData={imgData} />
      <AboutMe value={value} index={2} />
    </Box>
  );
};
