import { container, main } from "./layout.module.scss";
import Header from "../Header";

const Layout = ({ children }) => (
  <div className={container}>
    <Header />
    <main className={main} id="main" aria-label="Contenu Principal">
      {children}
    </main>
  </div>
);

export default Layout;
