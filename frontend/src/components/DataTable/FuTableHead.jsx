import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import CheckBox from "@mui/material/Checkbox";

/* eslint-disable */
import "./FuDataTable.css";

function FuTableHeadChildren({ cells, headerChildren }) {
  const children = [];

  for (const [index, cell] of cells.entries()) {
    const className = (index + 1) % 2 === 0 ? "even" : "uneven";
    if (!headerChildren[index] || headerChildren[index].parentId !== cell.id)
      children.push({
        id: index,
        label: "",
        className,
      });
    else {
      headerChildren[index].items.forEach((item) => {
        children.push({ ...item, className });
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

function FuTableHead({ cells, onSelectAllClick }) {
  const children = cells.map((cell, index) => {
    if (cell.children) return { parentId: cell.id, items: cell.children };
    return null;
  });

  const hasChildren = children.length > 0;

  return (
    <TableHead>
      <TableRow>
        <TableCell className="even">
          {hasChildren ? null : <CheckBox onChange={onSelectAllClick} />}
        </TableCell>
        {cells.map((cell, index) => (
          <TableCell
            key={cell.id}
            colSpan={cell.children ? cell.children.length : 1}
            align={cell.children ? "center" : "left"}
            className={(index + 1) % 2 === 0 ? "even" : "uneven"}
          >
            {cell.label}
          </TableCell>
        ))}
      </TableRow>

      {hasChildren ? (
        <TableRow>
          <TableCell>
            <CheckBox onChange={onSelectAllClick} />
          </TableCell>
          <FuTableHeadChildren cells={cells} headerChildren={children} />
        </TableRow>
      ) : null}
    </TableHead>
  );
}

export default FuTableHead;
