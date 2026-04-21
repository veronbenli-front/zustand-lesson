import meLogo from "../assets/skul.svg";
import zustandLogo from "../assets/zustand.svg";

const Icons = () => {
  return (
    <div>
      <a href="https://github.com/veronbenli-front" target="_blank">
        <img src={meLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://zustand-demo.pmnd.rs/" target="_blank">
        <img src={zustandLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
};

export default Icons;
