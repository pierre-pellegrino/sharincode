import Link from "components/Link";
import { LogInIconOutline, LogInIconFilled } from "../../icons";
import { navItems, navItem, text, active } from "../header.module.scss";

const LoggedOutNav = () => {
  return (
    <ul className={navItems} role="navigation ">
      <li>
        <Link
          href="/login"
          aria-label="Accéder à la page de connexion"
          className={navItem}
          activeClassName={active}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <LogInIconFilled className={active} />
              ) : (
                <LogInIconOutline />
              )}
              <span className={text}>Me connecter</span>
            </>
          )}
        </Link>
      </li>
    </ul>
  );
};

export default LoggedOutNav;
