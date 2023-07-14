import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Data, HeaderCell } from './data';

function SortableTableHeader(props: any) {
  const { order, orderBy, onRequestSort, headerCells } = props;
  const createSortHandler = (property: keyof Data) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell: HeaderCell) => (
          <TableCell key={headerCell.id} sortDirection={orderBy === headerCell.id ? order : false} sx={{ whiteSpace: 'nowrap' }}>
            <TableSortLabel active={orderBy === headerCell.id} direction={orderBy === headerCell.id ? order : 'asc'} onClick={createSortHandler(headerCell.id)}>
              {headerCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export { SortableTableHeader };
