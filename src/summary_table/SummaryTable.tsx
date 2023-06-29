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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', elevation: 2 }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{}} aria-labelledby="SummaryTable" size={'medium'}>
            <SortableTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headerCells={headerCells} />
            <TableBody>
              {sortedRows.map((row, index) => {
                const labelId = `SortableTable-${index}`;

                return (
                  <TableRow key={row.type}>
                    <TableCell padding="normal" />
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.type}
                    </TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    <TableCell align="right">{row.average_age_at_death}</TableCell>
                    <TableCell align="right">{row.hs_grad}</TableCell>
                    <TableCell align="right">{row.college_grad}</TableCell>
                    <TableCell align="right">{row.mri_1}</TableCell>
                    <TableCell align="right">{row.mri_2}</TableCell>
                    <TableCell align="right">{row.mri_3}</TableCell>
                    <TableCell align="right">{row.dvoice_1}</TableCell>
                    <TableCell align="right">{row.dvoice_2}</TableCell>
                    <TableCell align="right">{row.dvoice_3}</TableCell>
                    <TableCell align="right">{row.smoking_ever}</TableCell>
                    <TableCell align="right">{row.overall_dementia_probe}</TableCell>
                    <TableCell align="right">{row.hypertension_ever}</TableCell>
                    <TableCell align="right">{row.diabetic_ever}</TableCell>
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
    </Box>
  );
};

export { SummaryTable };
export type { Data, Order };
