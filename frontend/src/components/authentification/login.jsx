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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleLogo from "@assets/GoogleLogo";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { loginEndpoint } from "../../apiEndpoints";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);

  // STATEHANDLE FOR VISIBILL-PASSWORD-BUTTON --> BOOLEAN
  const handleHidden = () => {
    setHidden(!hidden);
  };

  // CHECKS IF EMAIL HAS VALID FORMAT --> BOOLEAN
  const handleValidEmail = () => {
    setValidEmail(validator.isEmail(email));
  };

  // POST REQUEST TO BACKEND
  const userData = {
    email,
    password,
  };

  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(loginEndpoint, userData)
      .then(() => navigate("/analysis"))
      .catch((err) => setErrorStatus(err.response.status));
  };

  // VARIABLES FOR STYLING --- START ---
  const styleContainer = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "primary.main",
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
  };

  const styleCreateUser = { color: "#FFFFFF" };
  // VARIABLES FOR STYLING --- END ---

  return (
    <Box sx={styleContainer}>
      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src="src\assets\fugger_logo.svg" />
          <Typography sx={styleCreateUser} variant="h5">
            Fugger
          </Typography>
        </Stack>
        <Card sx={styleCard}>
          <Typography sx={styleTitle} variant="h6">
            Log in to your account
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
                  label="E-Mail"
                  variant="outlined"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={handleValidEmail}
                  error={!validEmail}
                />
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="login-textfield-password"
                  label="Password"
                  variant="outlined"
                  type={hidden === false ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton tabIndex={-1} onClick={handleHidden}>
                          {hidden === false ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography color="text.secondary" variant="body2">
                  Forgot password?
                </Typography>
                {errorStatus === 403 ? (
                  <Alert severity="error">
                    E-Mail or Password is not correct
                  </Alert>
                ) : null}
                {errorStatus === 500 || errorStatus === 0 ? (
                  <Alert severity="error">
                    We are very sorry. Please try again later!
                  </Alert>
                ) : null}
                <Button
                  sx={{ borderRadius: "10px" }}
                  id="login-button-email"
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Stack>
              {/* -------------------------------- LOG IN WITH THIRD PARTY PROVIDER -------------------------------------------------------------- */}
              <Stack sx={{ width: "50%" }} spacing={2}>
                <Typography
                  sx={{ color: "grey.700" }}
                  variant="body2"
                  align="center"
                >
                  Or log in with:
                </Typography>
                <Button
                  sx={{ color: "grey.700", borderRadius: "10px" }}
                  id="login-button-google"
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleLogo />}
                >
                  Google
                </Button>
                <Button
                  sx={{ color: "#4267B2", borderRadius: "10px" }}
                  id="login-button-facebook"
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                >
                  Facebook
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "medium",
                    color: "#0A66C2",
                    borderRadius: "10px",
                  }}
                  id="login-button-linkedin"
                  fullWidth
                  variant="outlined"
                  endIcon={<LinkedInIcon sx={{ margin: "-9px" }} />}
                >
                  Linked
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
        <Typography sx={styleCreateUser} variant="caption">
          New User?{" "}
          <Link style={styleCreateUser} to="/signup">
            Create Account
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default LoginPage;
