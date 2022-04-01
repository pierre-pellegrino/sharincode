import Link from "components/Link";
import { useTranslation } from "next-i18next";
import { LogInIconOutline, LogInIconFilled } from "../../icons";
import { navItems, navItem, text, active } from "../header.module.scss";

const LoggedOutNav = () => {
  const { t } = useTranslation();

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
                <LogInIconFilled />
              ) : (
                <LogInIconOutline />
              )}
              <span className={text}>{t("login")}</span>
            </>
          )}
        </Link>
      </li>
    </ul>
  );
};

export default LoggedOutNav;
