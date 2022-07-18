import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";

import userAtom from "@recoil/users";

function LogoutPage() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    setUser(null);
    navigate("/login");
  }, []);

  return null;
}

export default LogoutPage;
