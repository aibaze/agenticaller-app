'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Container, BackgroundContainer, CropImage, ChildrenContent, NextSection } from './styles';

// Creates a fixed section of text that scrolls with the page within specified bounds.
// It dynamically adjusts its position based on the scroll position to keep it fixed within the provided background.
const FixedScrollableText = ({ children, background, adjustOffset, totalHeight }) => {
  const { src, alt } = background;
  const isScreenLowHeight = useMediaQuery('(max-height: 780px)');

  useEffect(() => {
    const adjustTextPosition = () => {
      const background = document.getElementById('background');
      const fixedText = document.getElementById('fixedSection');
      const nextSection = document.getElementById('nextSection');

      if (!background || !fixedText || !nextSection) return;

      if (window.innerWidth < 900) {
        fixedText.style.top = '75px';
        return;
      }

      const backgroundRect = background.getBoundingClientRect();
      const nextSectionRect = nextSection.getBoundingClientRect();
      const fixedTextHeight = fixedText.offsetHeight - adjustOffset;

      if (
        window.scrollY >= backgroundRect.top &&
        window.scrollY <= nextSectionRect.top - fixedTextHeight
      ) {
        fixedText.style.top = `${+window.scrollY + window.innerHeight / 12}px`;
      }
    };

    window.addEventListener('scroll', adjustTextPosition);
    window.addEventListener('resize', adjustTextPosition);

    adjustTextPosition();

    return () => {
      window.removeEventListener('scroll', adjustTextPosition);
      window.removeEventListener('resize', adjustTextPosition);
    };
  }, []);

  return (
    <Container>
      <BackgroundContainer
        id="background"
        totalHeight={totalHeight}
        isScreenLowHeight={isScreenLowHeight}
      >
        <CropImage totalHeight={totalHeight} isScreenLowHeight={isScreenLowHeight}>
          <Image
            src={src}
            alt={alt}
            priority={true}
            quality={20}
            fill
            style={{
              marginTop: '200px',
              objectFit: 'cover',
              filter: 'blur(5px)',
            }}
          />
        </CropImage>
      </BackgroundContainer>

      <ChildrenContent id="fixedSection">{children}</ChildrenContent>
      <NextSection id="nextSection" />
    </Container>
  );
};

FixedScrollableText.propTypes = {
  background: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  adjustOffset: PropTypes.number.isRequired,
  totalHeight: PropTypes.number.isRequired,
};

export default FixedScrollableText;
