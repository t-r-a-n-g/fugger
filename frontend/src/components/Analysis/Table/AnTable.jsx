import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import AnTableHead from "./AnTableHead";
import AnCollapsibleRow from "./AnTableRow";
import "./AnalysisTable.css";

export default class AnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObject: props.data,
      openState: {},
    };

    this.tmpDataObject = null;
    this.onTransferEdit = this.onTransferEdit.bind(this);
  }

  componentDidUpdate() {
    const { transferUpdated } = this.state;
    if (transferUpdated === true) {
      this.setState({
        transferUpdated: false,
        dataObject: this.tmpDataObject,
      });

      this.tmpDataObject = null;
    }
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

    this.tmpDataObject = newDataObject;

    // set dataObject to null to force an update
    this.setState({ transferUpdated: true, dataObject: null });
  }

  // eslint-disable-next-line
  setMonthlyTotal(month, type, objects, value, prevValue) {
    for (const obj of objects) {
      obj.monthlyTotal[month][type] -= prevValue;
      obj.monthlyTotal[month][type] += value;
    }
  }

  render() {
    const { dataObject, openState } = this.state;

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
              openState={openState}
              setOpen={(row, isOpen) =>
                this.setState((state) => ({
                  openState: { ...state.openState, [row]: isOpen },
                }))
              }
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
