import { Stack, TextField, CardActionArea } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Api from "@services/Api";

//eslint-disable-next-line
export default function ProfilePage({ user }) {
  // CREATE A BOOLEAN STATE disabled starts as true
  const [disabled, setDisabled] = React.useState(true);
  const [userData, setUserData] = React.useState(user);

  // Update a specific field (id) from the userData state
  const updateUserData = (id, data) => {
    setUserData({ ...userData, [id]: data });
  };

  function updateData() {
    setDisabled(true);
    // api call the update data
    Api.users.put({ data: userData });
  }

  return (
    <Box sx={{ px: 2 }}>
      <Grid
        container
        spacing={1}
        alignItems="flex-start"
        direction="row"
        justify="flex-start"
      >
        {/* FORM SIDE ( LEFT ) */}

        <Grid container xs={8} spacing={1}>
          <Grid item xs={12}>
            <h4>General Information</h4>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              id="firstname"
              value={userData.firstname}
              onChange={(e) => updateUserData(e.target.id, e.target.value)}
              // add the disabled state as the value of disabled
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled={disabled}
              label="Last Name"
              id="lastname"
              value={userData.lastname}
              onChange={(e) => updateUserData(e.target.id, e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled={disabled}
              label="Email"
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => updateUserData(e.target.id, e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="username"
              disabled={disabled}
              id="username"
              value={userData.username || null}
              onChange={(e) => updateUserData(e.target.id, e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <h4>Adress</h4>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Enter your home address" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="NO." />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="City" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="ZIP" />
          </Grid> */}

          <Grid item xs={12}>
            <Stack justifyContent="end" direction="row">
              {disabled === false ? (
                <>
                  <Button
                    onClick={() => setDisabled(true)}
                    variant="contained"
                    type="submit"
                    sx={{}}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => updateData()}
                    variant="contained"
                    type="submit"
                    sx={{}}
                  >
                    Save
                  </Button>
                </>
              ) : null}
              {disabled === true ? (
                <Button
                  onClick={() => setDisabled(false)}
                  variant="contained"
                  type="submit"
                  sx={{}}
                >
                  Edit
                </Button>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
        {/* PROFILE CARD SIDE (RIGHT) */}
        <Grid item xs={4} spacing={1}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="src\img\pexel.webp"
                alt="User"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <p>User</p>
                  <a href="someone@gmail.com">someone@gmail.com</a>
                  <p>Germany , Berlin</p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
