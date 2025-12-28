import "../css/headers.css";

interface HeaderProps {
  device: string;
}
export const HeaderContainer = (props: HeaderProps) => {
  return (
    <header className="headerContainer">
      {props.device && props.device === "mobile" ? (
        <MobileHeder />
      ) : (
        <DesktopHeader />
      )}
    </header>
  );
};

const MobileHeder = () => {
  return (
    <div className="mobileHeader">
      <div>Menue</div>
      <div>
        <p>Zhida Tian</p>
      </div>
    </div>
  );
};

const DesktopHeader = () => {
  return (
    <div className="desktopHeader">
      <div>Menue</div>
      <div>
        <p>Zhida Tian</p>
      </div>
    </div>
  );
};
