import React from "react";

import Table from "@mui/material/Table";
import AnTableHead from "./AnTableHead";

import { AnTableProps } from "./propTypes";

function AnTable(props) {
  const { headers, children } = props;

  return (
    <Table>
      <AnTableHead headers={headers} key="an-table-head" />
      <tbody>{children}</tbody>
    </Table>
  );
}

AnTable.propTypes = AnTableProps;

export default AnTable;
