import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./css/App.css";
// import Main from "./components/Main.tsx";
import VideoBg from "./components/VideoBg.tsx";
import Home from "./components/Home.tsx";
// import { HeaderContainer } from "./components/headers";
// const Home = lazy(() => import("./components/Home.tsx"));
// const VideoBg = lazy(() => import("./components/VideoBg.tsx"));
const Main = lazy(() => import("./components/Main.tsx"));
function App() {
  const [isVertical, setIsVertical] = useState(false);
  const [device, setDevice] = useState("");
  const [scrolled, setScrolled] = useState(0);
  const [mainOffset, setMainOffSet] = useState<undefined | number>(0);
  const imgAnchor = useRef(null);
  const mainAnchor = useRef<null | HTMLElement>(null);
  const handleScrollButtonClick = () => {
    mainAnchor.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const handleResize = () => {
    if (globalThis.innerWidth >= 1000) {
      setDevice("desktop");
    } else {
      setDevice("mobile");
    }
  };

  const handleVerticalFlag = () => {
    if (globalThis.innerHeight > globalThis.innerWidth) {
      setIsVertical(true);
    } else {
      setIsVertical(false);
    }
  };

  useEffect(() => {
    handleResize();
    handleVerticalFlag();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(globalThis.scrollY);
      setMainOffSet(mainAnchor.current?.getBoundingClientRect().y);
    };
    globalThis.addEventListener("resize", handleResize);
    globalThis.addEventListener("resize", handleVerticalFlag);
    globalThis.addEventListener("scroll", handleScroll);
    globalThis.addEventListener("scroll", handleVerticalFlag);
  });

  return (
    <div className="App">
      <VideoBg />
      {/* <HeaderContainer device={device} /> */}
      <Home
        imgAnchor={imgAnchor}
        device={device}
        isVertical={isVertical}
        handleScrollButtonClick={handleScrollButtonClick}
        scrolled={scrolled}
        mainOffset={mainOffset}
      />
      <Suspense fallback={<div></div>}>
        <Main mainAnchor={mainAnchor} device={device} />
      </Suspense>
    </div>
  );
}

export default App;
