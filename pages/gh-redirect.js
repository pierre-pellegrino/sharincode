import { main } from "styles/Home.module.scss";
import Loader from "components/Loader";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import APIManager from "./api/axios";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { loader } from "styles/Home.module.scss";

const GhRedirect = () => {
  const router = useRouter();
  const [_, setUser] = useAtom(userAtom);

  const getUserFromGithub = useCallback(
    async (code) => {
      try {
        const response = await APIManager.logFromGithub(code);
        await setUser(response.data);
        await router.replace("/");
      } catch (err) {
        console.error(err.response.data);
      }
    },
    [router, setUser]
  );

  useEffect(() => {
    const { query } = router;

    getUserFromGithub(query.code);
  }, [getUserFromGithub, router]);

  return (
    <div className={main} style={{ textAlign: "center" }}>
      Patience...
      <br />
      Vous allez être redirigé
      <br />
      <div className={loader}>
        <Loader />
      </div>
    </div>
  );
};

export default GhRedirect;
