import Api from "@services/Api";
import { useNavigate } from "react-router-dom";

function LogoutPage({ setUser }) {
  const navigate = useNavigate();

  Api.logout().then(() => {
    setUser(null);
    navigate("/login");
  });

  return null;
}

export default LogoutPage;
