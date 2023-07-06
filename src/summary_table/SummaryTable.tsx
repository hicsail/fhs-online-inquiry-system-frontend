import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import { SortableTableHeader } from './SortableTableHeader';
import { headerCells, Data, rows } from './data';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const SummaryTable = (props: any) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('type');

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => rows.sort(getComparator(order, orderBy)), [order, orderBy]);
  const alignment = (value: number | string) => (typeof value === 'number' ? 'right' : 'left');
  return (
      <Paper sx={{ width: '100%', elevation: 2 }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{}} aria-labelledby="SummaryTable" size={'medium'}>
            <SortableTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headerCells={headerCells} />
            <TableBody>
              {sortedRows.map((row, index) => {
                const labelId = `SortableTable-${index}`;
                // We can dynamically create all the cells except for the id cell
                const cells = Object.entries(row)
                  .slice(1)
                  .map((keypair: [string, keyof Data]) => {
                    return (
                      <TableCell key={index + keypair[0]} align={alignment(keypair[1])}>
                        {keypair[1]}
                      </TableCell>
                    );
                  });
                return (
                  <TableRow key={row.type}>
                    <TableCell padding="normal" />
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.type}
                    </TableCell>
                    {cells}
                  </TableRow>
                );
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

export { SummaryTable };
export type { Data, Order };
