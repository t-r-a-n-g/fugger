import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import MyLayout from "@components/layout/MyLayout";
import Test from "@components/test/Test";
import UploadPage from "@components/uploadPage/UploadPage";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <div>
      <Admin layout={MyLayout} dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
        <CustomRoutes>
          <Route path="/test" element={<Test />} />
          <Route path="/upload" element={<UploadPage />} />
        </CustomRoutes>
      </Admin>
    </div>
  );
}

export default App;
