import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
    width: "300px",
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

  const styleForgottPassword = { mb: "20px", ml: "20px" };

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
            <Stack spacing={2}>
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
              <Typography
                color="text.secondary"
                sx={styleForgottPassword}
                variant="body2"
              >
                Forgot password?
              </Typography>
              {errorStatus === 403 ? (
                <p>E-Mail or Password is not correct</p>
              ) : null}
              {errorStatus === 500 || errorStatus === 0 ? (
                <p>We are very sorry. Please try again later!</p>
              ) : null}
              <Button
                id="login-button"
                fullWidth
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
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
