import TabSection from './TabSection';
import Integrations from './Sections/Integrations/Integrations';
import FavoriteTools from './Sections/FavoriteTools/FavoriteTools';
import Commitment from './Sections/Commitment/Commitment';
import { tabsB } from './dataTabsB';

const TabSectionB = () => {
  const labels = tabsB.map((tab) => ({ label: tab.label, labelMobile: tab.labelMobile }));
  const contents = [<Integrations />, <FavoriteTools />, <Commitment />];

  return (
    <TabSection labels={labels} contents={contents} tabSection="product_second_tabs_section" />
  );
};

export default TabSectionB;
