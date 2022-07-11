import { Stack, TextField, CardActionArea } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ProfilePage() {
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
            <TextField fullWidth label="First Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Last Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" type="email" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Phone" />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Stack justifyContent="end" direction="row">
              <Button variant="contained" type="submit" sx={{}}>
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* PROFILE CARD SIDE (RIGHT) */}
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="src\components\img\pexel.webp"
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
