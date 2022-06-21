import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import AnTableHead from "./AnTableHead";
import AnCollapsibleRow from "./AnTableRow";

import "./style.css";
// import styles from "./Styles";

export default class AnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObject: props.data,
      rowUpdated: false,
    };

    this.tmpDataObject = null;
    this.onTransferEdit = this.onTransferEdit.bind(this);
    this.onRowCollapseToggle = this.onRowCollapseToggle.bind(this);
  }

  componentDidUpdate() {
    const { rowUpdated } = this.state;
    if (rowUpdated === true) {
      this.setState({
        rowUpdated: false,
        dataObject: this.tmpDataObject,
      });

      this.tmpDataObject = null;
    }
  }

  onRowCollapseToggle(row, isOpen) {
    const { dataObject } = this.state;
    const newDataObject = { ...dataObject };
    const { categories } = newDataObject;

    switch (row.type) {
      case "category": {
        categories[row.id].isOpen = isOpen;
        break;
      }

      case "subcategory": {
        categories[row.categoryId].children[row.id].isOpen = isOpen;
        break;
      }

      case "datev": {
        categories[row.categoryId].children[row.subcategoryId].children[
          row.id
        ].isOpen = isOpen;
        break;
      }

      default:
        return;
    }

    if (isOpen === false && row.children) {
      Object.values(row.children).forEach((child) => {
        this.onRowCollapseToggle(child, false);
      });
    }
    this.updateRows(newDataObject);
  }

  onNameEdit(value, row) {
    let index = 0;
    const { categories, subcategories, datevAccounts } = this.state;
    switch (row.type) {
      case "category": {
        const newCategories = [...categories];
        index = newCategories.findIndex((cat) => cat.id === row.id);
        newCategories[index].name = value;
        this.setState({ categories: newCategories, dataObject: null });
        break;
      }
      case "subcategory": {
        const newSubcategories = [...subcategories];
        index = newSubcategories.findIndex((cat) => cat.id === row.id);
        newSubcategories[index].name = value;
        this.setState({ subcategories: newSubcategories, dataObject: null });
        break;
      }
      case "datev": {
        const newDatev = [...datevAccounts];
        index = newDatev.findIndex((dtv) => dtv.id === row.id);
        newDatev[index].name = value;
        this.setState({ datevAccounts: newDatev, dataObject: null });
        break;
      }
      default:
        break;
    }
  }

  onTransferEdit(value, prevValue, row, transfer, type) {
    const { dataObject } = this.state;
    const jsonDataObject = JSON.stringify(dataObject);
    const newDataObject = JSON.parse(jsonDataObject);

    const category = newDataObject.categories[row.categoryId];
    const subcategory = category.children[row.subcategoryId];
    const datevAccount = subcategory.children[row.id];

    this.setMonthlyTotal(
      transfer.month,
      type,
      [category, subcategory, datevAccount],
      Number.parseFloat(value),
      Number.parseFloat(prevValue)
    );

    this.updateRows(newDataObject);
  }

  // eslint-disable-next-line
  setMonthlyTotal(month, type, objects, value, prevValue) {
    for (const obj of objects) {
      obj.monthlyTotal[month][type] -= prevValue;
      obj.monthlyTotal[month][type] += value;
    }
  }

  updateRows(newDataObject) {
    this.tmpDataObject = newDataObject;
    this.setState({ rowUpdated: true, dataObject: null });
  }

  render() {
    const { dataObject } = this.state;

    if (dataObject === null) return "Loading...";

    const { categories, dates } = dataObject;

    const data = Object.values(categories);
    const months = Object.values(dates);
    const monthHeaders = ["Actual", "Budget", "Abs", "%"];

    return (
      <Table>
        <AnTableHead
          months={months}
          monthHeaders={monthHeaders}
          key="table-head"
        />

        <TableBody>
          {data.map((cat) => (
            <AnCollapsibleRow
              toggleOpen={this.onRowCollapseToggle}
              key={cat.name}
              row={cat}
              rowId={cat.id}
              onNameEdit={(value, row) => this.onNameEdit(value, row)}
              onTransferEdit={this.onTransferEdit}
            >
              {cat.children}
            </AnCollapsibleRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
