import { useState, useMemo, FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import { SortableTableHeader } from './SortableTableHeader';
import { headerCells, Data } from './data';
import { Typography } from '@mui/material';

type Order = 'asc' | 'desc';

interface SummaryTableProps {
  name: string;
  data: Data[];
}

export const SummaryTable: FC<SummaryTableProps> = (props: SummaryTableProps) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('type');

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => props.data.sort(getComparator(order, orderBy)), [order, orderBy]);

  return (
    <Paper sx={{ paddingX: 1, paddingY: '1rem' }}>
      <Typography variant="h6" textAlign="left" gutterBottom>
        {props.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <SortableTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headerCells={headerCells} />
          <TableBody>
            {sortedRows.map((row, index) => {
              // We can dynamically create all the cells except for the id cell
              const cells = Object.entries(row).map((keypair: [string, keyof Data]) => {
                return (
                  <TableCell key={index + keypair[0]} align="right">
                    {keypair[1]}
                  </TableCell>
                );
              });
              return <TableRow key={row.type}>{cells}</TableRow>;
            })}

            <TableRow
              style={{
                height: 60
              }}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
