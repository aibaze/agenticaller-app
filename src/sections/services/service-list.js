import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { usePathname } from 'next/navigation';
import ServiceItem from './service-item';
import { deleteCoachService } from 'src/api/coach';

// ----------------------------------------------------------------------

export default function ServiceList({
  services,
  getServices,
  isPublic,
  setEditedService,
  setOpen,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleView = useCallback(
    (serviceId) => {
      const viewUrl = isPublic
        ? `${pathname.slice(0, -1)}/${paths.service.root}/${serviceId}`
        : `${paths.service.root}/${serviceId}`;

      router.push(viewUrl);
    },
    [router]
  );

  const handleEdit = (id) => {
    const editService = services.find((service) => service._id === id);
    setEditedService(editService);
    setOpen(true);
  };

  const handleDelete = useCallback(async (coachId, serviceId) => {
    await deleteCoachService(coachId, serviceId);
    await getServices();
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{mb:2}}
      >
        {services.map((service) => (
          <ServiceItem
            key={`service_${service._id}`}
            service={service}
            isPublic={isPublic}
            onView={() => handleView(service._id)}
            onEdit={() => handleEdit(service._id)}
            onDelete={() => handleDelete(service.coachId, service._id)}
          />
        ))}
      </Box>
    </>
  );
}

ServiceList.propTypes = {
  services: PropTypes.array,
  getServices: PropTypes.func,
  isPublic: PropTypes.bool,
  setEditedService: PropTypes.func,
  setOpen: PropTypes.func,
};
