import { useResponsive } from 'src/hooks/use-responsive';
import usePagination from '../../../hooks/usePagination';
import { tabsA } from '../../dataTabsA';
import Case from './Case/Case';
import { Container, Title, Description, CaseContainer } from './styles';

const UseCases = () => {
  const { title, description, boards, label } = tabsA[1];
  const totalPages = boards.length;
  const { page, Pagination } = usePagination({
    totalPages,
    tabSection: 'product_first_tabs_section',
    currentTab: label,
  });
  const lgUp = useResponsive('up', 'lg');
  const isMobile = useResponsive('down', 'md');

  const currentCase = boards[page - 1];
  const nextCase = !isMobile && boards[page];
  const followingCase = lgUp && !isMobile && boards[page + 1];

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CaseContainer>
        <Case currentCase={currentCase} idx={0} />
        {nextCase && <Case currentCase={nextCase} idx={1} />}
        {followingCase && <Case currentCase={followingCase} idx={2} />}
      </CaseContainer>

      <Pagination />
    </Container>
  );
};

export default UseCases;
