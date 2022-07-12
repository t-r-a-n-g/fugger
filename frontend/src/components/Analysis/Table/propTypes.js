import PropTypes from "prop-types";

const AnTableCellProps = {
  children: PropTypes.node.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  sx: PropTypes.object,
};

const AnTableCellDefaultProps = {
  label: null,
  className: "",
  sx: {},
};

const AnTableRowProps = {
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
        PropTypes.node,
        PropTypes.object,
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
  children: PropTypes.node.isRequired,
};

export {
  AnTableCellProps,
  AnTableCellDefaultProps,
  AnTableRowProps,
  AnTableRowDefaultProps,
  AnTableHeadProps,
  AnTableProps,
};
