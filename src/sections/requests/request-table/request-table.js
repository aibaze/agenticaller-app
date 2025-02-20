import Iconify from 'src/components/iconify';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { TableRow, TableCell, Box, Typography, Avatar, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import { useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useTheme } from '@emotion/react';
import { fDateTime } from 'src/utils/format-time';
import SmsIcon from '@mui/icons-material/Sms';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';

const ANSWERED = 'ANSWERED';
const QUESTION = 'QUESTION';
import {
  StyledCard,
  StyledTableCell,
  StyledAvatar,
  StyledBox,
  StyledTypographyMessage,
  StyledTableCellDate,
  StyledLabel,
  StyledIconButton,
  StyledPopover,
  StyledButton,
} from './styles';

export function RequestTable({
  data,
  head,
  sx,
  openItem,
  currentCoach,
  deleteItem,
  noTopRadius,
  noBottomRadius,
  ...other
}) {
  const theme = useTheme();
  const table = useTable();
  const [requestIsLoading, setRequestIsLoading] = useState(false);

  // State for controlling the popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const denseHeight = table.dense ? 40 : 56;

  return (
    <StyledCard noTopRadius={noTopRadius} noBottomRadius={noBottomRadius}>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={data.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              data.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={confirm.onTrue}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={head}
              rowCount={data.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  data.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {requestIsLoading ? (
                [...Array(table.rowsPerPage)].map((_, index) => (
                  <TableSkeleton key={index} sx={{ height: denseHeight }} />
                ))
              ) : (
                <>
                  {data.map((row, index) => (
                    <TableRow
                      onClick={(event) => {
                        if (event.target.closest('tr')) {
                          openItem(row);
                        }
                      }}
                      key={index}
                      sx={{ cursor: 'pointer' }}
                    >
                      <StyledTableCell>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            row.state === ANSWERED ? (
                              <DoneAllIcon
                                sx={{
                                  color:
                                    row.priority === QUESTION
                                      ? theme.palette.landing.facebookBlue
                                      : theme.palette.success.main,
                                }}
                              />
                            ) : (
                              <CircleIcon
                                fontSize="smaller"
                                sx={{
                                  color:
                                    row.priority === QUESTION
                                      ? theme.palette.landing.facebookBlue
                                      : theme.palette.success.main,
                                }}
                              />
                            )
                          }
                        >
                          <StyledAvatar>A</StyledAvatar>
                        </Badge>
                        <StyledBox>
                          <Typography variant="subtitle2">{row.serviceTitle || 'N/A'}</Typography>
                          <Typography variant="subtitle2" color={theme.palette.grey[500]}>
                            {row.email || 'N/A'}
                          </Typography>
                          <Typography variant="subtitle2">{row.name}</Typography>
                        </StyledBox>
                      </StyledTableCell>

                      <TableCell>
                        <StyledTypographyMessage
                          dangerouslySetInnerHTML={{ __html: row?.message || 'No message' }}
                        />
                      </TableCell>
                      {row.requestedDate && (
                        <TableCell>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ mb: 0 }}>
                              {fDateTime(row.requestedDate, 'dd MMM yyyy')}
                            </Typography>
                            <Typography variant="body2" color={theme.palette.grey[500]}>
                              {fDateTime(row.requestedTime, 'HH:mm')}
                            </Typography>
                          </Box>
                        </TableCell>
                      )}
                      <StyledTableCellDate>
                        <StyledLabel priority={row.priority}>
                          {row.state === ANSWERED ? (
                            <>
                              <DoneAllIcon /> Answered
                            </>
                          ) : row.priority === QUESTION ? (
                            '1 new message'
                          ) : (
                            '1 new session'
                          )}
                        </StyledLabel>
                        <StyledIconButton
                          onClick={(event) => {
                            event.stopPropagation();
                            handlePopoverOpen(event);
                          }}
                        >
                          <Iconify icon="eva:more-vertical-fill" />
                        </StyledIconButton>
                        <StyledPopover
                          open={isPopoverOpen}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                        >
                          <Box>
                            <StyledButton
                              color="primary"
                              onClick={() => openItem(row)}
                              startIcon={<SmsIcon />}
                            >
                              Answer
                            </StyledButton>
                            <StyledButton
                              color="error"
                              onClick={() => deleteItem(row._id)}
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </StyledButton>
                          </Box>
                        </StyledPopover>
                      </StyledTableCellDate>
                    </TableRow>
                  ))}
                </>
              )}
              <TableNoData notFound={data.length === 0} noContentText={data[0]}></TableNoData>
              <TableEmptyRows emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </StyledCard>
  );
}
