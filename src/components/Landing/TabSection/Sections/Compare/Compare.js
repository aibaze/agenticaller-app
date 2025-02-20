import { Grid } from '@mui/material';
import usePagination from '../../../hooks/usePagination';
import { useResponsive } from 'src/hooks/use-responsive';
import { tabsA } from '../../dataTabsA';
import Comparison from './Comparison/Comparison';
import { Container, Title, GridContainer, GridHideMobile } from './styles';

const Compare = () => {
  const { title, titleMobile, comparisons, label } = tabsA[2];
  const totalPages = comparisons.length;
  const { page, Pagination } = usePagination({
    totalPages,
    tabSection: 'product_first_tabs_section',
    currentTab: label,
  });
  const smDown = useResponsive('down', 'lg');

  return (
    <Container>
      <Title>{smDown ? titleMobile : title}</Title>

      <GridContainer container>
        <Grid xs={12} lg={5.5} item>
          <Comparison page={page} comparisons={comparisons} />
        </Grid>
        <GridHideMobile xs={0} lg={5.5} item>
          <Comparison page={page + 1} comparisons={comparisons} />
        </GridHideMobile>
      </GridContainer>
      <Pagination />
    </Container>
  );
};

export default Compare;
