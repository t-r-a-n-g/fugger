import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import MyLayout from "@components/layouts/MyLayout";
import Test from "@components/test/Test";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
      <CustomRoutes>
        <Route path="/test" element={<Test />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
