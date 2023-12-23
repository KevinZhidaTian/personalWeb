import portrait from "../img/portrait.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { requestHandler } from "../utils/requestHandler";
import { Contact } from "../types/types";
import axios from "axios";
import getConfig from "../utils/getConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

// const getContacts = async () => {
//     const {backendDomain} = await getConfig();
//     const response = requestHandler<Contact>((params)=> axios.get(`${backendDomain}/getContacts`));
//     return response;
// }

const getContacts = requestHandler((params) =>
  axios.get(`${params}/getContacts`)
);

export const Home = (props: any) => {
  const [contact, setContact] = useState({ email: "", phone: "" });

  useEffect(() => {
    (async function () {
      const { backendDomain } = await getConfig();
      const response = await getContacts(backendDomain);
      if (response.code === "error") {
        setContact({ email: "", phone: "" });
      } else {
        setContact(response.data);
      }
    })();
  }, []);
  console.log(contact);

  return (
    <Box className="homeWrapper">
      {props.device && props.device === "mobile" ? (
        <Box className="portrait mobile" ref={props.imgancher}>
          <img src={portrait} alt=" " />
        </Box>
      ) : (
        <Box className="portrait desktop" ref={props.imgancher}>
          <img src={portrait} alt=" " />
        </Box>
      )}
      {Object.keys(contact).length !== 0 ? (
        <Box className="contacts">
          <Typography sx={{ fontSize: 10 }} gutterBottom>
            E: {contact.email}
          </Typography>
          <Typography sx={{ fontSize: 10 }} gutterBottom>
            T: {contact.phone}
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      <Typography
        className="followMe"
        sx={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: 10,
        }}
      >
        Follow me
      </Typography>
      <Box className="socialLink">
        <LinkedInIcon className="icon" />
        <InstagramIcon className="icon"/>
      </Box>
    </Box>
  );
};
