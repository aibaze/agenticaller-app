'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetProducts } from 'src/api/product';
import { getVapiCalls,getVapiAssistants } from 'src/api/vapi';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';
import { useAuthContext } from 'src/auth/hooks';
import ProductTableRow from 'src/sections/clients/product-table-row';
import { getCoachStudents, deleteStudent } from 'src/api/student';
import { ClientHeader } from 'src/sections/clients/view/client-header/client-header';
import SvgColor from 'src/components/svg-color';
import CallTableRow from 'src/sections/calls/call-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'status',
    label: 'Status',
    icon: <SvgColor src={`/assets/icons/navbar/ic_icon-user-grey.svg`} />,
  },
  {
    id: 'type',
    label: 'Type',
    icon: <SvgColor src={`/assets/icons/navbar/ic_job.svg`} />,
  },
  {
    id: 'assistant',
    label: 'Assistant',
    width: 160,
    icon: <SvgColor src={`/assets/icons/components/northeast.svg`} />,
  },
  {
    id: 'startedAt',
    label: 'Started At',
    width: 160,
    icon: <SvgColor src={`/assets/icons/components/northeast.svg`} />,
  },
  {
    id: 'duration',
    label: 'Duration',
    icon: <SvgColor src={`/assets/icons/navbar/ic_mail.svg`} />,
  },
  {
    id: 'cost',
    label: 'Cost',
    icon: <SvgColor src={`/assets/icons/navbar/ic_invoice.svg`} />,
  },
  {
    id: 'recordings',
    label: 'Recordings',
    icon: <SvgColor src={`/assets/icons/navbar/ic_invoice.svg`} />,
  },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function ProductListView() {
  const { currentCoach } = useAuthContext();
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [calls, setCalls] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const smDown = useResponsive('down', 'sm');
  const { productsLoading, productsEmpty } = useGetProducts();
  const confirm = useBoolean();

/*   useEffect(() => {
    if (calls.length) {
      const serviceTitles = calls
        .filter((el) => el.servicesDetails?.length > 0)
        .map((el) => el.servicesDetails[0].title);
      const uniqueServiceTitles = [...new Set(serviceTitles)];
      setOptions(uniqueServiceTitles);
    }
  }, [calls]); */
  // Move getCalls to a higher scope so it can be called when needed
  const getCalls = useCallback(async () => {
    try {
      setLoading(true);
      console.log("getCalls")
      const { data } = await getVapiCalls()
      console.log({data})
      const assistants = await getVapiAssistants();
      setAssistants(assistants.data.data.assistants)
      setCalls(data.data.calls);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }, [currentCoach?._id, searchTerm]);


  // Call getCalls initially when currentCoach or searchTerm changes
  
  useEffect(() => {
    console.log("useeefect",currentCoach?._id)

    if (currentCoach?._id) {
      console.log("hay id")
      getCalls();
    }
  }, [currentCoach?._id, searchTerm, getCalls]);

  const denseHeight = table.dense ? 60 : 80;

  // Delete student and refetch the students list
  const handleDeleteRow = useCallback(
    async (studentId) => {
      try {
        await deleteStudent(studentId, currentCoach?._id);

        getCalls();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    [currentCoach?._id, getCalls]
  );

  // Edit student and refetch the students list after the modal is closed
  const handleEditRow = useCallback((row) => {
    setRowData(row);
    setOpenModal(true);
  }, []);



  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
    setRowData({});
  }, []);

  const filteredCalls = selectedOption
    ? calls.filter((req) => req.servicesDetails?.[0]?.title === selectedOption)
    : calls;
  const notFound = !filteredCalls.length || productsEmpty;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Calls"
          links={[
            { name: 'Dashboard', href: paths.profile.overview },
            { name: 'Calls', href: paths.profile.clients },
            { name: 'List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        
        <Card sx={{ mt: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
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
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                    }
                  />
                  <TableBody>
                    {productsLoading ? (
                      [...Array(table.rowsPerPage)].map((_, index) => (
                        <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      ))
                    ) : (
                      <>
                        {filteredCalls.map((row) => (
                          <CallTableRow
                            key={row._id}
                            row={row}
                            getCalls={getCalls}
                            assistants={assistants}
                            selected={table.selected.includes(row._id)}
                            onSelectRow={() => table.onSelectRow(row._id)}
                            onDeleteRow={() => handleDeleteRow(row._id)}
                            onEditRow={() => handleEditRow(row)}
                          />
                        ))}
                      </>
                    )}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                    />
                    <TableNoData
                      notFound={filteredCalls.length === 0}
                      noContentText={'Add your clients and manage every detail'}
                    ></TableNoData>
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          )}
        </Card>
        {smDown && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              onClick={handleOpenModal}
              variant="contained"
              sx={{
                borderRadius: '50px',
                width: 200,
              }}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New User
            </Button>
          </Box>
        )}
      </Container>

   
    </>
  );
}
