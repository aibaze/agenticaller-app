import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

const StyledContentItem = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.grey[900] }),
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
}));

// ----------------------------------------------------------------------

export function CarouselBasic4({ data }) {
  const carousel = useCarousel({
    autoplay: true,
    fade: true,
  });

  return (
    <Card>
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
  );
}

CarouselBasic4.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

export function CarouselItem({ item, standAlone }) {
  const { coverUrl, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Image alt={title} src={coverUrl} ratio="1/1" />

      <StyledContentItem>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
        {!standAlone && (
          <IconButton
            onClick={() => {}}
            sx={{
              color: 'common.white',
              '&:hover': {
                bgcolor: (theme) =>
                  alpha(theme.palette.common.white, theme.palette.action.hoverOpacity),
              },
            }}
          >
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>
        )}
      </StyledContentItem>
    </Box>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  standAlone: PropTypes.bool,
};
