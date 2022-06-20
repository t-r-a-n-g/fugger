/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import TableCell from "@mui/material/TableCell";

export default class AnTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.children,
      prevValue: null,
    };

    this.onKeyPressOnInput = this.onKeyPressOnInput.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
    onValueChange(value, prevValue);
  }

  render() {
    const { value, isEditing } = this.state;
    if (isEditing) {
      return (
        <TableCell>
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
      <TableCell onClick={(e) => this.onCellClick(e)}>
        <span>{value}</span>
      </TableCell>
    );
  }
}
