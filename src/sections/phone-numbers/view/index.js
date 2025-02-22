'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { getVapiPhoneNumbers, getVapiAssistants } from 'src/api/vapi';
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
} from 'src/components/table';
import { useAuthContext } from 'src/auth/hooks';
import SvgColor from 'src/components/svg-color';
import PhoneNumberTableRow from '../phone-number-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'status',
    label: 'Status',
    icon: <SvgColor src={`/assets/icons/navbar/ic_icon-user-grey.svg`} />,
  },
  {
    id: 'name',
    label: 'Name',
    icon: <SvgColor src={`/assets/icons/navbar/ic_job.svg`} />,
  },
  {
    id: 'number',
    label: 'Number',
    width: 160,
    icon: <SvgColor src={`/assets/icons/components/northeast.svg`} />,
  },
  {
    id: 'assistant',
    label: 'Assistant',
    width: 160,
    icon: <SvgColor src={`/assets/icons/components/northeast.svg`} />,
  },
  {
    id: 'provider',
    label: 'Provider',
    icon: <SvgColor src={`/assets/icons/navbar/ic_mail.svg`} />,
  },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function PhoneNumberListView() {
  const { currentCoach } = useAuthContext();
  const table = useTable();
  const settings = useSettingsContext();
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const smDown = useResponsive('down', 'sm');
  const confirm = useBoolean();

  const getPhoneNumbers = useCallback(async () => {
    try {
      const { data } = await getVapiPhoneNumbers();
      const assistantsResponse = await getVapiAssistants();
      setAssistants(assistantsResponse.data.data.assistants);
      setPhoneNumbers(data.data.phoneNumbers);
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    }
  }, []);

  useEffect(() => {
    getPhoneNumbers();
  }, [getPhoneNumbers]);

  const denseHeight = table.dense ? 60 : 80;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Phone Numbers"
        links={[
          { name: 'Dashboard', href: paths.profile.overview },
          { name: 'Phone Numbers', href: paths.profile.phoneNumbers },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                onSort={table.onSort}
              />
              <TableBody>
                {phoneNumbers.map((row) => (
                  <PhoneNumberTableRow
                    key={row.id}
                    row={row}
                    assistants={assistants}
                    getPhoneNumbers={getPhoneNumbers}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, phoneNumbers.length)}
                />

                <TableNoData
                  notFound={phoneNumbers.length === 0}
                  noContentText={'No phone numbers found'}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Container>
  );
} 