import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { productItems } from '../HeroProduct/data';
import { useState } from 'react';
import { paths } from 'src/routes/paths';

const getIndexFromSlug = (slug) => {
  if (slug === null) return 0;
  return productItems.findIndex((item) => (slug === null ? 0 : item.slug === slug));
};

const useProductNavigation = () => {
  // uses index from array of products
  const router = useRouter();
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');
  const [itemSelected, setItemSelected] = useState(getIndexFromSlug(productParam));
  const totalItems = productItems.length;
  const isFirstItem = itemSelected === 0;
  const isLastItem = itemSelected === totalItems - 1;

  const handlePreviousItem = () => {
    if (isFirstItem) return;
    const slug = productItems[itemSelected - 1].slug;
    router.push(`${paths.product.root}?product=${slug}`);
  };

  const handleNextItem = () => {
    if (isLastItem) return;
    const slug = productItems[itemSelected + 1].slug;
    router.push(`${paths.product.root}?product=${slug}`);
  };

  useEffect(() => {
    if (productParam) {
      const indexProduct = getIndexFromSlug(productParam);
      setItemSelected(indexProduct);
    }
  }, [productParam]);

  return {
    itemSelected,
    setItemSelected,
    handlePreviousItem,
    handleNextItem,
    isFirstItem,
    isLastItem,
  };
};

export default useProductNavigation;
