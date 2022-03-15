import { container, main } from "./layout.module.scss";
import Header from "../header";

const Layout = ({ children }) => (
  <div className={container}>
    <Header />
    <main className={main}>
      {children}
    </main>
  </div>
);

export default Layout;
