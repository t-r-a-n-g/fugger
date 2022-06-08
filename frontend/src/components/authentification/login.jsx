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
// import { Link } from "react-router-dom";
import validator from "validator";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validEmail === true) {
      console.warn(password);
      // TO DO: IMPLEMENT FETCH DATA FROM DB
      console.warn("Invalid email or password");
    } else {
      console.warn("Invalid email format");
    }
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
    width: "fit-content",
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
                Forgott password?
              </Typography>
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
          {/* <Link style={styleCreateUser} to="/sign-up">
          Create Account
        </Link> */}
          Create Account
        </Typography>
      </Stack>
    </Box>
  );
}

export default LoginPage;
