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
import { IconButton, Toolbar, Typography, Button, Grid } from '@mui/material';
import { LatLngExpression } from 'leaflet';

interface IColumn {
  id: 'timestamp' | 'tw' | 'battery' | 'counter';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly IColumn[] = [
  { id: 'timestamp', label: 'Timestamp', minWidth: 140 },
  { id: 'tw', label: 'tw', minWidth: 50 },
  { id: 'battery', label: 'Battery', minWidth: 50 },
  { id: 'counter', label: 'Counter', minWidth: 50 },
];

interface IData {
  name: string;
  wt: string;
  battery: number;
  counter: number;
}

interface IProps {
  rows: GpsEvent[];
  cowId: string;
  onClose: () => void;
  setTmpPoint: (point: LatLngExpression) => void;
  onClickShowRoute: () => void;
}

const EventsTable = (props: IProps) => {
  const { rows, cowId, onClose, setTmpPoint, onClickShowRoute } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getColumnValue = (row: GpsEvent, column: IColumn) => {
    let value = row[column.id];
    if (column.id === "timestamp") {
      const date = new Date(value)
      value = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    return value;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* FIXME: Move all Toolbar content to the parent component */}
      <Toolbar>
        <Grid
          container
          direction="row"
          spacing={1}
        >
          <Grid
            item
            xs={7}
          >
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              History of {cowId}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={onClickShowRoute}
            >Show Route</Button>
          </Grid>
          <Grid
            item
            xs={1}
          >
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
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
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={key}
                    onClick={() => {
                      row.latLong.length > 0 &&  setTmpPoint(row.latLong as LatLngExpression)
                      onClose()
                    }}
                  >
                    {columns.map((column) => {
                      const value = getColumnValue(row, column);

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
