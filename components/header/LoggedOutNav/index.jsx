import Link from "next/link";

const LoggedOutNav = () => {
  return (
    <ul>
      <li>
        <Link href="#">
          <a>
            M&apos;identifier
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            Me Connecter
          </a>
        </Link>
      </li>
    </ul>
  )
};

export default LoggedOutNav;
