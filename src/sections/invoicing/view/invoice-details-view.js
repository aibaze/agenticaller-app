'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _invoices } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InvoiceDetails from '../invoice-details';

// ----------------------------------------------------------------------

export default function InvoiceDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentInvoice = _invoices.filter(
    (invoice) => invoice.id === 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1'
  )[0];
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentInvoice?.invoiceNumber}
        links={[
          {
            name: 'Dashboard',
            href: paths.profile.overview,
          },
          /*  {
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          }, */
          { name: currentInvoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceDetails invoice={currentInvoice} />
    </Container>
  );
}

InvoiceDetailsView.propTypes = {
  id: PropTypes.string,
};
