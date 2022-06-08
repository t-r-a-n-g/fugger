import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import PropTypes from "prop-types";

import "./FuDataTable.css";

function CollapseIcon({ isCollapsed, onClick }) {
  if (isCollapsed) {
    return (
      <span className="collapse-icon">
        <KeyboardArrowDownIcon onClick={onClick} />
      </span>
    );
  }
  return (
    <span className="collapse-icon">
      <KeyboardArrowUpIcon onClick={onClick} />
    </span>
  );
}

function FuTableRow({
  children,
  collapsable,
  isCollapsed,
  onCollapseClick,
  isHidden,
  className,
}) {
  if (isHidden) return null;

  return (
    <TableRow className={className}>
      <TableCell>
        <DragIndicatorIcon />
        {collapsable === true ? (
          <CollapseIcon isCollapsed={isCollapsed} onClick={onCollapseClick} />
        ) : null}
      </TableCell>
      {children}
    </TableRow>
  );
}

CollapseIcon.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

FuTableRow.propTypes = {
  children: PropTypes.arrayOf().isRequired,
  collapsable: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool,
  onCollapseClick: PropTypes.func,
  isHidden: PropTypes.bool,
  className: PropTypes.string,
};

FuTableRow.defaultProps = {
  isCollapsed: false,
  onCollapseClick: () => {},
  isHidden: false,
  className: "",
};

export default FuTableRow;
