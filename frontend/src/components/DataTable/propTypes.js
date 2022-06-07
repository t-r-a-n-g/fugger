import PropTypes from "prop-types";

export const headerShape = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape(this)),
  name: PropTypes.string,
};

export const headerChildrenShape = {
  parentId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(headerShape)),
};

export const dataShape = {
  id: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape(this)),
  name: PropTypes.string,
};
