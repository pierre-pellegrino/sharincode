import { LogoLeftSide, LogoRightSide } from "../icons";
import { spinner } from "./loader.module.scss";

const Loader = () => {
  return (
    <>
      <div className={spinner}>
        <LogoLeftSide />
        <LogoRightSide />
      </div>
      Loading...
    </>
  )
}

export default Loader