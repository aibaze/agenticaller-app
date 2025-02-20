'use client';
import { useState, useCallback } from 'react';
import { useSettingsContext } from 'src/components/settings';
import ServiceList from '../services/service-list';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import ServiceNewEditForm from './profile-create-service-modal';
import { Box } from '@mui/material';
import { paths } from 'src/routes/paths';
import ServiceSearch from '../services/serviceSearch';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
// ----------------------------------------------------------------------

export default function ServiceListView({ services, isPublic, open, setOpen, getServices }) {
  const settings = useSettingsContext();
  const [editedService, setEditedService] = useState();

  const handleClickOpen = () => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'new_service_button',
    });
    setEditedService(null);
    setOpen(true);
  };

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = services.filter(
          (service) => service.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Services"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Services' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          mb: 4,
          gap: 2,
        }}
      >
        <ServiceSearch
          query={search.query}
          results={search.results}
          onSearch={handleSearch}
          hrefItem={(id) => ''}
        />

        {isPublic ? null : (
          <Button
            onClick={handleClickOpen}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ maxWidth: '220px' }}
          >
            New Service
          </Button>
        )}
      </Box>

      <ServiceList
        setOpen={setOpen}
        setEditedService={setEditedService}
        services={services}
        getServices={getServices}
        isPublic={isPublic}
      />
      <ServiceNewEditForm currentService={editedService} open={open} setOpen={setOpen} />
    </Container>
  );
}

// ----------------------------------------------------------------------
