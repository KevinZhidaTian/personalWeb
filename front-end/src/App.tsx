import React, { useEffect, useRef, useState } from "react";
import "./css/App.css";
import { HeaderContainer } from "./components/headers";
import { VideoBg } from "./components/videoBg";
import { Home } from "./components/Home";
function App() {
  const [device, setDevice] = useState("desktop");
  const imgancher = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="App">
      <VideoBg />
      <HeaderContainer device={device} />
      <Home imgancher={imgancher} device={device}/>

      {/* <div className="wrapper">
        <div className="portrait">
          <img src={portrait} alt=" " />
        </div>
      </div>

      <div className="wrapper">
        <div className="portrait">
          <img src={portrait} alt=" " />
        </div>
      </div>

      <div className="wrapper">
        <div className="portrait">
          <img src={portrait} alt=" " />
        </div>
      </div>

      <div className="wrapper">
        <div className="portrait">
          <img src={portrait} alt=" " />
        </div>
      </div> */}
    </div>
  );
}

export default App;
