import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import AnTableHead from "./AnTableHead";
import AnCollapsibleRow from "./AnTableRow";

export default class AnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.data.categories,
      subcategories: props.data.subcategories,
      datevAccounts: props.data.datevAccounts,
      monthlyData: props.data.monthlyData,

      dataObject: null,
    };
  }

  componentDidMount() {
    this.setState({ dataObject: this.calculateTotalTransfers() });
  }

  componentDidUpdate() {
    const { dataObject } = this.state;
    if (dataObject === null)
      this.setState({ dataObject: this.calculateTotalTransfers() });
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

  onTransferEdit(value, transfer, type) {
    const { monthlyData } = this.state;
    const newMonthlyData = [...monthlyData];
    const monthlyDataIndex = Object.values(newMonthlyData).findIndex(
      (m) => transfer.key === m.key
    );

    const newTransfer = monthlyData[monthlyDataIndex].transfers.find(
      (trsf) => trsf.id === transfer.id
    );

    if (type === "actual") newTransfer.actual = +value;
    else if (type === "budget") newTransfer.budget = +value;

    this.setState({
      monthlyData: newMonthlyData,
      dataObject: null,
    });
  }

  // ToDo: move to helper class
  // eslint-disable-next-line
  getObjectCopies(objects, from) {
    const copies = {};
    for (const o of objects) {
      if (from[o]) {
        if (Array.isArray(from[o])) copies[o] = [...from[o]];
        else if (typeof from[o] === "object") copies[o] = { ...from[o] };
        else copies[o] = from[o];
      }
    }

    return copies;
  }

  calculateTotalTransfers() {
    const { monthlyData, datevAccounts, subcategories, categories } =
      this.getObjectCopies(Object.keys(this.state), this.state);

    const localCategories = {};
    const localSubcategories = {};

    // console.log(monthlyData);
    // for (const month of monthlyData) {
    //   const datevAccount = datevAccounts[month.datevAccountId];
    //   const subcategory = subcategories[datevAccount.subcategoryId];
    //   const category = categories[subcategory.categoryId];
    //
    //   if (!category.children) category.children = [];
    //   if (!subcategory.children) subcategory.children = [];
    //
    //   for (const transfer of month.transfers) {
    //   }
    // }
    // return null;
    for (const month of monthlyData) {
      for (const transfer of month.transfers) {
        const datevAccount = datevAccounts.find(
          (dtv) => dtv.id === transfer.datevAccountId
        );
        datevAccount.type = "datev";

        if (!localSubcategories[datevAccount.subcategoryId]) {
          localSubcategories[datevAccount.subcategoryId] = {
            ...subcategories.find((sc) => sc.id === datevAccount.subcategoryId),
            children: {},
            monthlyTotal: {},
            isEditable: true,
          };
        }

        const sc = localSubcategories[datevAccount.subcategoryId];
        if (!sc.monthlyTotal[month.key])
          sc.monthlyTotal[month.key] = { actual: 0, budget: 0 };

        sc.monthlyTotal[month.key].actual += transfer.actual;
        sc.monthlyTotal[month.key].budget += transfer.budget;

        if (!sc.children[datevAccount.id]) {
          sc.children[datevAccount.id] = {
            ...datevAccount,
            monthlyTotal: {},
            isEditable: true,
          };
        }

        sc.children[datevAccount.id].monthlyTotal[month.key] = {
          ...transfer,
          isEditable: true,
        };
        sc.type = "subcategory";
      }
    }

    for (const subcategory of Object.values(localSubcategories)) {
      for (const month of Object.keys(subcategory.monthlyTotal)) {
        if (!localCategories[subcategory.categoryId]) {
          localCategories[subcategory.categoryId] = {
            ...categories.find((cat) => cat.id === subcategory.categoryId),
            monthlyTotal: {},
            children: {},
            isEditable: true,
          };
        }

        const cat = localCategories[subcategory.categoryId];
        if (!cat.monthlyTotal[month])
          cat.monthlyTotal[month] = { actual: 0, budget: 0 };

        const localMonthlyData = subcategory.monthlyTotal[month];

        cat.monthlyTotal[month].actual += localMonthlyData.actual;
        cat.monthlyTotal[month].budget += localMonthlyData.budget;
        cat.children[subcategory.id] = subcategory;
        cat.type = "category";
      }
    }

    return localCategories;
  }

  render() {
    const { data } = this.props;
    const months = data.monthlyData;
    const monthHeaders = ["Actual", "Budget", "Abs", "%"];
    const { dataObject } = this.state;

    if (dataObject === null) return "Loading...";
    return (
      <Table>
        <AnTableHead months={months} monthHeaders={monthHeaders} />

        <TableBody>
          {Object.values(dataObject).map((cat) => (
            <AnCollapsibleRow
              key={cat.name}
              row={cat}
              rowId={cat.id}
              onNameEdit={(value, row) => this.onNameEdit(value, row)}
              onTransferEdit={(value, transfer, type) =>
                this.onTransferEdit(value, transfer, type)
              }
            >
              {cat.children}
            </AnCollapsibleRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

AnTable.propTypes = {
  data: PropTypes.objectOf({
    categories: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,

    subcategories: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
    }).isRequired,

    datevAccounts: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      subcategoryId: PropTypes.number.isRequired,
    }).isRequired,

    monthlyData: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      transfers: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        actual: PropTypes.number.isRequired,
        budget: PropTypes.number.isRequired,
        datevAccountId: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
