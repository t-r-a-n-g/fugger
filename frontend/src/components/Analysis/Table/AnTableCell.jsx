/* eslint-disable jsx-a11y/no-autofocus */

import React from "react";

import TableCell from "@mui/material/TableCell";
import { AnTableCellProps, AnTableCellDefaultProps } from "./propTypes";

class AnTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      label: props.children,
      value: props.value || props.children,
      prevValue: null,
      sx: {
        borderBottom: 1,
        borderBottomColor: "table.border.thin",
        backgroundColor: "table.body.backgroundColor",
        ...props.sx,
      },
    };
    this.onKeyPressOnInput = this.onKeyPressOnInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    // reset state on rerender because the constructor is not called again
    const { children, value } = this.props;
    if (prevProps.children !== children)
      this.setState({ value: value || children, label: children });
  }

  onCellClick() {
    const { isEditing } = this.state;
    const { isEditable } = this.props;
    if (!isEditing && isEditable === true) {
      this.setState((state) => ({ prevValue: state.value, isEditing: true }));
    }
  }

  onKeyPressOnInput(e) {
    const { isEditing } = this.state;
    if (isEditing) {
      if (e.key === "Enter") {
        this.setNewValue(e.target.value);
      } else if (e.key === "Escape") {
        this.setState((state) => ({
          value: state.prevValue,
          isEditing: false,
        }));
      }
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
    const { prevValue } = this.state;

    this.setState({ isEditing: false });

    const res = onValueChange(value, prevValue);
    const isPromise = typeof res === "object" && typeof res.then === "function";

    if (isPromise) {
      res.then((success) => {
        if (success === false) {
          this.setState({ value: prevValue });
        }
      });
    } else if (res === false) {
      this.setState({ value: prevValue });
    }
  }

  render() {
    const { value, isEditing, label, sx } = this.state;
    const { className } = this.props;
    if (isEditing) {
      return (
        <TableCell className={`an-col ${className}`}>
          <input
            type="text"
            value={value}
            onKeyDown={(e) => this.onKeyPressOnInput(e)}
            onChange={(e) => this.onChange(e)}
            onBlur={(e) => this.onBlur(e)}
            onFocus={(e) => {
              e.target.select();
            }}
            autoFocus
          />
        </TableCell>
      );
    }

    return (
      <TableCell
        onClick={(e) => this.onCellClick(e)}
        className={`an-col ${className}`}
        sx={sx}
      >
        {label}
      </TableCell>
    );
  }
}

AnTableCell.propTypes = AnTableCellProps;
AnTableCell.defaultProps = AnTableCellDefaultProps;

export default AnTableCell;
