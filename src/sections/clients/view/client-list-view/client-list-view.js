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
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetProducts } from 'src/api/product';
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
import ProductTableRow from '../../product-table-row';
import NewClientModal from '../client-form/client-form';
import { getCoachStudents, deleteStudent } from 'src/api/student';
import { ClientHeader } from '../client-header/client-header';
import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'name',
    label: 'Name/Email',
    icon: <SvgColor src={`/assets/icons/navbar/ic_icon-user-grey.svg`} />,
  },
  {
    id: 'nextAppointment',
    label: 'Next session',
    width: 160,
    icon: <SvgColor src={`/assets/icons/components/northeast.svg`} />,
  },
  {
    id: 'sessions',
    label: 'Service',
    icon: <SvgColor src={`/assets/icons/navbar/ic_job.svg`} />,
  },
  {
    id: 'surveys',
    label: 'Surveys',
    icon: <SvgColor src={`/assets/icons/navbar/ic_mail.svg`} />,
  },
  {
    id: 'status',
    label: 'Status',
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
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const smDown = useResponsive('down', 'sm');
  const { productsLoading, productsEmpty } = useGetProducts();
  const confirm = useBoolean();

  useEffect(() => {
    if (students.length) {
      const serviceTitles = students
        .filter((el) => el.servicesDetails?.length > 0)
        .map((el) => el.servicesDetails[0].title);
      const uniqueServiceTitles = [...new Set(serviceTitles)];
      setOptions(uniqueServiceTitles);
    }
  }, [students]);
  // Move getStudents to a higher scope so it can be called when needed
  const getStudents = useCallback(async () => {
    try {
      const { data } = await getCoachStudents(
        currentCoach?._id,
        searchTerm !== '' ? `?detailed=true&search=${searchTerm}` : `?detailed=true`
      );
      setStudents(data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, [currentCoach?._id, searchTerm]);

  // Call getStudents initially when currentCoach or searchTerm changes
  useEffect(() => {
    if (currentCoach?._id) {
      getStudents();
    }
  }, [currentCoach?._id, searchTerm, getStudents]);

  const denseHeight = table.dense ? 60 : 80;

  // Delete student and refetch the students list
  const handleDeleteRow = useCallback(
    async (studentId) => {
      try {
        await deleteStudent(studentId, currentCoach?._id);

        getStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    [currentCoach?._id, getStudents]
  );

  // Edit student and refetch the students list after the modal is closed
  const handleEditRow = useCallback((row) => {
    setRowData(row);
    setOpenModal(true);
  }, []);

  const handleSearchTerm = useCallback(
    (value) => {
      if (value !== searchTerm) {
        setSearchTerm(value);
      }
    },
    [searchTerm]
  );

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
    setRowData({});
  }, []);

  const filteredStudents = selectedOption
    ? students.filter((req) => req.servicesDetails?.[0]?.title === selectedOption)
    : students;
  const notFound = !filteredStudents.length || productsEmpty;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Clients"
          links={[
            { name: 'Dashboard', href: paths.profile.overview },
            { name: 'Clients', href: paths.profile.clients },
            { name: 'List' },
          ]}
          action={
            !smDown && (
              <Button
                onClick={handleOpenModal}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{
                  borderRadius: '50px',
                }}
              >
                New Client
              </Button>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <ClientHeader
          options={options}
          setSelectedOption={setSelectedOption}
          onSearch={handleSearchTerm}
        />
        <Card sx={{ mt: 2 }}>
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
                      {filteredStudents.map((row) => (
                        <ProductTableRow
                          key={row._id}
                          row={row}
                          getStudents={getStudents}
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
                    notFound={filteredStudents.length === 0}
                    noContentText={'Add your clients and manage every detail'}
                  ></TableNoData>
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
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

      <NewClientModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editRowData={rowData}
        updateTable={getStudents}
      />
    </>
  );
}
