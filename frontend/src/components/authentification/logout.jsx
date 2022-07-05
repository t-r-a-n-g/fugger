import Api from "@services/Api";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

function LogoutPage({ setUser }) {
  const navigate = useNavigate();

  Api.logout().then(() => {
    setUser(null);
    navigate("/login");
  });

  return null;
}

LogoutPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default LogoutPage;
