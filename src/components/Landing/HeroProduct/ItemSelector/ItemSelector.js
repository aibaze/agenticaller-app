import { useEffect, useRef } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { CardsContainer, Card, CardWhiteBackground } from './styles';
import Icon from './Icon/Icon';
import Title from './Title/Title';

const ItemSelector = ({ items, itemSelected }) => {
  const containerRef = useRef(null);
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');

  const handleClick = (slug) => {
    router.push(`/product?product=${slug}`, { scroll: false });
  };

  // Centers the selected element horizontally within its container by adjusting
  // container's scroll position based on the selected element's position and dimensions.
  useEffect(() => {
    if (containerRef.current && containerRef.current.children[itemSelected]) {
      const container = containerRef.current;
      const selectedElement = container.children[itemSelected];
      const containerWidth = container.offsetWidth;
      const selectedElementWidth = selectedElement.offsetWidth;
      const selectedElementLeft = selectedElement.offsetLeft;

      const scrollLeft = selectedElementLeft - (containerWidth - selectedElementWidth) / 2;
      container.scrollLeft = scrollLeft;
    }
  }, [itemSelected, mdUp]);

  return (
    <CardsContainer ref={containerRef} role="button">
      {items.map((product, idx) => {
        return (
          <Card key={`product_icon-${idx}`} onClick={() => handleClick(product.slug)}>
            <Icon slug={product.slug} />
            <Title title={product.title} />
            {itemSelected === idx && <CardWhiteBackground />}
          </Card>
        );
      })}
    </CardsContainer>
  );
};

export default ItemSelector;
