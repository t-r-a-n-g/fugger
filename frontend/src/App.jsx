import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import MyLayout from "@components/layout/MyLayout";
import AnalysisTable from "@components/analysis/AnalysisTable";
import AnalysisTable2 from "@components/analysis/AnalysisTable2";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
      <CustomRoutes>
        <Route path="/test" element={<AnalysisTable />} />
        <Route path="/test2" element={<AnalysisTable2 />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
