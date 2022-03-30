import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

const MyMiddleware = (req) => {
  const { cookies, page } = req;
  const url = req.nextUrl.clone();
  const jwt = cookies.token;
  const path = page.name;

  const unauthOnlyRoutes = [
    "/login",
    "/register",
  ];

  const authOnlyRoutes = [
    "/profile",
    "/new-post",
  ];

  if (unauthOnlyRoutes.includes(path)) {
    if (jwt === undefined) return NextResponse.next();

    try {
      const decodedJwt = jwtDecode(jwt.split(" ")[1]);

      if (decodedJwt.exp > Date.now()) throw new Error();

      url.pathname = "/";
      return NextResponse.redirect(url);
    } catch (e) {
      return NextResponse.next();
    }
  }

  if (authOnlyRoutes.includes(path)) {
    if (jwt === undefined) {
      url.pathname = "/login";
      url.searchParams.set("redirect", true);
      return NextResponse.redirect(url);
    }

    try {
      const decodedJwt = jwtDecode(jwt.split(" ")[1]);

      if (decodedJwt.exp > Date.now()) throw new Error();
      
      return NextResponse.next();
    } catch (e) {
      url.pathname = "/login";
      url.searchParams.set("redirect", true);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export default MyMiddleware;
