import NextLink from "next/link";
import { useRouter } from "next/router";

const Link = ({
  href,
  activeClassName,
  inactiveClassName,
  className,
  children,
  ...rest
}) => {
  const router = useRouter();

  let currentClassName = `${className} ${inactiveClassName}`;
  const isActive = router.asPath === href;

  if (isActive) {
    currentClassName = `${className} ${activeClassName}`;
  }

  return (
    <NextLink href={href} {...rest}>
      <a className={currentClassName}>{children({ isActive })}</a>
    </NextLink>
  )
}

export default Link;
