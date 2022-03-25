import { useAtom } from "jotai";
import Link from "components/Link";
import { showNewPostModalAtom, userAtom } from "store";
import {
  SignOutIcon,
  LogInIconOutline,
  CreateIconOutlined,
} from "components/icons";
import {
  navItems,
  navItem,
  text,
  avatarContainer,
  avatar,
  active,
} from "../header.module.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NewPostModal from "components/NewPostModal";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { LogInIconFilled } from "components/icons";

const LoggedInNav = () => {
  const router = useRouter();
  const [showNewPostModal, setShowNewPostModal] = useAtom(showNewPostModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const middleBreakpoint = useMediaQuery({ query: "(max-width: 1000px)" });

  const handleDisconnect = () => {
    router.push("/");
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <>
      {showNewPostModal && <NewPostModal />}
      <ul className={navItems} role="navigation">
        <li>
          {middleBreakpoint ? (
            <Link
              href="/new-post"
              className={navItem}
              activeClassName={active}
              aria-label="Créer un nouveau snippet."
            >
              {({ isActive }) => (
                <>
                  {isActive ? <CreateIconOutlined /> : <CreateIconOutlined />}
                  <span className={text}>Nouveau Snippet</span>
                </>
              )}
            </Link>
          ) : (
            <button
              className={navItem}
              aria-label="Créer un nouveau snippet."
              onClick={() => setShowNewPostModal(true)}
            >
              <CreateIconOutlined />
              <span className={text}>Nouveau Snippet</span>
            </button>
          )}
        </li>
        <li>
          <Link
            href={`/profile/${user?.user.id}`}
            className={navItem}
            aria-label="Accéder à la page de mon compte."
            activeClassName={active}
          >
            {({ isActive }) => {
              let profileIcon = isActive ? (
                <LogInIconFilled />
              ) : (
                <LogInIconOutline />
              );

              if (user?.avatar) {
                profileIcon = (
                  <>
                    <div className={avatarContainer}>
                      <Image
                        src={user.avatar}
                        width={48}
                        height={48}
                        alt=""
                        className={avatar}
                      />
                    </div>
                  </>
                );
              }

              return (
                <>
                  {profileIcon}
                  <span className={text}>{user?.user.username}</span>
                </>
              );
            }}
          </Link>
        </li>
        <li>
          <button
            className={navItem}
            aria-label="Bouton de déconnexion"
            onClick={handleDisconnect}
          >
            <SignOutIcon />
            <span className={text}>Me déconnecter</span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default LoggedInNav;
