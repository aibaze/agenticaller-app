import { createContext, useContext } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { GridTextButton, GridImage, GridContainerButton, GridContainer } from './styles';

// <TwoColumn /> facilitates the creation of two-column sections.
//
// Desktop ('lg' or up):
// - Layout: two distinct columns (Image / Text or Text / Image)
// - Image or Text positioned to the right based on the order they are written.
// - Button always appears below the Text.
//
// Mobile (below 'lg'):
// - Layout: a single column.
// - Text(1), Image(2), and Button(3) are displayed in that order.

const TwoColumnContext = createContext();

const Text = ({ children }) => {
  const { button } = useContext(TwoColumnContext);
  return (
    <Grid item xs={12} lg={5} order={{ xs: 1, lg: 'inherit' }}>
      {children}
      {button && (
        <GridTextButton item xs={12} lg={7}>
          {button}
        </GridTextButton>
      )}
    </Grid>
  );
};

const Image = ({ children }) => {
  return (
    <GridImage item xs={12} lg={7} order={{ xs: 2, lg: 'inherit' }}>
      {children}
    </GridImage>
  );
};

const TwoColumn = ({ children, backgroundColor, button, id }) => {
  return (
    <TwoColumnContext.Provider value={{ button }}>
      <GridContainer
        id={id}
        backgroundColor={backgroundColor}
        spacing={{ xs: 2, sm: 3, lg: 6 }}
        container
      >
        {children}
        {button && (
          <GridContainerButton item xs={12} order={{ xs: 3, lg: 'inherit' }}>
            {button}
          </GridContainerButton>
        )}
      </GridContainer>
    </TwoColumnContext.Provider>
  );
};

TwoColumn.Image = Image;
TwoColumn.Text = Text;

export default TwoColumn;

TwoColumn.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  button: PropTypes.node,
};
