'use client';
import ServiceDetailsView from 'src/sections/services/view/service-details-view';

export default function ServicePage({ params: { serviceId } }) {
  return <ServiceDetailsView isPublic serviceId={serviceId} />;
}
