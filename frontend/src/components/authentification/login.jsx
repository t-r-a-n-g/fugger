import * as React from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleLogo from "@assets/GoogleLogo";

import {
  Link as RouterLink,
  MemoryRouter,
  useNavigate,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import validator from "validator";
import { useTranslation } from "react-i18next";
import Api from "@services/Api";

import { userWithAuth } from "@recoil/users";

// To convert react-router Links in MUI Links, to style them like MUI components --- start --- //
function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

// ----------------------------------- end ----------------------------------- //

function LoginPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation(); // i18next

  // STATEHANDLE FOR VISIBILL-PASSWORD-BUTTON --> BOOLEAN
  const handleHidden = () => {
    setHidden(!hidden);
  };

  // CHECKS IF EMAIL HAS VALID FORMAT --> BOOLEAN
  const handleValidEmail = () => {
    setValidEmail(validator.isEmail(email));
  };

  // POST REQUEST TO BACKEND

  const [errorStatus, setErrorStatus] = useState();
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userWithAuth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Api.auth.login(email, password);
      setUser(user.data);
      navigate("/");
    } catch (err) {
      setErrorStatus(err.response.status);
    }
  };

  // VARIABLES FOR STYLING --- START ---
  const styleContainer = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "background.color",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const styleCard = {
    width: "500px",
    minWidth: "fit-content",
    height: "fit-content",
    borderRadius: "20px",
    padding: "20px",
  };

  const styleTitle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    pb: "20px",
    color: "text.primary",
  };

  const styleText = { color: "primary.contrastText" };
  // VARIABLES FOR STYLING --- END ---

  return (
    <Box sx={styleContainer}>
      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src="src\assets\fugger_logo.svg" />
          <Typography sx={styleText} variant="h5">
            Fugger
          </Typography>
        </Stack>
        <Card sx={styleCard}>
          <Typography sx={styleTitle} variant="h6">
            {t("log-in")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={2}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack spacing={2} sx={{ width: "50%" }}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="login-textfield-email"
                  label={t("input-label-email")}
                  variant="outlined"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={handleValidEmail}
                  error={!validEmail}
                  InputProps={{
                    style: { fontSize: 13 },
                  }}
                  InputLabelProps={{
                    color: "contrastText",
                  }}
                />
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="login-textfield-password"
                  label={t("input-label-password")}
                  variant="outlined"
                  type={hidden === false ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    style: { fontSize: 13 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton tabIndex={-1} onClick={handleHidden}>
                          {hidden === false ? (
                            <VisibilityOffIcon
                              sx={{ color: "text.secondary" }}
                            />
                          ) : (
                            <VisibilityIcon sx={{ color: "text.secondary" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    color: "contrastText",
                  }}
                />
                <Typography color="text.secondary" variant="body2">
                  {t("forgot-password")}
                </Typography>
                {errorStatus === 403 ? (
                  <Alert severity="error">
                    {t("incorrect-email-or-password")}
                  </Alert>
                ) : null}
                {errorStatus === 500 || errorStatus === 0 ? (
                  <Alert severity="error">{t("500-error-message")}</Alert>
                ) : null}
                <Button
                  sx={{ borderRadius: "10px" }}
                  id="login-button-email"
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  {t("log-in-button")}
                </Button>
              </Stack>
              {/* -------------------------------- LOG IN WITH THIRD PARTY PROVIDER -------------------------------------------------------------- */}
              <Stack sx={{ width: "50%" }} spacing={2}>
                <Typography
                  sx={{ color: "text.secondary" }}
                  variant="body2"
                  align="center"
                >
                  {t("third-party-login-text")}
                </Typography>
                <Button
                  sx={{
                    color: "text.secondary",
                    borderRadius: "10px",
                    "&:hover": {
                      color: "primary.contrastText",
                    },
                  }}
                  id="login-button-google"
                  fullWidth
                  variant="contained"
                  startIcon={<GoogleLogo />}
                >
                  {t("third-party-google")}
                </Button>
                <Button
                  sx={{
                    color: "#4267B2",
                    borderRadius: "10px",
                    "&:hover": {
                      color: "primary.contrastText",
                    },
                  }}
                  id="login-button-facebook"
                  fullWidth
                  variant="contained"
                  startIcon={<FacebookIcon />}
                >
                  {t("third-party-facebook")}
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "medium",
                    color: "#0A66C2",
                    borderRadius: "10px",
                    "&:hover": {
                      color: "primary.contrastText",
                    },
                  }}
                  color="primary"
                  id="login-button-linkedin"
                  fullWidth
                  variant="contained"
                  endIcon={<LinkedInIcon sx={{ margin: "-9px" }} />}
                >
                  {t("third-party-linkedin")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
        <Typography sx={styleText} variant="caption">
          {t("new-user")}{" "}
          <Link color="primary.linkColor" component={RouterLink} to="/signup">
            {t("create-account")}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default LoginPage;
