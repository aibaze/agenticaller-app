import TabSection from './TabSection';
import WhyAllwyse from './Sections/WhyAllwyse/WhyAllwyse';
import UseCases from './Sections/UseCases/UseCases';
import Compare from './Sections/Compare/Compare';
import { tabsA } from './dataTabsA';

const TabSectionA = () => {
  const labels = tabsA.map((tab) => ({ label: tab.label, labelMobile: tab.labelMobile }));
  const contents = [<WhyAllwyse />, <UseCases />, <Compare />];

  return <TabSection labels={labels} contents={contents} tabSection="product_first_tabs_section" />;
};

export default TabSectionA;
