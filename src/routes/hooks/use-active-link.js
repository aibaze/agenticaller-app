import { usePathname, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

export function useActiveLink(path, deep = true) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSearchParams = [...searchParams.entries()].length > 0;

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}/`;

  const pathnameWithParams = hasSearchParams ? `${pathname}?${searchParams}/` : pathname;

  const normalActive = !checkPath && pathnameWithParams === currentPath;

  const deepActive = !checkPath && pathnameWithParams.includes(currentPath);

  return deep ? deepActive : normalActive;
}
