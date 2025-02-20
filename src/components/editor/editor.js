/* eslint-disable perfectionist/sort-imports */
import 'src/utils/highlight';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { alpha } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';
import { Typography } from '@mui/material';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Skeleton
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        borderRadius: 1,
        position: 'absolute',
      }}
    />
  ),
});

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  placeholder,
  simple = false,
  simpleDisable = false,
  readOnly = false,
  user,
  helperText,
  sx,
  onChange, // Pass onChange as a prop to customize behavior
  ...other
}) {
  const modules = {
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
    ...(simpleDisable ? { toolbar: false } : { toolbar: { container: `#${id}` } }),
  };

  const handleChange = (content) => {
    const capitalizedContent = content.replace(
      /^(<p>)?(\s*|<br>)*([a-zA-Z])/,
      (match, pTag, space, firstChar) => `${pTag || ''}${space || ''}${firstChar.toUpperCase()}`
    );
    if (onChange) {
      onChange(capitalizedContent);
    }
  };

  return (
    <>
      {simpleDisable && user && (
        <Typography align="right" sx={{ mb: 2 }}>
          <span style={{ fontWeight: 'bold' }}>{user}</span>
          <span>{` (Your answer)`}</span>
        </Typography>
      )}
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            '& .ql-editor': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...(simpleDisable && {
            '& .ql-editor': {
              textAlign: readOnly ? 'left' : 'right',
            },
          }),
          ...sx,
        }}
      >
        {!simpleDisable && <Toolbar id={id} simple={simple} />}

        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder={placeholder || 'Write something awesome...'}
          onChange={handleChange}
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}

Editor.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.object,
  id: PropTypes.string,
  simple: PropTypes.bool,
  sx: PropTypes.object,
  onChange: PropTypes.func,
};
