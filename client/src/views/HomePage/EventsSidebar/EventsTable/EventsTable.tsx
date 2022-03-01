import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CloseIcon from '@mui/icons-material/Close';
import { GpsEvent } from '../../../../common/interfaces/gps-event.interface';
import { IconButton, Toolbar, Typography } from '@mui/material';

interface Column {
  id: 'timestamp' | 'wt' | 'battery' | 'counter';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'timestamp', label: 'Timestamp', minWidth: 140 },
  { id: 'wt', label: 'wt', minWidth: 50 },
  { id: 'battery', label: 'Battery', minWidth: 50 },
  { id: 'counter', label: 'Counter', minWidth: 50 },
];

interface Data {
  name: string;
  wt: string;
  battery: number;
  counter: number;
}

interface Props {
  rows: GpsEvent[];
  cowId: string;
  onClose: () => void;
}

const EventsTable = (props: Props) => {
  const { rows, cowId, onClose } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          History of {cowId}
        </Typography>
        <IconButton onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 640, maxWidth: 440 }}>
        <Table size='small' stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EventsTable;
