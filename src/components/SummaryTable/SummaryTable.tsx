import { useState, useMemo, FC, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import { SortableTableHeader } from './SortableTableHeader';
import { headerCells, Data, permanentCells, HeaderCell } from '../../types/Data';
import { Box, Button, ButtonGroup, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSVLink } from 'react-csv';
import AddIcon from '@mui/icons-material/Add';

type Order = 'asc' | 'desc';

interface SummaryTableProps {
  name: string;
  data: any;
  closeTable: () => void;
}

export const SummaryTable: FC<SummaryTableProps> = (props: SummaryTableProps) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('type');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [checked, setChecked] = useState<number[]>([0, 1, 2]);

  const [displayedHeaderCells, setDisplayedHeaderCells] = useState<HeaderCell[]>([headerCells[0], headerCells[1], headerCells[2]]);
  const displayedDataCells = useMemo(() => {
    const newDisplayedDataCells: Data[] = [];
    for (const row of props.data) {
      const displayedRow: any = {
        type: row.type,
        total: row.total
      };

      for (let i = 0; i < checked.length; i++) {
        const cell = headerCells[checked[i]];
        displayedRow[cell.id] = row[cell.id];
      }
      newDisplayedDataCells.push(displayedRow);
    }
    return newDisplayedDataCells;
  }, [checked, props.data]);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleExportToJSON = () => {
    const json = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(displayedDataCells))}`;
    const link = document.createElement('a');
    link.href = json;
    link.download = `${props.name}.json`;
    link.click();
  };

  const sortedRows = useMemo(() => displayedDataCells.sort(getComparator(order, orderBy)), [order, orderBy, displayedDataCells]);
  const csvData = [Object.keys(sortedRows[0])];
  for (let i = 0; i < sortedRows.length; i++) {
    csvData.push(Object.values(sortedRows[i]).map(String));
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }));

  useEffect(() => {
    const newDisplayedHeaderCells: HeaderCell[] = [];
    for (let i = 0; i < checked.length; i++) {
      newDisplayedHeaderCells.push(headerCells[checked[i]]);
    }
    setDisplayedHeaderCells(newDisplayedHeaderCells);
  }, [checked]);

  return (
    <Paper sx={{ padding: 5 }}>
      <Box display="flex" marginBottom="1rem">
        <Box display="flex" width={300}>
          <Typography variant="h6" textAlign="left">
            {props.name}
            <IconButton onClick={handleMenuClick}>
              <AddIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <List sx={{ width: 300 }}>
                {headerCells.map((column, index) => (
                  <ListItem key={column.id} disablePadding>
                    <ListItemButton onClick={handleToggle(index)} dense>
                      <ListItemText primary={column.label} />
                      <ListItemIcon>
                        <Checkbox edge="end" checked={checked.indexOf(index) !== -1} tabIndex={-1} disableRipple />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Menu>
          </Typography>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        onWheel={(event) => {
          const container = event.currentTarget;
          container.scrollLeft += event.deltaY;
        }}
      >
        <Table>
          <SortableTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headerCells={permanentCells.concat(displayedHeaderCells)} />
          <TableBody>
            {sortedRows.map((row, index) => {
              // We can dynamically create all the cells except for the id cell
              const cells = Object.entries(row).map((keypair: [string, any]) => {
                return (
                  <StyledTableCell key={index + keypair[0]} align="right">
                    {keypair[1]}
                  </StyledTableCell>
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
      <Divider light />
      <Box marginLeft="auto" marginTop={5} display={'flex'}>
        <ButtonGroup>
          <Button variant="contained" sx={[{ marginRight: 5, color: 'black', bgcolor: 'lightgray' }, { '&:hover': { bgcolor: 'white' } }]}>
            <CSVLink data={csvData} filename={`${props.name}.csv`} style={{ color: 'inherit' }}>
              Download CSV
            </CSVLink>
          </Button>
          <Button variant="contained" onClick={handleExportToJSON} sx={[{ color: 'black', bgcolor: 'lightgray' }, { '&:hover': { bgcolor: 'white' } }]}>
            Download JSON
          </Button>
        </ButtonGroup>
        <ButtonGroup sx={{ marginLeft: 'auto' }}>
          <Button variant="contained" onClick={props.closeTable} sx={[{ color: 'black', bgcolor: 'lightgray' }, { '&:hover': { bgcolor: 'white' } }]}>
            DISMISS
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

function getComparator<Key extends keyof Data>(order: Order, orderBy: Key): (a: Data, b: Data) => number {
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
