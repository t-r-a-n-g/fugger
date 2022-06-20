import {
  Avatar,
  Button,
  Card,
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleLogo from "@assets/GoogleLogo";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Link as RouterLink,
  useNavigate,
  MemoryRouter,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import axios from "axios";
import validator from "validator";
import { useTranslation } from "react-i18next";
import { signupEndpoint } from "../../apiEndpoints";

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

function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation(); // i18next

  // STATEHANDLE FOR VISIBILL-PASSWORD-BUTTON --> BOOLEAN
  const handleHidden = () => {
    setHidden(!hidden);
  };

  // CHECKS IF PASSWORD IS STRONG --> BOOLEAN
  const handleStrongPassword = () => {
    if (password === "") {
      setStrongPassword(true);
    } else {
      setStrongPassword(validator.isStrongPassword(password, []));
    }
  };

  // SET STATE FOR PASSWORD
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // RUN PASSWORD CHECK IF ITS STRONG
  React.useEffect(() => {
    handleStrongPassword();
  }, [password]);

  // CHECKS IF EMAIL HAS VALID FORMAT --> BOOLEAN
  const handleValidEmail = () => {
    setValidEmail(validator.isEmail(email));
  };

  // CHECKS IF EMAILS MATCHING --> BOOLEAN
  const handleEmailCheck = (e) => {
    setEmailCheck(validator.equals(e.target.value, email));
  };

  // CHECKS IF PASSWORDS MATCHING --> BOOLEAN
  const handlePasswordCheck = (e) => {
    setPasswordCheck(validator.equals(e.target.value, password));
  };

  // POST REQUEST TO BACKEND
  const userData = {
    lastname,
    firstname,
    email,
    password,
  };

  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validEmail && strongPassword && passwordCheck && emailCheck) {
      axios
        .post(signupEndpoint, userData)
        .then(() => navigate("/analysis"))
        .catch((err) => {
          setErrorStatus(err.response.status);
        });
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
            {t("create-account-text")}
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <form onSubmit={handleSubmit} style={{ width: "50%" }}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  required
                  id="signup-firstname-textfield"
                  label={t("input-label-firstname")}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-lastname-textfield"
                  label={t("input-label-lastname")}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-email-textfield"
                  label={t("input-label-email")}
                  variant="outlined"
                  type="email"
                  size="small"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={handleValidEmail}
                  error={!(validEmail === true || validEmail === "")}
                  helperText={!validEmail ? t("error-valid-email") : null}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-email-confirm-textfield"
                  label={t("input-label-confirm-email")}
                  variant="outlined"
                  type="email"
                  size="small"
                  onChange={handleEmailCheck}
                  error={!(emailCheck || emailCheck === "")}
                  helperText={!emailCheck ? t("error-matching-emails") : null}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-create-password"
                  label={t("input-label-create-password")}
                  variant="outlined"
                  type={hidden === false ? "password" : "text"}
                  onChange={handlePassword}
                  autoComplete="new-password"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {strongPassword === true ? null : (
                          <Tooltip
                            open={!strongPassword}
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: "#3a3b3c",
                                  "& .MuiTooltip-arrow": {
                                    color: "#3a3b3c",
                                  },
                                },
                              },
                            }}
                            arrow
                            // TOOLTIP TITLE PROVIDES INFORMATION FOR EVERY PASSWORD RULE
                            // CHECKS IF RULE IS FULFILLED, IF YES RULE SHOWED GREEN
                            title={
                              <>
                                <Typography>
                                  {t("password-condition-text")}
                                </Typography>
                                <Typography
                                  sx={
                                    password.length >= 8
                                      ? { color: "#4caf50" }
                                      : null
                                  }
                                  variant="body2"
                                >
                                  {t("password-condition-length")}
                                </Typography>
                                <Typography
                                  sx={
                                    password.match(/[a-z]/g)
                                      ? { color: "#4caf50" }
                                      : null
                                  }
                                  variant="body2"
                                >
                                  {t("password-condition-lower-case")}
                                </Typography>
                                <Typography
                                  sx={
                                    password.match(/[A-Z]/g)
                                      ? { color: "#4caf50" }
                                      : null
                                  }
                                  variant="body2"
                                >
                                  {t("password-condition-upper-case")}
                                </Typography>
                                <Typography
                                  sx={
                                    password.match(/[0-9]/g)
                                      ? { color: "#4caf50" }
                                      : null
                                  }
                                  variant="body2"
                                >
                                  {t("password-condition-number")}
                                </Typography>
                                <Typography
                                  sx={
                                    password.match(/[^ \w]/g)
                                      ? { color: "#4caf50" }
                                      : null
                                  }
                                  variant="body2"
                                >
                                  {t("password-condition-special-charackter")}
                                </Typography>
                              </>
                            }
                          >
                            <GppMaybeIcon color="error" />
                          </Tooltip>
                        )}
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
                />
                <TextField
                  fullWidth
                  required
                  id="signup-confirm-password"
                  label={t("input-label-confirm-password")}
                  variant="outlined"
                  type={hidden === false ? "password" : "text"}
                  onChange={handlePasswordCheck}
                  error={!(passwordCheck === true || passwordCheck === "")}
                  helperText={
                    !passwordCheck ? t("error-matching-passwords") : null
                  }
                  autoComplete="new-password"
                  size="small"
                  InputProps={{
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
                />
                {errorStatus === 409 ? <p>{t("409-error-message")}</p> : null}
                {errorStatus === 400 ? <p>{t("409-error-message")}</p> : null}

                {errorStatus === 500 || errorStatus === 0 ? (
                  <p>{t("500-error-message")}</p>
                ) : null}
                <Button
                  fullWidth
                  sx={{ borderRadius: "10px" }}
                  type="submit"
                  variant="contained"
                >
                  {t("create-account")}
                </Button>
              </Stack>
            </form>
            {/* -------------------------------- LOG IN WITH THIRD PARTY PROVIDER -------------------------------------------------------------- */}
            <Stack
              sx={{ width: "50%" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                sx={{ color: "text.secondary" }}
                variant="body2"
                align="center"
              >
                {t("third-party-signup-text")}
              </Typography>
              <Button
                sx={{
                  color: "text.secondary",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
                id="signup-button-google"
                fullWidth
                variant="outlined"
                startIcon={<GoogleLogo />}
              >
                {t("third-party-google")}
              </Button>
              <Button
                sx={{
                  color: "#4267B2",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
                id="signup-button-facebook"
                fullWidth
                variant="outlined"
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
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
                id="signup-button-linkedin"
                fullWidth
                variant="outlined"
                endIcon={<LinkedInIcon sx={{ margin: "-9px" }} />}
              >
                {t("third-party-linkedin")}
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Typography sx={styleText} variant="caption">
          {t("already-have-account")}{" "}
          <Link color="primary.linkColor" component={RouterLink} to="/login">
            {t("log-in-button")}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default SignUpPage;
