import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import PropTypes from "prop-types";

import { headerShape, headerChildrenShape } from "./propTypes";
import "./FuDataTable.css";

function FuTableHeadChildren({ cells, headerChildren }) {
  const children = [];

  // loop over all headers (parents) and see if they have children.
  // since the children are stored as array of arrays, there can't be more children then parent cells,
  // so we can map over the parents and compare the ids
  for (const [index, cell] of cells.entries()) {
    if (!headerChildren[index] || headerChildren[index].parentId !== cell.id)
      children.push({
        id: index,
        label: "",
      });
    else {
      headerChildren[index].items.forEach((item) => {
        children.push({ ...item });
      });
    }
  }

  return (
    <>
      {children.map((child, index) => (
        <TableCell key={`${child.id}_${index}`} className={child.className}>
          {child.label}
        </TableCell>
      ))}
    </>
  );
}

function FuTableHead({ cells }) {
  // get all children headers (aka groups) and save them with their parents id
  const children = cells.map((cell) => {
    if (cell.children) return { parentId: cell.id, items: cell.children };
    return null;
  });

  const hasChildren = children.length > 0;

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {
          // map through all headers. if they have children give them the apprpriate column length
          cells.map((cell) => (
            <TableCell
              key={cell.id}
              colSpan={cell.children ? cell.children.length : 1}
              align={cell.children ? "center" : "left"}
            >
              {cell.label}
            </TableCell>
          ))
        }
      </TableRow>

      {
        // if there are children display them in a second header row
        hasChildren ? (
          <TableRow>
            <TableCell />
            <FuTableHeadChildren cells={cells} headerChildren={children} />
          </TableRow>
        ) : null
      }
    </TableHead>
  );
}

FuTableHead.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.shape(headerShape)).isRequired,
};

FuTableHeadChildren.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.shape(headerShape)).isRequired,
  headerChildren: PropTypes.arrayOf(PropTypes.shape(headerChildrenShape))
    .isRequired,
};

export default FuTableHead;
