import { NextResponse } from 'next/server';
import { internalStatServer } from 'src/api/internal-stat';

/**
 * Middleware for logging info: ip and geo data
 * Info provided by Vercel: 'ip' and 'geo':
 * https://nextjs.org/docs/app/api-reference/functions/next-request
 */
const logInfoPathnames = ['/home/'];

export const logInfo = async (request) => {
  if (process.env.NODE_ENV === 'development') return;
  const pathname = request.nextUrl.pathname;

  if (logInfoPathnames.includes(pathname)) {
    const body = {
      section: pathname,
      ip: request.ip,
      country: request.geo?.country,
      state: request.geo?.city,
    };

    try {
      await internalStatServer(body);
    } catch (error) {
      console.error('loginInfo middleware ERROR', error?.message);
    } finally {
      return NextResponse.next();
    }
  }
};
