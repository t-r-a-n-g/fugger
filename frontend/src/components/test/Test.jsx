import * as React from "react";
import { Card, CardContent } from "@mui/material";
import { Title } from "react-admin";

function Test() {
  return (
    <Card>
      <Title title="My Page" />
      <CardContent>
        <h1>Test</h1>
      </CardContent>
    </Card>
  );
}

export default Test;
