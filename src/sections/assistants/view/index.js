'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { getVapiAssistants } from 'src/api/vapi';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';
import AssistantTableRow from '../assistant-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'voice', label: 'Voice' },
  { id: 'model', label: 'Model' },
  { id: 'transcriber', label: 'Transcriber' },
  { id: 'serverStatus', label: 'Server Status' },
  { id: 'createdAt', label: 'Created At' },
  { id: '', width: 88 },
];

export default function AssistantListView() {
  const settings = useSettingsContext();
  const table = useTable();
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAssistants = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getVapiAssistants();
      setAssistants(response.data.assistants);
    } catch (error) {
      console.error('Error fetching assistants:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAssistants();
  }, [getAssistants]);

  const handleDeleteRow = async (assistantId) => {
    // Implement delete functionality
    console.log('Delete assistant:', assistantId);
  };

  const handleEditRow = (row) => {
    // Implement edit functionality
    console.log('Edit assistant:', row);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Assistants"
        links={[
          { name: 'Dashboard', href: paths.profile.overview },
          { name: 'Assistants', href: paths.profile.assistants },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                onSort={table.onSort}
              />
              <TableBody>
                {loading ? (
                  [...Array(table.rowsPerPage)].map((_, index) => (
                    <TableSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {assistants.map((row) => (
                      <AssistantTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={handleDeleteRow}
                        onEditRow={handleEditRow}
                      />
                    ))}
                   {/*  
                    <TableEmptyRows
                      height={72}
                      emptyRows={table?.emptyRows(assistants.length)}
                    /> */}

                    <TableNoData notFound={!assistants.length && !loading} />
                  </>
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Container>
  );
} 