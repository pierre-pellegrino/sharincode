import Link from "next/link";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Header = () => {
  const connected = false;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                SnipShare
              </a>
            </Link>
          </li>
          <li>
            {
              connected
              ? <LoggedInNav />
              : <LoggedOutNav />
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
