import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Data } from './SummaryTable';
import { HeaderCell } from './data';

function SortableTableHeader(props: any) {
  const { order, orderBy, onRequestSort, headerCells } = props;
  const createSortHandler = (property: keyof Data) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="normal"></TableCell>
        {headerCells.map((headerCell: HeaderCell) => (
          <TableCell
            key={headerCell.id}
            sx={{ width: headerCell.width }}
            align={headerCell.numeric ? 'right' : 'left'}
            padding={headerCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headerCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headerCell.id} direction={orderBy === headerCell.id ? order : 'asc'} onClick={createSortHandler(headerCell.id)}>
              {headerCell.label}
              {orderBy === headerCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export { SortableTableHeader };
