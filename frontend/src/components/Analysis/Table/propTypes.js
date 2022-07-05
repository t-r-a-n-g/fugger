import PropTypes from "prop-types";

const AnTableCellProps = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sx: PropTypes.object,
};

const AnTableCellDefaultProps = {
  className: "",
  sx: {},
};

const AnTableRowProps = {
  cellData: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
      PropTypes.shape({
        value: PropTypes.node.isRequired,
        key: PropTypes.string,
        className: PropTypes.string,
        isEditable: PropTypes.bool,
        onValueChange: PropTypes.func,
        sx: PropTypes.object,
      }),
    ])
  ).isRequired,
  className: PropTypes.string,

  toggleOpen: PropTypes.func,
  isOpen: PropTypes.bool,

  isChild: PropTypes.bool,
  hasChildren: PropTypes.bool,
  childRows: PropTypes.array,
  rowDepth: PropTypes.number,
};

const AnTableRowDefaultProps = {
  className: "",

  toggleOpen: () => {},
  isOpen: false,

  isChild: false,
  hasChildren: false,
  childRows: [],
  rowDepth: 0,
};

const AnTableHeadProps = {
  headers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string,
          className: PropTypes.string,
          key: PropTypes.string,
          colSpan: PropTypes.number,
          align: PropTypes.string,
        }),
      ])
    )
  ).isRequired,
};

const AnTableProps = {
  headers: AnTableHeadProps.headers,
  data: PropTypes.arrayOf(PropTypes.shape(AnTableRowProps)),
};

export {
  AnTableCellProps,
  AnTableCellDefaultProps,
  AnTableRowProps,
  AnTableRowDefaultProps,
  AnTableHeadProps,
  AnTableProps,
};
