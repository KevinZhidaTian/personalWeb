import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./css/App.css";
// import { HeaderContainer } from "./components/headers";
const Home = lazy(() => import("./components/Home.tsx"));
const VideoBg = lazy(() => import("./components/VideoBg.tsx"));
const Main = lazy(() => import("./components/Main.tsx"));
function App() {
  const [device, setDevice] = useState("");
  const [scrolled, setScrolled] = useState(0);
  const [mainOffset, setMainOffSet] = useState<undefined | number>(0);
  const imgancher = useRef(null);
  const mainAncher = useRef<null | HTMLElement>(null);
  const handleScrollButtonClick = () => {
    mainAncher.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (globalThis.innerWidth >= 1000) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };
    const handleScroll = () => {
      setScrolled(globalThis.scrollY);
      setMainOffSet(mainAncher.current?.getBoundingClientRect().y);
    };
    globalThis.addEventListener("resize", handleResize);
    globalThis.addEventListener("scroll", handleScroll);
  });

  return (
    <div className="App">
      <VideoBg />
      {/* <HeaderContainer device={device} /> */}
      <Home
        imgancher={imgancher}
        device={device}
        handleScrollButtonClick={handleScrollButtonClick}
        scrolled={scrolled}
        mainOffset={mainOffset}
      />
      <Suspense fallback={<div></div>}>
        <Main mainAncher={mainAncher} />
      </Suspense>
    </div>
  );
}

export default App;
