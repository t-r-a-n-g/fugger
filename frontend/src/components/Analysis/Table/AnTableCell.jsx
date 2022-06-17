/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

export default class AnTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.children,
      prevValue: null,
    };
  }

  onCellClick() {
    const { isEditing } = this.state;
    const { isEditable } = this.props;

    if (!isEditing && isEditable === true) {
      this.setState((state) => ({ prevValue: state.value, isEditing: true }));
    }
  }

  onKeyPressOnInput(e) {
    if (e.key === "Enter") {
      this.setNewValue(e.target.value);
    } else if (e.key === "Escape") {
      this.setState((state) => ({ value: state.prevValue }));
    }
  }

  onBlur(e) {
    this.setNewValue(e.target.value);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  setNewValue(value) {
    const { onValueChange } = this.props;

    this.setState({ isEditing: false });
    onValueChange(value);
  }

  render() {
    const { value, isEditing } = this.state;
    if (isEditing) {
      return (
        <TableCell>
          <input
            type="text"
            value={value}
            onKeyPress={(e) => this.onKeyPressOnInput(e)}
            onBlur={(e) => this.onBlur(e)}
            onChange={(e) => this.onChange(e)}
            onFocus={(e) => {
              e.target.select();
            }}
            autoFocus
          />
        </TableCell>
      );
    }

    return (
      <TableCell onClick={(e) => this.onCellClick(e)}>
        <span>{value}</span>
      </TableCell>
    );
  }
}

AnTableCell.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  isEditable: PropTypes.bool,
};

AnTableCell.defaultProps = {
  children: "",
  isEditable: false,
};
