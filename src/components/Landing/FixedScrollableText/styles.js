import { styled } from '@mui/material/styles';

const minHeight = '600px';
const verticalHeight = '75vh';

export const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: minHeight,
}));

export const BackgroundContainer = styled('div')(({ theme, totalHeight, isScreenLowHeight }) => ({
  position: 'relative',
  height: isScreenLowHeight ? minHeight : verticalHeight,

  [theme.breakpoints.up('md')]: {
    height: totalHeight,
  },
}));

export const CropImage = styled('div')(({ theme, totalHeight, isScreenLowHeight }) => ({
  height: isScreenLowHeight ? minHeight : 'inherit',
  clipPath: isScreenLowHeight
    ? `rect(0px 100vw 600px 0px)`
    : `rect(0px 100vw ${verticalHeight} 0px)`,
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    clipPath: `rect(0px 100vw ${totalHeight}px 0px)`,
  },
}));

export const ChildrenContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  width: '100%',
  padding: 0,
}));

export const NextSection = styled('div')(({ theme }) => ({
  padding: 0,
  height: '15px',

  [theme.breakpoints.up('sm')]: {
    height: '22px',
  },

  [theme.breakpoints.up('lg')]: {
    height: '48px',
  },
}));
